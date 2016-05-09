import Marionette from 'backbone.marionette';

import BotView from '../views/BotView.js';

// Handles bot api key route
export var BotController = Marionette.Object.extend({
  initialize: function(options){
    this.layout = options.layout;
    this.contentRegion = options.layout.getRegion('contentRegion');
  },

  onBot: function(id) {
    this.contentRegion.show(new BotView(id));
  }
});

export var BotRouter = Marionette.AppRouter.extend({
  appRoutes: {
    'bot/:id': 'onBot'
  }
});