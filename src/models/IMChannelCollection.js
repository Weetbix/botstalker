import Backbone from 'backbone';


import UserModel from './UserModel';
import IMChannelModel from './IMChannelModel';

export default Backbone.Collection.extend({
  model: IMChannelModel,
  url: 'https://slack.com/api/im.list',
  
  parse: function(collection){
    return collection.ims;
  },
  
  // Override the default fetch and populate more information
  // about the users
  fetch: function(options) {
    if(!this.token){
      throw new Error("No token provided to IM channel collection"); 
    }
    
    return Promise.resolve(Backbone.Collection.prototype.fetch.call(this, options))
    .then(() => {
      // Change the user attributes to sub models
      this.each(channel => {
        channel.attributes.user = new UserModel({ id: channel.attributes.user , token: this.token });
        channel.set('token', this.token);
      });
      
      // Fetch all the sub user models
      const userDetailsPromises = this.map(channel => channel.attributes.user.fetch());
      const messageCountPromises = this.map(channel => channel.populateMessageCount());
      return Promise.all([...userDetailsPromises, ...messageCountPromises]);
    });
  }
});