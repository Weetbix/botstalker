import Marionette from 'backbone.marionette';

import IMListView from '../views/IMListView';
import IMChannelCollection from '../models/IMChannelCollection';
import UserModel from '../models/UserModel';

// Handles bot api key route
export var ChannelController = Marionette.Object.extend({
  initialize: function(options){
    this.layout = options.layout;
    this.contentRegion = options.layout.getRegion('contentRegion');
  },

  onListChannels: function(userToken) {
    let channelList = new IMChannelCollection();
    channelList.token = userToken;
    
    channelList.fetch({ data: { token: userToken }}).then(() => {
      this.contentRegion.show(new IMListView({ collection: channelList }));
      console.log('user is: ' + JSON.stringify(channelList));
      console.log('cats');
    });
  },
  
  onChannel: function(userToken, channelID) {
    console.log(`usertoken is ${userToken} and channel id is ${channelID}`);
    
  }
});

export var ChannelRouter = Marionette.AppRouter.extend({
  appRoutes: {
    'list/:userToken': 'onListChannels',
    'channel/:userToken/:channelID': 'onChannel'
  }
});