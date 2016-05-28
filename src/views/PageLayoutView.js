import Marionette from 'backbone.marionette';

import FadeInRegion from '../regions/FadeInRegion';

export default Marionette.LayoutView.extend({
  el: 'body',
  regions: {
    headerRegion: '#header-region',
    searchRegion: '#search-region',
    controlsRegion: '#pagecontrols-region',
    loadingRegion: '#loading-region',
    
    contentRegion: {
      selector: '#content-region',
      regionClass: FadeInRegion
    }
  }
});