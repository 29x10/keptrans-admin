Erp.ProductIndexController = Ember.ObjectController.extend({

    selected: false,

    actions: {
        select: function (target) {
            var context = this;
            var selected = context.get('selected');

            if (!selected) {
                selected = {};
            }
            Ember.set(selected, 'selected', false);
            this.get('rows').forEach(function (row) {
                if (row === target) {
                    Ember.set(row, 'selected', true);
                    context.set('selected', row);
                }
            });
        },

        deleteProduct: function () {
            Ember.$('.ui.modal.remove').modal('show');
        },

        confirmDelete: function () {
            var product = this.get('model');
            var context = this;
            product.destroyRecord().then(function (response) {
                var success = Ember.$('.ui.dimmer.page');
                success.dimmer('show');
                window.setTimeout(function () {
                    success.dimmer('hide');
                    context.transitionToRoute('products.view');
                }, 2000);
            }, function (response) {
                console.log(response);
            });
        }
    }
});


Erp.ProductEditController = Ember.ObjectController.extend({

    files: Ember.A(),

    actions: {
        removeProduct: function (row) {
            var rows = this.get('rows');
            if (rows.length > 1) {
                rows.removeObject(row);
            }
        },

        addProduct: function () {
            var rows = this.get('rows');
            rows.pushObject({price: "", spec: "", image: ""});
        },

        updateProduct: function () {
            var product = this.get('model');
            var context = this;
            product.save().then(function (response){
                var success = Ember.$('.ui.dimmer.page');
                success.dimmer('show');
                window.setTimeout(function () {
                    success.dimmer('hide');
                    context.transitionToRoute('product', product);
                }, 2000);
                console.log(response);
            }, function (response) {
                console.log(response);
            });
        },

        uploadImage: function () {
            $('#upload').trigger("click");
        },

        rollback: function () {
            this.get('model').reload();
        }
    }
});