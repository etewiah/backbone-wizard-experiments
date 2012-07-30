var WizardView = Backbone.View.extend({
        tagName: 'div',
        initialize: function () {
            _.bindAll(this, 'render', 'movePrevious', 'moveNext', 'insertView', 'save', 'moveToTab');             
            $(this.el).append($($("#wizard-template").html()));            
            this.wizardViewTabs = $(this.el).find('#wizard-view-tabs');            
            this.wizardViewContainer = $(this.el).find('#wizard-view-container');            
            this.wizardViews = new WizardViews();
        },    
        events: {            
            "click .btn-previousView": "movePrevious",
            "click .btn-nextView": "moveNext",
            "click .btn-save": "save",
            "click .nav-tabs a": "moveToTab"
        },
        
        render: function () {
            var currentView = this.wizardViews.getCurrent();            
            if (currentView !== null) {
                
                if (currentView.getNext() === null) {
                    $('.btn-nextView', this.el).hide();
                    $('.form-actions', this.el).show();
                } else {
                    $('.btn-nextView', this.el).show();
                    $('.form-actions', this.el).hide();
                }
                if (currentView.getPrevious() === null) {
                    $('.btn-previousView', this.el).hide();
                } else {
                    $('.btn-previousView', this.el).show();
                }
                
                //clear the active tab css class
                this.wizardViewTabs.
                    find('li').removeClass('active');
                
                //set the active tab for the current view
                this.wizardViewTabs.
                    find('a[title=' + currentView.getTab() + ']').
                    parents('li:first').addClass('active');                    
                
                //show only the current view
                this.wizardViewContainer.find('.wizard-view:parent').hide();                
                $(currentView.getView().render().el).show();
                
            }
            return this;
        },
        //set tab and insert view within parent views manager
        insertView: function (view) {
            
            var tab = view.tab;
            view.tab = view.tab.replace(/\s/g, '-');            
            
            this.wizardViewTabs.
                append('<li><a href="#' + view.tab + '" title="' + view.tab + '">' + tab + '</a></li>');
            
            this.wizardViewContainer.append($(view.ref.render().el).hide());            
            this.wizardViews.insertView(view);
        },
        movePrevious: function () {
            this.updateModel();
            this.wizardViews.movePrevious();
            this.render();
            return false;
        },

        moveNext: function () {
            this.updateModel();
            this.wizardViews.moveNext();
            this.render();
                        return false;
        },
        moveToTab: function (e) {
            e = e || window.event;
            var anchor = $(e.srcElement || e.target);
            this.updateModel();
            this.wizardViews.setCurrentByTab($(anchor).attr('title'));
            this.render();
                        return false;
        },
        updateModel: function () {
            this.wizardViews.getCurrent().getView().updateModel();
            //favor view update method convention to force synchronous updates
        },
        save: function () {
            this.updateModel();
            alert(JSON.stringify(this.model.toJSON()));
        }
    });    