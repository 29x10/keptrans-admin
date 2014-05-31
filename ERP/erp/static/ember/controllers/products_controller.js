Erp.ProductsNewController = Ember.ObjectController.extend({

    isLoading: false,

    files: Ember.A(),

    reset: false,

    brand: "",

    brandError: true,

    category: "",

    categoryError: true,

    desc: "",

    descError: function () {
        return !this.get('desc');
    }.property('desc.length'),

    cover: "",

    coverError: function () {
        return !this.get('cover');
    }.property('cover'),

    tags: Ember.A(),

    tagsError: function () {
        return !this.get('tags.length');
    }.property('tags.length'),

    images: Ember.A(),

    imagesError: function () {
        return !this.get('images.length');
    }.property('images.length'),

    products: Ember.A(),

    productsError: function () {
        return !this.get('products.length');
    }.property('products.length'),

    error: function () {
        return this.get('brandError') || this.get('categoryError') || this.get('descError') || this.get('coverError')
            || this.get('productsError') || this.get('tagsError') || this.get('imagesError');
    }.property('brandError', 'categoryError', 'descError', 'coverError', 'productsError', 'tagsError', 'imagesError'),


    actions: {
        publishProduct: function () {

            var context = this;

            var productMaster = this.store.createRecord('productMaster', {
                brand: context.get('brand'),
                category: context.get('category'),
                cover: context.get('cover'),
                desc: context.get('desc')
            });

            productMaster.get('tags').pushObjects(context.get('tags'));
            productMaster.save().then(function () {
                productMaster.get('products').pushObjects(context.get('products'));
                productMaster.get('products').save();
                productMaster.get('images').pushObjects(context.get('images'));
                productMaster.get('images').save();
            });


        },

        uploadImage: function () {
            Ember.$('#upload').trigger("click");
        },

        addProduct: function () {
            Ember.$('.ui.modal').modal('show');
        },

        removeProduct: function (product) {
            this.get('products').removeObject(product);
            product.deleteRecord();
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
        },

        addProductImage: function (new_image) {
            this.get('images').pushObject(new_image);
        },

        removeProductImage: function (image) {
            this.get('images').removeObject(image);
        }

    }
});


Erp.ProductListActionController = Ember.ObjectController.extend({

    needs: ['productsNew'],

    isEditing: false,

    actions: {
        edit: function () {
            this.set('isEditing', true);
        },


        done: function () {
            this.set('isEditing', false);
        },


        deleteProduct: function () {
            var product = this.get('model');
            this.get('controllers.productsNew').send('removeProduct', product);
        }


    }
});