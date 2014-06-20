App.Client = DS.Model.extend({
    mobile: DS.attr('string'),
    name: DS.attr('string'),

    orders: DS.hasMany('orderMaster'),
    contractInfos: DS.hasMany('contractInfo'),
    deliveryAddresses: DS.hasMany('deliveryAddress')
});


App.ContractInfo = DS.Model.extend({
    company: DS.attr('string'),
    address: DS.attr('string'),
    bank: DS.attr('string'),
    bankAccount: DS.attr('string'),
    tax: DS.attr('string'),

    legalPerson: DS.attr('string'),
    phone: DS.attr('string'),
    fax: DS.attr('string'),

    client: DS.belongsTo('client')
});


App.DeliveryAddress = DS.Model.extend({
    address: DS.attr('string'),

    client: DS.belongsTo('client')
});