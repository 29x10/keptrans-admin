Erp.ProductSearchComponent = Ember.Component.extend({
    search: "",

    products: Ember.A(),

    selected: 0,

    filtered: Ember.A(),

    orderList: Ember.A(),

    searchChanged: function () {
        var search = this.get('search');
        if (!search) {
            this.set('filtered', Ember.A());
            return;
        }
        var result =  this.get('products').filter(function (item) {
            return item.get('pattern').toLowerCase().indexOf(search) > -1;
        }).slice(0, 20);
        result.forEach(function (item) {
            item.set('active', false);
        });
        if (result.get('length'))  {
            result.objectAt(0).set('active', true);
        }
        this.set('selected', 0);
        this.set('filtered', result);
    }.observes('products.@each.pattern', 'search'),

    keyUp: function (event) {
        var source = this.get('filtered');
        var len = source.get('length');
        var selected = this.get('selected');
        var pre, next;
        if (!len) {
            return;
        }
        console.log(event.keyCode);
        switch (event.keyCode) {
            case 40:
                pre = source.objectAt(selected);
                pre.set('active', false);
                selected = selected + 1;
                if (selected === len) {
                    selected = 0;
                }
                next = source.objectAt(selected);
                next.set('active', true);
                this.set('selected', selected);
                break;
            case 38:
                pre = source.objectAt(selected);
                pre.set('active', false);
                selected = selected - 1;
                if (selected === -1) {
                    selected = len - 1;
                }
                next = source.objectAt(selected);
                next.set('active', true);
                this.set('selected', selected);
                break;
        }
    },

    actions: {
        pushToList: function () {
            var selected = this.get('selected');
            var source = this.get('filtered');
            var target = source.objectAt(selected);
            this.get('orderList').pushObject(target);

        }
    }
});
