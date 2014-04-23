Erp.Router.map(function () {
    this.resource('erp', {path: '/'}, function () {
        this.resource('products', function() {
            this.route('new');
        });
    });

});

Erp.ProductsNewRoute = Ember.Route.extend({
    model: function () {
        return {};
    }
});