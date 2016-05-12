import Marionette from 'backbone.marionette';
import template from '../templates/ChannelListViewItem.hbs';

export default Marionette.ItemView.extend({
  template: template,
  className: 'card'
});