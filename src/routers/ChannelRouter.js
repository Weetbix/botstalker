import Marionette from 'backbone.marionette';

import ChannelListView from '../views/ChannelListView';
import IMListView from '../views/IMListView';
import LoadingView from '../views/LoadingView';
import ErrorView from '../views/ErrorView';
import ChannelCollection from '../models/ChannelCollection';
import ChannelModel from '../models/ChannelModel';

// Handles bot api key route
export var ChannelController = Marionette.Object.extend({
  initialize: function(options){
    this.layout = options.layout;
    this.contentRegion = options.layout.getRegion('contentRegion');
    this.loadingRegion = options.layout.getRegion('loadingRegion');
  },

  // Handles listing all of the IM channel associated with
  // the given user token
  onListChannels: function(userToken) {
    this.loadingRegion.show(new LoadingView());
      
    let channelList = new ChannelCollection();
    channelList.token = userToken;
    
    // TODO: Pretty sure i can remove this extra token here. 
    channelList.fetch({ data: { token: userToken }})
      .then(() => {
        this.contentRegion.show(new ChannelListView({ collection: channelList }));
      })
      .catch(error => { 
        this.contentRegion.show(
          new ErrorView({ header: `Couldn't show IMs`, error: error.message  })
          );
      })
      .then(() => {
        this.loadingRegion.empty();
      });
  },
  
  // Handles displaying a single channel and all it's messages
  onChannel: function(userToken, channelID) {
    this.loadingRegion.show(new LoadingView());
    
    const channelModel = new ChannelModel({ id: channelID, token: userToken });
    
    channelModel.fetch()
      .then(() => {
        this.contentRegion.show(new IMListView({ collection: channelModel.get('messages') }));
      })
      .catch(error => {
        this.contentRegion.show(
          new ErrorView({ header: `Couldn't show conversation` })
        );
      })
      .then(() => {
        this.loadingRegion.empty();
      });
  }
});

export var ChannelRouter = Marionette.AppRouter.extend({
  appRoutes: {
    'list/:userToken': 'onListChannels',
    'channel/:userToken/:channelID': 'onChannel'
  }
});