Ember.Application.initializer({
    name: 'authentication',
    initialize: function(container, application) {
        container.register('authenticator:custom', App.CustomAuthenticator);
        container.register('authorizer:custom', App.CustomAuthorizer);
        Ember.SimpleAuth.setup(container, application, {
            crossOriginWhitelist: ['http://api.keptrans.com'],
            authorizerFactory: 'authorizer:custom',
            storeFactory: 'ember-simple-auth-session-store:cookie'
        });
    }
});

App = Ember.Application.create();


App.API_HOST = 'http://api.keptrans.com';
//App.API_HOST = 'http://127.0.0.1:5002';

App.API_NAME_SPACE = "";



App.ApplicationAdapter = DS.RESTAdapter.extend({
    host: App.API_HOST
});


App.Router.reopen({
    location: 'history'
});


App.CustomAuthenticator = Ember.SimpleAuth.Authenticators.Base.extend({

    restore: function(data) {
        return new Ember.RSVP.Promise(function(resolve, reject) {
            if (!Ember.isEmpty(data.token)) {
                resolve(data);
            } else {
                reject();
            }
        });
    },


    authenticate: function(credentials) {
        var _this = this;
        return new Ember.RSVP.Promise(function(resolve, reject) {
            Ember.$.ajax({
                url: App.API_HOST + '/' + App.API_NAME_SPACE + 'account',
                type:        'PUT',
                data:        JSON.stringify({ session: { username: credentials.username, password: credentials.password } }),
                contentType: 'application/json; charset=utf-8',
                dataType: 'json'
            }).then(function(response) {
                Ember.run(function() {
                    resolve({ token: response.session.token, username: response.session.username });
                });
            }, function(xhr, status, error) {
                var response = JSON.parse(xhr.responseText);
                Ember.run(function() {
                    reject(response.error);
                });
            }, 'auth');
        });
    },

    invalidate: function() {
        var _this = this;
        return new Ember.RSVP.Promise(function(resolve) {
            Ember.$.ajax({ url: _this.tokenEndpoint, type: 'DELETE' }).always(function() {
                resolve();
            })
        });
    }

});

App.CustomAuthorizer = Ember.SimpleAuth.Authorizers.Base.extend({
    authorize: function(jqXHR, requestOptions) {
        if (this.get('session.isAuthenticated') && !Ember.isEmpty(this.get('session.token'))) {
            jqXHR.setRequestHeader('AUTH_TOKEN', this.get('session.token'));
        }
    }
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