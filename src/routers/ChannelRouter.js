import Marionette from 'backbone.marionette';

import ChannelListView from '../views/ChannelListView';
import IMListView from '../views/IMListView';
import ChannelCollection from '../models/ChannelCollection';
import ChannelModel from '../models/ChannelModel';
import UserModel from '../models/UserModel';

// Handles bot api key route
export var ChannelController = Marionette.Object.extend({
  initialize: function(options){
    this.layout = options.layout;
    this.contentRegion = options.layout.getRegion('contentRegion');
  },

  onListChannels: function(userToken) {
    let channelList = new ChannelCollection();
    channelList.token = userToken;
    
    channelList.fetch({ data: { token: userToken }}).then(() => {
      this.contentRegion.show(new ChannelListView({ collection: channelList }));
      console.log('user is: ' + JSON.stringify(channelList));
      console.log('cats');
    });
  },
  
  onChannel: function(userToken, channelID) {
    console.log(`usertoken is ${userToken} and channel id is ${channelID}`);
    
    const channelModel = new ChannelModel({ id: channelID, token: userToken });
    
    channelModel.fetch();
    this.contentRegion.show(new IMListView({ collection: channelModel.get('messages') }));
  }
});

export var ChannelRouter = Marionette.AppRouter.extend({
  appRoutes: {
    'list/:userToken': 'onListChannels',
    'channel/:userToken/:channelID': 'onChannel'
  }
});