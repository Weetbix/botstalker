import Backbone from 'backbone';

import IMModel from './IMModel';

export default Backbone.Collection.extend({
  model: IMModel
});