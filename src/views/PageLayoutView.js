import Marionette from 'backbone.marionette';

export default Marionette.LayoutView.extend({
  el: 'body',
  regions: {
    headerRegion: '#header-region',
    searchRegion: '#search-region',
    controlsRegion: '#pagecontrols-region',
    contentRegion: '#content-region',
    loadingRegion: '#loading-region'
  }
});