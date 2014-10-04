App.ProductsIndexController = Ember.ArrayController.extend({

    search: '',

    filteredProducts: function () {
        var _this = this;
        return this.get('model').filter(function (product_master) {
            return product_master.get('tags').then(function(tags) {
                return tags.some(function (tag) {
                    return tag.get('name').toLowerCase().indexOf(_this.get('search').toLowerCase()) > -1
                })
            });
        });
    }.property('search', 'model.@each.brand')
});
