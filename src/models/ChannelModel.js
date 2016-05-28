import Backbone from 'backbone';
import jquery from 'jquery';

import IMCollection from './IMCollection';
import IMModel from './IMModel';
import UserCache from './UserCache';

const MAX_MESSAGES_PER_CHUNK = 1;

// Represents a single slack channel IM channel and 
// all of its messages.
// To create and populate a model, set the id to the id
// of the channel, and set token to the API token to use.
// Calling fetch will then populate all of the messages and 
// user info for the channel.
export default Backbone.Model.extend({
  url: 'https://slack.com/api/im.history',
  defaults: {
    user: 'user id',
    messageCount: -1,
    messages: null
  },
  
  initialize: function(){
    // initialise the collection
    this.set('messages', new IMCollection());
    this.attributes.messages.comparator = 'ts';
    this.userCache = new UserCache(this.attributes.token);
  },
  
  // populates the message count from 0 to 10, with 11
  // being 10+ messages. Cheaper way than fetching all
  // messages for all IMs when listing the pages
  populateMessageCount: function() {
    return  Promise.resolve(jquery.ajax({
      type: 'GET',
      url: this.url,
      dataType: 'json',
      data: {
        token: this.attributes.token,
        channel: this.id
      }
    })).then(response => {
      if(response.messages) {
        this.set('messageCount', response.messages.length);
      }
    });
  },
  
  // Populates ALL the messages from the channel
  fetch: function() {
    this.attributes.messages.reset();
    return this.fetchAndAddMessages();
  },
  
  // Requests messages and adds them asynchronously to the channel 
  // models IM collection. Returns a promise that resolves after
  // all messages have been fetched. 
  // Recursively calls itself.
  fetchAndAddMessages: function(fromTime) {
    var extraParams = fromTime ?  { latest: fromTime } : { };
    
    let request = Promise.resolve(jquery.ajax({
      type: 'GET',
      url: this.url,
      dataType: 'json',
      data: {
        token: this.attributes.token,
        channel: this.id,
        count: MAX_MESSAGES_PER_CHUNK,
        ... extraParams
      }
    }));
    
    return request.then((response) => {
      if(response.ok) {
        // Create a message model for each message in the reponse, and
        // then populate the information about the user for each msg
        const messages = response.messages.map(msg => new IMModel(msg));
        
        // Create a chain of all the user fetching so it's executed sequentially.
        // If we execute in parallel then we are not going to use the cache well       
        let fetchUsersPromise = Promise.resolve(1);
        messages.forEach(msg => {
          fetchUsersPromise = fetchUsersPromise.then(() => {
            return this.userCache.getOrFetchUser(msg.attributes.user)
              .then(fetchedUser => msg.set('user', fetchedUser));
          });
        });
        
        // After all the user details are populated, add the messages
        const messagesAdded = fetchUsersPromise.then(() => this.attributes.messages.add(messages));
          
        // If we have more messages to fetch we need to call 
        // this function again, recursively and keep the promise
        // chain going. 
        if(response.has_more){
          let nextMessages = this.fetchAndAddMessages(messages[messages.length -1].attributes.ts);
          return Promise.all([messagesAdded, nextMessages]);
        }
        return messagesAdded;
      } else {
        throw new Error("Bad response from IM History request: " + JSON.stringify(response));
      }
    });
  }
});