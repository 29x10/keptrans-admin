Erp.ListTransform = DS.Transform.extend({
    deserialize: function(serialized) {
        return serialized;
    },
    serialize: function(deserialized) {
        return deserialized;
    }
});

Erp.Product = DS.Model.extend({
    brand: DS.attr('string'),
    category: DS.attr('string'),
    spec: DS.attr('string'),
    desc: DS.attr('string'),
    cover: DS.attr('string'),
    rows: DS.attr('list')
});


