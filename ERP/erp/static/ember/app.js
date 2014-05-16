Erp = Ember.Application.create();

Erp.ApplicationAdapter = DS.RESTAdapter.extend({
    host: 'http://api.keptrans.com'
});

Erp.Router.reopen({
    location: 'history'
});


Ember.LinkView.reopen({
    closeSideBar: false,
    _invoke: function (event) {
        var result = this._super(event);
        var action = this.get('closeSideBar');
        if(action) {
            Ember.$('.ui.sidebar').sidebar({overlay: true}).sidebar('hide');
        }
        // no action to take, handle the link-to normally
        return result;
    }
});