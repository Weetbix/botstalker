import Marionette from 'backbone.marionette';

import BotView from '../views/BotView';
import IMChannelCollection from '../models/IMChannelCollection';
import UserModel from '../models/UserModel';

// Handles bot api key route
export var BotController = Marionette.Object.extend({
  initialize: function(options){
    this.layout = options.layout;
    this.contentRegion = options.layout.getRegion('contentRegion');
  },

  onBot: function(id) {
    
    let channelList = new IMChannelCollection();
    
    channelList.fetch({ data: { token: id }})
    .then(() => {
      // add users to each IM model
      channelList.each(msg => {
        msg.attributes.user = new UserModel({ id: msg.attributes.user , token: id });
      });
      
      return Promise.all(channelList.map(msg => msg.attributes.user.fetch()))
        .then(() => this.contentRegion.show(new BotView({ collection: channelList })))
        .then(() => console.log('user is: ' + JSON.stringify(channelList)));
    });
  }
});

export var BotRouter = Marionette.AppRouter.extend({
  appRoutes: {
    'bot/:id': 'onBot'
  }
});