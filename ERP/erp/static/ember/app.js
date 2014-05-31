Erp = Ember.Application.create();

Erp.API_HOST = 'http://api.keptrans.com';
//
//Erp.API_HOST = 'http://127.0.0.1:5002';

Erp.API_NAME_SPACE = "";

Erp.ApplicationAdapter = DS.RESTAdapter.extend({
    host: Erp.API_HOST
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