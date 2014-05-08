Erp = Ember.Application.create();

Erp.ApplicationAdapter = DS.RESTAdapter.extend({
    host: 'http://192.168.1.102:5002'
});


//Erp.ApplicationSerializer = DS.RESTSerializer.extend({
//    extractArray: function (store, type, payload) {
//        var list = [];
//
//        payload.forEach(function (item) {
//            item.value.id = item.value._id;
//            delete item.value._id;
//            list.push(item.value)
//        });
//        payload = {};
//        payload[type.typeKey+'s'] = list;
//
//        return this._super(store, type, payload);
//    },
//
//    extractSingle: function (store, type, payload) {
//        var json = {};
//        payload.id = payload._id;
//        delete payload._id;
//        json[type.typeKey] = payload;
//        payload = json;
//        return this._super(store, type, payload);
//    }
//});


