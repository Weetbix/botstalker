import Marionette from 'backbone.marionette';
import template from '../templates/SearchBarView.hbs';

// View which returns the users search query as an URI Encoded string
export default Marionette.ItemView.extend({
  template: template,

  ui: {
    searchInput: '#search-term'
  },

  events: {
    'submit form' : 'onSearchSubmit'
  },

  onSearchSubmit: function(event){
    event.preventDefault();
    const searchInput = this.ui.searchInput.val().trim();

    // Only search if there is user input
    if(searchInput.length > 0) {
      const query = encodeURIComponent(this.ui.searchInput.val());
      this.triggerMethod('search', query);
    }
  },
  
  clearSearch: function(){
    this.ui.searchInput.val('');
  },
  
  setSearchText: function(text){
    this.ui.searchInput.val(text);
  }
});