import Marionette from 'backbone.marionette';

import BotView from '../views/BotView';
import IMCollection from '../models/IMCollection';

// Handles bot api key route
export var BotController = Marionette.Object.extend({
  initialize: function(options){
    this.layout = options.layout;
    this.contentRegion = options.layout.getRegion('contentRegion');
  },

  onBot: function(id) {
    this.contentRegion.show(new BotView(id));
    let msgList = new IMCollection();
    msgList.fetch({ data: { token: id }})
    .then(() => {
      console.log(JSON.stringify(msgList));
    })
    .fail(err => {
      console.log("was error: " + err);
    });
  }
});

export var BotRouter = Marionette.AppRouter.extend({
  appRoutes: {
    'bot/:id': 'onBot'
  }
});