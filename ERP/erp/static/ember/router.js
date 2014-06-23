App.Router.map(function () {
    this.resource('erp', {path: '/'}, function () {
        this.resource('products', function () {
            this.route('new');
            this.route('view');
            this.resource('product', {path: ':product_id'}, function () {
                this.route('edit');
            });
        });
        this.resource('orders', function () {
            this.route('new');
            this.route('view');
            this.resource('order', {path: ':order_id'}, function () {
                this.route('pay');
            });
        });
        this.resource('clients', function () {
            this.route('new');
            this.route('view');
        })
    });
    this.route('login');
    this.route('logout');

});

App.ApplicationRoute = Ember.Route.extend({
    activate: function() {
        var _this = this;
        Ember.A([
            'sessionAuthenticationSucceeded',
            'sessionAuthenticationFailed',
            'sessionInvalidationSucceeded',
            'sessionInvalidationFailed',
            'authorizationFailed'
        ]).forEach(function(event) {
            _this.get('session').on(event, function(error) {
                Array.prototype.unshift.call(arguments, event);
                _this.send.apply(_this, arguments);
            });
        });
    },

    actions: {

        authenticateSession: function() {
            this.transitionTo('login');
        },

        sessionAuthenticationSucceeded: function() {
            var attemptedTransition = this.get('session').get('attemptedTransition');
            if (attemptedTransition) {
                attemptedTransition.retry();
                this.get('session').set('attemptedTransition', null);
            } else {
                this.transitionTo('erp');
            }
        },

        sessionAuthenticationFailed: function(error) {
        },

        invalidateSession: function() {
            this.get('session').invalidate();
        },

        sessionInvalidationSucceeded: function() {
            window.location.replace('/');
        },

        sessionInvalidationFailed: function(error) {
        },

        authorizationFailed: function() {
            if (this.get('session').get('isAuthenticated')) {
                this.get('session').invalidate();
            }
        }
    }
});

App.ErpRoute = Ember.Route.extend(Ember.SimpleAuth.AuthenticatedRouteMixin, {
    actions: {
        showSideBar: function () {
            Ember.$('.ui.sidebar').sidebar({overlay: true}).sidebar('show');
        },

        hideSideBar: function () {
            Ember.$('.ui.sidebar').sidebar({overlay: true}).sidebar('hide');
        }
    }
});


App.ProductsRoute = Ember.Route.extend({
    model: function () {
        return this.store.findAll('productMaster');
    }
});


App.ProductRoute = Ember.Route.extend({
    model: function (params) {
        return this.store.find('productMaster', params.product_id);
    }
});


App.OrdersNewRoute = Ember.Route.extend({
    model: function () {
        return Ember.RSVP.hash({
            products: this.store.findAll('product'),
            clients: this.store.findAll('client')
        });
    }
});

App.OrdersRoute = Ember.Route.extend({
    model: function () {
        return Ember.RSVP.hash({
            orders: this.store.findAll('orderMaster')
        });
    }
});


App.OrderRoute = Ember.Route.extend({
    model: function (params) {
        return this.store.find('orderMaster', params.order_id);
    }
});

App.ClientsRoute = Ember.Route.extend({
    model: function () {
        return this.store.findAll('client');
    }
});