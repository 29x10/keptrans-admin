Erp.ProductsNewController = Ember.ArrayController.extend({

    formError: false,
    // server respond
    productError: Ember.A(),

    isLoading: false,

    // attr
    brandError: false,
    categoryError: false,
    specError: false,

    coverObject: false,


    files: Ember.A(),

    brand: "",

    category: "",

    spec: "",

    desc: "",

    cover: "",

    rows: function () {
        var rows = Ember.A();
        rows.pushObject({price: "", spec: "", image: ""});
        return rows
    }(),

    actions: {
        publishProduct: function () {
            var context = this;

            context.set('formError', false);
            context.set('productError', Ember.A());

            var newProduct = this.store.createRecord('product', {
                brand: context.get('brand'),
                category: context.get('category'),
                spec: context.get('spec'),
                cover: context.get('cover'),
                desc: context.get('desc'),
                rows: context.get('rows')
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
        },

        addProduct: function () {
            var rows = this.get('rows');
            rows.pushObject({price: "", spec: "", image: ""});
        }

    }
});
