import Marionette from 'backbone.marionette';

import TokenInputBarView from '../views/TokenInputBarView';

// Handles the homepage route
export var IndexController = Marionette.Object.extend({
  initialize: function(options){
    this.layout = options.layout;
  },

  onIndex: function() {
    // Remove any existing content
    this.layout.getRegion('contentRegion').show(new TokenInputBarView());
  }
});

export var IndexRouter = Marionette.AppRouter.extend({
  appRoutes: {
    '': 'onIndex'
  }
});