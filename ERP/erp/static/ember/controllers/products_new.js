App.ProductsNewController = Ember.ArrayController.extend({

    isLoading: false,

    files: Ember.A(),

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

            var _this = this;

            var productMaster = this.store.createRecord('productMaster', {
                brand: _this.get('brand'),
                category: _this.get('category'),
                cover: _this.get('cover'),
                desc: _this.get('desc')
            });

            productMaster.get('tags').then(function (tags) {
                tags.pushObjects(_this.get('tags'));
            }).then(function () {
                return productMaster.save();
            }).then(function () {
                return productMaster.get('products');
            }).then(function (products) {
                return products.pushObjects(_this.get('products'));
            }).then(function (products) {
                return products.save();
            }).then(function () {
                return productMaster.get('images');
            }).then(function (images) {
                return images.pushObjects(_this.get('images'));
            }).then(function (images) {
                return images.save();
            }).then(function () {
                _this.set('brand', '');
                _this.set('category', '');
                _this.set('desc', '');
                _this.set('cover', '');
                _this.set('products', Ember.A());
                _this.set('tags', Ember.A());
                _this.set('images', Ember.A());
                _this.set('files', Ember.A());
                alertify.success("成功添加产品");
            });


        },

        uploadImage: function () {
            Ember.$('#upload').trigger("click");
        },

        addProduct: function () {
            Ember.$('#product').modal('show');
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
            Ember.$('#product').modal('hide');
        },

        addProductImage: function (new_image) {
            this.get('images').pushObject(new_image);
        },

        removeProductImage: function (image) {
            image.deleteRecord();
            this.get('images').removeObject(image);
        }
    }
});
