var User = Backbone.Model.extend({});
var _user = new User();

$(function(){    
   'use strict';
   // Wizard.initialize(_user);    
   // Wizard.insertView({ref:new NameView({model:_user}),tab:'Update Name'});    
   // Wizard.insertView({ref:new AgeView({model:_user}),tab:'Update Age  '});
   // Wizard.insertView({ref:new CityView({model:_user}),tab:'Update City'});    
   // Wizard.insertView({ref:new ConfirmView({model:_user}),tab:'Confirm'});    
   // $('#wizard-container').append(Wizard.render().el); 

   var wizardView = new WizardView({model:_user}); 
   var nameView = new NameView({model:_user}); 
   var ageView = new AgeView({model:_user}); 
   wizardView.insertView({ref:nameView,tab:'Updt Name'});
   wizardView.insertView({ref:ageView,tab:'Updt Age'});
   $('#wizard-container').append(wizardView.render().el);
});