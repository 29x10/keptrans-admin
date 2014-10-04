App.ProductMaster = DS.Model.extend({
    brand: DS.attr('string'),
    category: DS.attr('string'),
    cover: DS.attr('string'),
    desc: DS.attr('string'),
    pubDate: DS.attr('string'),
    modifiedDate: DS.attr('string'),


    tags: DS.hasMany('productTag', {async: true}),
    images: DS.hasMany('productImage', {async: true}),
    products: DS.hasMany('product', {async: true})
});

App.ProductTag = DS.Model.extend({
    name: DS.attr('string')
});

App.ProductImage = DS.Model.extend({
    url: DS.attr('string'),


    productMaster: DS.belongsTo('productMaster', {async: true})
});

App.Product = DS.Model.extend({
    brand: DS.attr('string'),
    pattern: DS.attr('string'),
    price: DS.attr('string'),
    deadline: DS.attr('string'),
    unit: DS.attr('string'),
    sku: DS.attr('string'),
    pubDate: DS.attr('string'),
    modifiedDate: DS.attr('string'),

    productMaster: DS.belongsTo('productMaster', {async: true})
});