Erp.ProductsNewController = Ember.ArrayController.extend({

    formError: false,
    // server respond
    productError: Ember.A(),

    isLoading: false,

    files: Ember.A(),

    brand: "",

    category: "",

    spec: "",

    desc: "",

    cover: "",

    rows: Ember.A([{price: "", spec: "", image: "", amount: "", dtime: ""}]),

    reset: false,

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
                    var success = Ember.$('.ui.dimmer.page');
                    success.dimmer('show');
                    window.setTimeout(function () {
                        success.dimmer('hide');
                    }, 2000);
                    context.set('brand', '');
                    context.set('category', '');
                    context.set('spec', '');
                    context.set('desc', '');
                    context.set('cover', '');
                    var rows = Ember.A([{price: "", spec: "", image: "", amount: "", dtime: ""}]);
                    context.set('rows', rows);
                    context.set('reset', true);
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
            rows.pushObject({price: "", spec: "", image: "", amount: "", dtime: ""});
        },

        removeProduct: function (row) {
            var rows = this.get('rows');
            if (rows.length > 1) {
                rows.removeObject(row);
            }
        }

    }
});
