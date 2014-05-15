Erp.Router.map(function () {
    this.resource('erp', {path: '/'}, function () {
        this.resource('products', function() {
            this.route('new');
            this.route('view');
            this.resource('product', {path: ':product_id'}, function () {
                this.route('edit');
            });
        });
    });

});

Erp.ErpRoute = Ember.Route.extend({
    actions: {
        showSideBar: function () {
            Ember.$('.ui.sidebar').sidebar({overlay: true}).sidebar('show');
        },

        hideSideBar: function () {
            Ember.$('.ui.sidebar').sidebar({overlay: true}).sidebar('hide');
        }
    }
});

Erp.ProductsNewRoute = Ember.Route.extend({
    model: function () {
        return [];
    }
});


Erp.ProductsRoute = Ember.Route.extend({
    model: function () {
        return this.store.findAll('product');
    }

});


Erp.ProductRoute = Ember.Route.extend({
    model: function (params) {
        return this.store.find('product', params.product_id);
    }
});