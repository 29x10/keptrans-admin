App.ContractInfoAddModalComponent = Ember.Component.extend({
    company: "",

    address: "",

    bank: "",

    bankAccount: "",

    tax: "",

    legalPerson: "",

    phone: "",

    fax: "",

    actions: {
        addContractInfo: function () {
            var contractInfo = {
                company: this.get('company'),
                address: this.get('address'),
                bank: this.get('bank'),
                bankAccount: this.get('bankAccount'),
                tax: this.get('tax'),
                phone: this.get('phone'),
                fax: this.get('fax'),
                legalPerson: this.get('legalPerson')
            };

            this.sendAction('addContractInfo', contractInfo);
        }
    }
});
