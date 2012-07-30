var NameView = Backbone.View.extend({
    tagName : 'div',
    initialize      :   function () {
      'use strict';
                                _.bindAll(this, 'render', 'updateModel');                                   
                                this.template =  Handlebars.compile($("#name-template").html());                                
                            },
        events          :   {
                                "click #wizard .btn-previousView": "updateModel",
                                "click #wizard .btn-nextView": "updateModel"
                            },
        render          :   function () {
          'use strict';
            var json = JSON.parse(JSON.stringify(this.model.toJSON()));
            $(this.el).empty();
            $(this.el).append(this.template(json));
                                return this;
                            },
        updateModel     :   function(){
          'use strict';
            this.model.set({name:$('#name',this.el).val()});                              
                            }
});