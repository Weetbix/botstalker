import Marionette from 'backbone.marionette';
import template from '../templates/ErrorView.hbs';

export default Marionette.ItemView.extend({
  template: template,
  
  templateHelpers: function(){
    return {
      message: this.options.message
    };
  }
});