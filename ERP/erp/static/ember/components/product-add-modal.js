App.ProductAddModalComponent = Ember.Component.extend({

    brand: "",

    brandError: true,

    pattern: "",

    patternError: true,

    price: "",

    priceError: true,

    deadline: "",

    deadlineError: true,

    sku: "",

    skuError: true,


    unit: "",

    unitError: function () {
        return ['只', '米'].indexOf(this.get('unit')) === -1;
    }.property('unit'),


    formError: function () {
        return this.get('brandError') || this.get('patternError') || this.get('priceError')
            || this.get('deadlineError') || this.get('skuError') || this.get('unitError');
    }.property('brandError', 'patternError', 'priceError', 'deadlineError', 'skuError', 'unitError'),


    actions: {
        addProduct: function () {
            var product = {
                brand: this.get('brand'),
                pattern: this.get('pattern'),
                price: this.get('price'),
                deadline: this.get('deadline'),
                sku: this.get('sku'),
                unit: this.get('unit')
            };

            this.sendAction('addProduct', product);
        }
    },

    didInsertElement: function () {
        this.$('.ui.dropdown').dropdown();
    }

});
