import Marionette from 'backbone.marionette';
import Backbone from 'backbone';

import IndexView from '../views/IndexView';

// Handles the homepage route
export var IndexController = Marionette.Object.extend({
  initialize: function(options){
    this.layout = options.layout;
  },

  // Handles browsing to the home page. Clear the content and show
  // the search bar. 
  onIndex: function() {
    this.layout.getRegion('contentRegion').show(
      new IndexView()
    );
    this.layout.getRegion('searchRegion').currentView.clearSearch();
  }
});

export var IndexRouter = Marionette.AppRouter.extend({
  appRoutes: {
    '': 'onIndex'
  }
});