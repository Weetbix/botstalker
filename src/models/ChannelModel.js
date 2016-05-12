import Backbone from 'backbone';
import jquery from 'jquery';

export default Backbone.Model.extend({
  url: 'https://slack.com/api/im.history',
  defaults: {
    user: 'user id',
    message_count: -1
  },
  
  // populates the message count from 0 to 10, with 11
  // being 10+ messages
  populateMessageCount: function() {
    return  Promise.resolve(jquery.ajax({
      type: 'GET',
      url: this.url,
      dataType: 'json',
      data: {
        token: this.attributes.token,
        channel: this.id
      }
    })).then(response => 
    {
      if(response.messages) {
        this.set('message_count', response.messages.length);
      }
    });
  }
});