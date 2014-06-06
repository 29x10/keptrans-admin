Erp.ProductsViewController = Ember.ArrayController.extend({

    search: '',

    filteredProducts: function () {
        var context = this;
        return this.get('model').filter(function (item) {
            return item.get('tags').some(function (tag) {
                return tag.get('name').indexOf(context.get('search')) > -1
            });
        })
    }.property('search', 'model.@each.brand')
});
