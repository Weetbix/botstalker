import Backbone from 'backbone';

export default Backbone.Model.extend({
  url: function() {
    return `https://slack.com/api/users.info?token=${this.attributes.token}&user=${this.id}`;
  },
  
  parse: function(userResponse){
    return userResponse.user;
  }
});