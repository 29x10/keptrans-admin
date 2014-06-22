App.OrderMaster = DS.Model.extend({

    pubDate: DS.attr('string'),
    modifiedDate: DS.attr('string'),
    status: DS.attr('string'),
    total: DS.attr('string'),
    memo: DS.attr('string'),

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
    origin: DS.attr('string'),
    discount: DS.attr('string'),
    tax: DS.attr('string'),

    amount: DS.attr('string'),

    localPrice: function () {
        return ((100 - parseInt(this.get('discount')))*parseFloat(this.get('origin'))
            /(100 - parseInt(this.get('tax')))).toFixed(2);
    }.property('origin', 'discount', 'tax'),

    serverPrice: DS.attr('string'),

    localTotalPrice: function () {
        return (this.get('localPrice')*parseInt(this.get('amount'))).toFixed(2);
    }.property('localPrice', 'amount'),

    serverTotalPrice: DS.attr('string'),

    product: DS.belongsTo('product'),

    orderMaster: DS.belongsTo('orderMaster')

});