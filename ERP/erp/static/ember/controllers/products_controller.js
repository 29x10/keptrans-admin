Erp.ProductsNewController = Ember.ObjectController.extend({
    actions: {
        addProduct: function () {

            this.set('formError', false);

            ['brandNone', 'categoryNone', 'specNone', 'priceNone'].forEach(function (field) {
                this.set(field, false);
            }.bind(this));

            var newProduct = this.store.createRecord('product', {
                brand: this.get('brand'),
                category: this.get('category'),
                spec: this.get('spec'),
                price: this.get('price')
            });
            
            this.set('isLoading', true);

            newProduct.save().then(
                function (respond) {
                    this.set('isLoading', false);
                    var success = $('.ui.dimmer.page');
                    success.dimmer('show');
                    window.setTimeout(function () {
                        success.dimmer('hide');
                    }, 2000);
                    this.set('brand', '');
                    this.set('category', '');
                    this.set('spec', '');
                    this.set('price', '');
                }.bind(this), function (response) {
                    this.set('isLoading', false);
                    this.set('formError', true);
                   response.responseJSON.errors.forEach(function (error) {
                       this.set(error.name + 'None', true);
                   }.bind(this));
                }.bind(this));
        },

        uploadImage: function () {
            $('#upload').trigger("click");
        }
    }
});
