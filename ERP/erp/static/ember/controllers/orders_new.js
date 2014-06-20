App.OrdersNewController = Ember.ObjectController.extend({

    orderList: Ember.A(),

    client: "",

    deliveryAddress: undefined,

    contractInfo: undefined,

    actions: {
        addOrder: function (product) {
            var new_order = this.store.createRecord('order', {
                unitPrice: product.get('price'),
                amount: '1',
                tax: '0',
                product: product
            });
            this.get('orderList').pushObject(new_order);
        },

        setClient: function (client) {
            this.set('client', client);
        },

        setContractInfo: function (contract_info) {
            this.set('contractInfo', contract_info);
        },

        setDeliveryAddress: function (address) {
            this.set('deliveryAddress', address);
        },

        createOrder: function () {
            var _this = this;
            var new_order_master = this.store.createRecord('orderMaster', {
                company: _this.get('contractInfo.company'),
                address: _this.get('contractInfo.address'),
                bank: _this.get('contractInfo.bank'),
                bankAccount: _this.get('contractInfo.bankAccount'),
                tax: _this.get('contractInfo.tax'),

                legalPerson: _this.get('contractInfo.legalPerson'),
                phone: _this.get('contractInfo.phone'),
                fax: _this.get('contractInfo.fax'),

                deliveryAddress: _this.get('deliveryAddress.address'),
                orderStatus: "1",

                client: _this.get('client')
            });
            new_order_master.save().then(function () {
                new_order_master.get('orders').pushObjects(_this.get('orderList'));
                new_order_master.get('orders').save();
            });
        }
    }
});
