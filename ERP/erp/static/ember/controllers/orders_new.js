App.OrdersNewController = Ember.ObjectController.extend({

    orderList: Ember.A(),

    client: "",

    deliveryAddress: undefined,

    contractInfo: undefined,

    totalPrice: function () {
        var orders = this.get('orderList');
        var total = orders.reduce(function (previousValue, order) {
            return previousValue + parseFloat(order.get('localTotalPrice'));
        }, 0);
        return total.toFixed(2);
    }.property('orderList.@each.localTotalPrice'),

    actions: {
        addOrder: function (product) {
            var new_order = this.store.createRecord('order', {
                origin: product.get('price'),
                amount: '1',
                discount: '0',
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
                status: "1",
                total: _this.get('totalPrice'),
                memo: _this.get('memo'),

                client: _this.get('client')
            });
            new_order_master.save().then(function () {
                new_order_master.get('orders').pushObjects(_this.get('orderList'));
                new_order_master.get('orders').save();
            }).then(function () {
                alertify.success("下单成功");
                _this.set('orderList', Ember.A());
                _this.set('client', "");
                _this.set('deliveryAddress', undefined);
                _this.set('contractInfo', undefined);
            });
        },

        deleteOrder: function (order) {
            order.deleteRecord();
            this.get('orderList').removeObject(order);
        }
    }
});
