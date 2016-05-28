import Marionette from 'backbone.marionette';

export default Marionette.Region.extend({
  attachHtml: function(view){
    // Some effect to show the view:
    this.$el.empty().append(view.el);
    this.$el.hide().fadeIn('slow');
  }
});
