import Marionette from 'backbone.marionette';
import Backbone from 'backbone';

// Fix for marionette inspector
if (window.__agent) {
  window.__agent.start(Backbone, Marionette);
}

import { IndexRouter, IndexController } from './routers/IndexRouter';
import { ChannelController, ChannelRouter } from './routers/ChannelRouter';

import PageLayoutView from './views/PageLayoutView';
import HeaderView from './views/HeaderView';

var StalkerApp = Marionette.Application.extend({
  onStart: function() {
    this.layout = new PageLayoutView();

    this.setupModels();
    this.setupRoutes();
    
    this.layout.showChildView('headerRegion', new HeaderView());

    Backbone.history.start();
  },

  setupModels(){
    //this.searchModel = new BookSearchModel();
  },

  // Setup all our controllers and routes
  setupRoutes(){
    this.indexController = new IndexController({ layout: this.layout });
    this.indexRouter = new IndexRouter({ controller: this.indexController });
    
    this.channelController = new ChannelController({ layout: this.layout });
    this.channelRouter = new ChannelRouter({ controller: this.channelController });
  }
});

var app = new StalkerApp();
app.start();