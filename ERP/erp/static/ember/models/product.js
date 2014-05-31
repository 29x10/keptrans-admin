Erp.ProductMaster = DS.Model.extend({
    brand: DS.attr('string'),
    category: DS.attr('string'),
    cover: DS.attr('string'),
    desc: DS.attr('string'),


    tags: DS.hasMany('productTag'),
    images: DS.hasMany('productImage'),
    products: DS.hasMany('product')
});

Erp.ProductTag = DS.Model.extend({
    name: DS.attr('string'),


    productMasters: DS.hasMany('productMaster')
});

Erp.ProductImage = DS.Model.extend({
    url: DS.attr('string'),


    productMaster: DS.belongsTo('productMaster')
});

Erp.Product = DS.Model.extend({
    brand: DS.attr('string'),
    pattern: DS.attr('string'),
    price: DS.attr('string'),
    deadline: DS.attr('string'),
    unit: DS.attr('string'),
    sku: DS.attr('string'),


    productMaster: DS.belongsTo('productMaster')
});