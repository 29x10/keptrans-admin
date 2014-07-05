App.ClientSearchComponent = Ember.Component.extend({
    search: "",

    clients: Ember.A(),

    selected: 0,

    filtered: Ember.A(),

    searchChanged: function () {
        var search = this.get('search');
        if (!search) {
            this.set('filtered', Ember.A());
            return;
        }
        var result =  this.get('clients').filter(function (item) {

            return item.get('mobile').toLowerCase().indexOf(search.toLowerCase()) > -1;
        }).slice(0, 10);
        result.forEach(function (item) {
            item.set('active', false);
        });
        if (result.get('length'))  {
            result.objectAt(0).set('active', true);
        }
        this.set('selected', 0);
        this.set('filtered', result);
    }.observes('clients.@each.mobile', 'search'),

    keyUp: function (event) {
        var source = this.get('filtered');
        var len = source.get('length');
        var selected = this.get('selected');
        var pre, next;
        if (!len) {
            return;
        }
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
            this.sendAction('setClient', target);
            this.set('search', '');
        },

        pushSelected: function (target) {
            this.sendAction('setClient', target);
            this.set('search', '');
        }
    }
});
