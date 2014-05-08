Erp.ProductsNewController = Ember.ArrayController.extend({

    formError: false,

    productError: Ember.A(),

    isLoading: false,

    brandNone: false,

    categoryNone: false,

    specNone: false,

    priceNone: false,

    files: Ember.A(),

    brand: "",

    category: "",

    spec: "",

    price: "",

    desc: "",

    cover: "",

    coverIsSet: false,

    coverIndex: -1,

    actions: {
        addProduct: function () {
            var context = this;

            context.set('formError', false);
            context.set('productError', Ember.A());


            ['brandNone', 'categoryNone', 'specNone', 'priceNone'].forEach(function (field) {
                context.set(field, false);
            });

            var newProduct = this.store.createRecord('product', {
                brand: context.get('brand'),
                category: context.get('category'),
                spec: context.get('spec'),
                price: context.get('price'),
                desc: context.get('desc'),
                cover: context.get('cover')
            });
            
            context.set('isLoading', true);

            newProduct.save().then(
                function (respond) {
                    context.set('isLoading', false);
                    var success = $('.ui.dimmer.page');
                    success.dimmer('show');
                    window.setTimeout(function () {
                        success.dimmer('hide');
                    }, 2000);
                    context.set('brand', '');
                    context.set('category', '');
                    context.set('spec', '');
                    context.set('price', '');
                    context.set('desc', '');
                    context.set('cover', '');
                }, function (response) {
                    newProduct.deleteRecord();
                    context.set('isLoading', false);
                    context.set('formError', true);
                   response.responseJSON.errors.forEach(function (error) {
                       var productError = context.get('productError');
                       productError.pushObject(error.description);
                   });
                });
        },

        uploadImage: function () {
            $('#upload').trigger("click");
        }
    }
});
