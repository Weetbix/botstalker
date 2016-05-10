import Marionette from 'backbone.marionette';

import BotView from '../views/BotView';
import IMCollection from '../models/IMCollection';
import UserModel from '../models/UserModel';

// Handles bot api key route
export var BotController = Marionette.Object.extend({
  initialize: function(options){
    this.layout = options.layout;
    this.contentRegion = options.layout.getRegion('contentRegion');
  },

  onBot: function(id) {
    
    let msgList = new IMCollection();
    
    msgList.fetch({ data: { token: id }})
    .then(() => {
      // add users to each IM model
      msgList.each(msg => {
        msg.attributes.user = new UserModel({ id: msg.attributes.user , token: id });
      });
      
      return Promise.all(msgList.map(msg => msg.attributes.user.fetch()))
        .then(() => this.contentRegion.show(new BotView({ collection: msgList })));
    });
  }
});

export var BotRouter = Marionette.AppRouter.extend({
  appRoutes: {
    'bot/:id': 'onBot'
  }
});