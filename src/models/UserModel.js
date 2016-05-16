import Backbone from 'backbone';

// Single user from the slack web API. 
// To fetch, requires:
// id    - set to the user ID to request
// token - set to the slack api key to use for fetching
export default Backbone.Model.extend({
  url: function() {
    return `https://slack.com/api/users.info?token=${this.attributes.token}&user=${this.id}`;
  },
  
  parse: function(userResponse){
    return userResponse.user;
  }
});