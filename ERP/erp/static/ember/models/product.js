App.ProductMaster = DS.Model.extend({
    brand: DS.attr('string'),
    category: DS.attr('string'),
    cover: DS.attr('string'),
    desc: DS.attr('string'),
    pubDate: DS.attr('string'),
    modifiedDate: DS.attr('string'),


    tags: DS.hasMany('productTag'),
    images: DS.hasMany('productImage'),
    products: DS.hasMany('product')
});

App.ProductTag = DS.Model.extend({
    name: DS.attr('string'),


    productMasters: DS.hasMany('productMaster')
});

App.ProductImage = DS.Model.extend({
    url: DS.attr('string'),


    productMaster: DS.belongsTo('productMaster')
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

    productMaster: DS.belongsTo('productMaster')
});