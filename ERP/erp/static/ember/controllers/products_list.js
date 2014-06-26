App.ProductsViewController = Ember.ArrayController.extend({

    search: '',

    filteredProducts: function () {
        var context = this;
        return this.get('model').filter(function (item) {
            return item.get('tags').some(function (tag) {
                return tag.get('name').toLowerCase().indexOf(context.get('search').toLowerCase()) > -1
            });
        });
    }.property('search', 'model.@each.brand')
});
