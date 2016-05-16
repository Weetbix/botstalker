import Marionette from 'backbone.marionette';

import ChannelListView from '../views/ChannelListView';
import IMListView from '../views/IMListView';
import LoadingView from '../views/LoadingView';
import ErrorView from '../views/ErrorView';
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
    this.contentRegion.show(new LoadingView());
      
    let channelList = new ChannelCollection();
    channelList.token = userToken;
    
    channelList.fetch({ data: { token: userToken }})
      .then(() => {
        this.contentRegion.show(new ChannelListView({ collection: channelList }));
      })
      .catch(error => { 
        this.contentRegion.show(
          new ErrorView({ header: `Couldn't show IMs`, error: error.message  })
          );
      });
  },
  
  onChannel: function(userToken, channelID) {
    this.contentRegion.show(new LoadingView());
    
    const channelModel = new ChannelModel({ id: channelID, token: userToken });
    
    channelModel.fetch()
      .then(() => {
        this.contentRegion.show(new IMListView({ collection: channelModel.get('messages') }));
      })
      .catch(error => {
        this.contentRegion.show(
          new ErrorView({ header: `Couldn't show conversation` })
        );
      });
  }
});

export var ChannelRouter = Marionette.AppRouter.extend({
  appRoutes: {
    'list/:userToken': 'onListChannels',
    'channel/:userToken/:channelID': 'onChannel'
  }
});