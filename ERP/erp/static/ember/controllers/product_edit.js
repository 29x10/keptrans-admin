App.ProductEditController = Ember.ObjectController.extend({

    isLoading: false,

    files: Ember.A(),

    brandError: false,

    categoryError: false,

    descError: function () {
        return !this.get('desc');
    }.property('desc.length'),

    coverError: function () {
        return !this.get('cover');
    }.property('cover'),

    tagsError: function () {
        return !this.get('tags.length');
    }.property('tags.length'),

    imagesError: function () {
        return !this.get('images.length');
    }.property('images.length'),

    productsError: function () {
        return !this.get('products.length');
    }.property('products.length'),

    error: function () {
        return this.get('brandError') || this.get('categoryError') || this.get('descError') || this.get('coverError')
            || this.get('productsError') || this.get('tagsError') || this.get('imagesError');
    }.property('brandError', 'categoryError', 'descError', 'coverError', 'productsError', 'tagsError', 'imagesError'),

    productsRemoved: Ember.A(),

    imagesRemoved: Ember.A(),

    actions: {
        addProduct: function () {
            Ember.$('#product').modal('show');
        },

        removeProduct: function (product) {
            product.deleteRecord();
            if (product.get('id')) {
                this.get('productsRemoved').pushObject(product);
            } else {
                this.get('products').removeObject(product);
            }
        },

        addTag: function (tag) {
            var exist_tag = this.store.all('productTag').find(function (item) {
                return item.get('name') === tag.name;
            });
            var new_tag;
            if (exist_tag) {
                new_tag = exist_tag
            } else {
                new_tag = this.store.createRecord('productTag', tag);
                new_tag.save();
            }
            this.get('tags').pushObject(new_tag);
        },

        removeTag: function (tag) {
            this.get('tags').removeObject(tag);
        },


        confirmAddProduct: function (product) {
            var new_product = this.store.createRecord('product', product);
            this.get('products').pushObject(new_product);
            Ember.$('#product').modal('show');
        },

        addProductImage: function (new_image) {
            this.get('images').pushObject(new_image);
        },

        removeProductImage: function (image) {
            image.deleteRecord();
            if (image.get('id')) {
                this.get('imagesRemoved').pushObject(image);
            } else {
                this.get('images').removeObject(image);
            }
        },

        uploadImage: function () {
            Ember.$('#upload').trigger("click");
        },

        publishProduct: function () {

            var context = this;

            var productMaster = this.get('model');
            productMaster.get('products').forEach(function (product) {
                if (product.get('isDirty')) {
                    product.set('productMaster', productMaster);
                    product.save();
                }
            });
            this.get('productsRemoved').forEach(function (product) {
                product.save();
            });
            productMaster.get('images').forEach(function (image) {
               if (image.get('isDirty')) {
                   image.set('productMaster', productMaster);
                   image.save();
               }
            });
            this.get('imagesRemoved').forEach(function (image) {
                image.save();
            });
            this.set('productsRemoved', Ember.A());
            this.set('imagesRemoved', Ember.A());
            productMaster.save().then(function () {
                context.set('files', Ember.A());
            });
        }

    }
});


App.ProductEditListActionController = Ember.ObjectController.extend({

    needs: ['productEdit'],

    actions: {

        cancel: function () {
            if (this.get('model.isDirty')) {
                this.get('model').rollback();
            }
        },


        deleteProduct: function () {
            var product = this.get('model');
            this.get('controllers.productEdit').send('removeProduct', product);
        }



    }
});
