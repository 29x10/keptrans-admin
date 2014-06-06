Erp.ProductIndexController = Ember.ObjectController.extend({

    selectedImg: false,

    actions: {

        select: function (url) {
            this.set('selectedImg', url);
        },

        deleteProduct: function () {
            Ember.$('.ui.modal.remove').modal('show');
        },

        confirmDelete: function () {
            var product = this.get('model');
            var context = this;

            product.get('products').forEach(function (product) {
                product.deleteRecord();
            });
            product.get('images').forEach(function (image) {
                image.deleteRecord();
            });
            product.destroyRecord().then(function () {
                context.transitionToRoute('products.view');
            });

        }
    }
});
