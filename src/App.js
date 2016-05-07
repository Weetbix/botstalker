import Marionette from 'backbone.marionette';
import Backbone from 'backbone';

// Fix for marionette inspector
if (window.__agent) {
  window.__agent.start(Backbone, Marionette);
}

import BookSearchModel from './models/BookSearchModel';

import { SearchRouter, SearchController } from './routers/SearchRouter';
import { BookRouter, BookController } from './routers/BookRouter';
import { IndexRouter, IndexController } from './routers/IndexRouter';

import HeaderView from './views/HeaderView';
import SearchBarView from './views/SearchBarView';
import PageLayoutView from './views/PageLayoutView';

// Make sure we override the sync to attach the API key and API url
import { SetupBackboneSync } from './APIConfig';
SetupBackboneSync();

var BookApp = Marionette.Application.extend({
  onStart: function() {
    this.layout = new PageLayoutView();

    this.setupModels();
    this.setupRoutes();

    // Show static views that never change
    this.layout.showChildView('headerRegion', new HeaderView());
    this.setupSearchBar();

    Backbone.history.start();
  },

  // Create and show the search bar
  setupSearchBar(){
    this.searchBar = new SearchBarView();
    this.searchBar.on('search', query => this.searchController.onSearch(query));

    this.layout.showChildView('searchRegion', this.searchBar);
  },

  setupModels(){
    this.searchModel = new BookSearchModel();
  },

  // Setup all our controllers and routes
  setupRoutes(){
    this.indexController = new IndexController({ layout: this.layout });
    this.indexRouter = new IndexRouter({ controller: this.indexController });

    this.bookController = new BookController({
      layout: this.layout,
      bookCollection: this.searchModel
    });
    this.bookRouter = new BookRouter({ controller: this.bookController });

    this.searchController = new SearchController({
      layout: this.layout,
      searchModel: this.searchModel
    });
    this.searchRouter = new SearchRouter({ controller: this.searchController });
    this.searchController.router = this.searchRouter;
  }
});

var app = new BookApp();
app.start();