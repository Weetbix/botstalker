import Marionette from 'backbone.marionette';
import template from '../templates/BotView.hbs';

import IMListViewItem from './IMListViewItem';

export default Marionette.CompositeView.extend({
  template: template,
  childView: IMListViewItem,
  childViewContainer: '#im-items'
});