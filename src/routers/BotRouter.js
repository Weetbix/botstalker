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
    channelList.token = id;
    
    channelList.fetch({ data: { token: id }}).then(() => {
      this.contentRegion.show(new BotView({ collection: channelList }));
      console.log('user is: ' + JSON.stringify(channelList));
      console.log('cats');
    });
  }
});

export var BotRouter = Marionette.AppRouter.extend({
  appRoutes: {
    'bot/:id': 'onBot'
  }
});