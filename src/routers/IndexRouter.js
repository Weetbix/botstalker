import Marionette from 'backbone.marionette';
import Backbone from 'backbone';

import SearchBarView from '../views/SearchBarView';

// Handles the homepage route
export var IndexController = Marionette.Object.extend({
  initialize: function(options){
    this.layout = options.layout;
  },

  // Handles browsing to the home page. Clear the content and show
  // the search bar. 
  onIndex: function() {
    let searchBar = new SearchBarView();
    searchBar.on('search', input => Backbone.history.navigate('#list/' + input, { trigger: true }));
    this.layout.getRegion('contentRegion').show(searchBar);
  }
});

export var IndexRouter = Marionette.AppRouter.extend({
  appRoutes: {
    '': 'onIndex'
  }
});