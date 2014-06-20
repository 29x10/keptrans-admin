App.ClientsNewController = Ember.ArrayController.extend({

    mobile: '',
    name: '',

    contractInfos: Ember.A(),

    addresses: Ember.A(),
    actions: {


        pubClient: function () {
            var _this = this;
            var new_client = this.store.createRecord('client',
                {
                    mobile: this.get('mobile'),
                    name: this.get('name')
                });
            new_client.save().then(function () {
                new_client.get('contractInfos').pushObjects(_this.get('contractInfos'));
                new_client.get('deliveryAddresses').pushObjects(_this.get('addresses'));
                Ember.RSVP.hash({
                    contractInfos: new_client.get('contractInfos').save(),
                    deliveryAddress: new_client.get('deliveryAddresses').save()
                });
            }).then(function () {
                alertify.success("成功添加客户");
                _this.set('mobile', '');
                _this.set('name', '');
                _this.set('contractInfos', Ember.A());
                _this.set('addresses', Ember.A());
            })

        },

        addInfo: function () {
            Ember.$('.ui.modal.contractInfo').modal('show');
        },

        confirmAddContractInfo: function (contractInfo) {
            this.get('contractInfos').pushObject(this.store.createRecord('contractInfo', contractInfo));
        },

        removeContractInfo: function (contractInfo) {
            contractInfo.deleteRecord();
            this.get('contractInfos').removeObject(contractInfo);
        },

        addAddress: function () {
            var address = this.store.createRecord('deliveryAddress');
            this.get('addresses').pushObject(address);
        },

        removeAddress: function (address) {
            this.get('addresses').removeObject(address);
        }


    }
});
