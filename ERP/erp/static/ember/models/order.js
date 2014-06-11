App.OrderMaster = DS.Model.extend({
    orders: DS.hasMany('order'),

    operator: DS.belongsTo('user')

});


App.Order = DS.Model.extend({
    unitPrice: DS.attr('string'),
    amount: DS.attr('string'),
    tax: DS.attr('string'),
    price: DS.attr('string'),

    product: DS.belongsTo('product')

});