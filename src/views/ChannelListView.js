import Marionette from 'backbone.marionette';
import template from '../templates/ChannelListView.hbs';

import ChannelListViewItem from './ChannelListViewItem';

export default Marionette.CompositeView.extend({
  template: template,
  childView: ChannelListViewItem,
  childViewContainer: '#channel-items',
  
  // Expose the collection length to the template
  templateHelpers: function(){
    return {
      length: this.collection.length
    };
  }
});