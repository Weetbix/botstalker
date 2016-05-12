import Backbone from 'backbone';

import IMModel from './IMModel';

export default Backbone.Collection.extend({
  model: IMModel,
  url: 'https://slack.com/api/im.list',
  
  parse: function(collection){
    return collection.ims;
  }
});