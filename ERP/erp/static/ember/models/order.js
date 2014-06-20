App.OrderMaster = DS.Model.extend({

    pubDate: DS.attr('string'),
    modifiedDate: DS.attr('string'),
    orderStatus: DS.attr('string'),

    company: DS.attr('string'),
    address: DS.attr('string'),
    bank: DS.attr('string'),
    bankAccount: DS.attr('string'),
    tax: DS.attr('string'),

    legalPerson: DS.attr('string'),
    phone: DS.attr('string'),
    fax: DS.attr('string'),

    deliveryAddress: DS.attr('string'),

    orders: DS.hasMany('order'),
    client: DS.belongsTo('client')
});


App.Order = DS.Model.extend({
    unitPrice: DS.attr('string'),
    amount: DS.attr('string'),
    tax: DS.attr('string'),

    price: function () {
        return (parseInt(this.get('unitPrice'))/(100 - parseInt(this.get('tax')))*parseInt(this.get('amount'))*100).toFixed(2);
    }.property('unitPrice', 'amount', 'tax'),

    product: DS.belongsTo('product')

});