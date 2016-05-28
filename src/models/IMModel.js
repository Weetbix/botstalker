import Backbone from 'backbone';

export default Backbone.Model.extend({
  defaults: {
    type: '',
    ts: '0',
    user: '',
    text: '',
  }
});