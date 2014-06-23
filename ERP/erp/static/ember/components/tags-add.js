App.TagsAddComponent = Ember.Component.extend({
    tagName: '',

    tags: Ember.A(),

    tagNames: function () {
        return this.get('tags').map(function (item) {
            return item.get('name');
        });
    }.property('tags.@each.name'),

    actions: {
        addTag: function () {
            var tagValue = this.get('tagValue');
            if (!tagValue) {
                alertify.log("标签不能为空", "", 2000);
            } else if (this.get('tagNames').indexOf(tagValue) > -1) {
                alertify.log("请不要重复输入", "", 2000);
            } else {
                alertify.success("成功添加标签" + tagValue, "", 2000);
                this.sendAction('addTag', {name: tagValue});
                this.set('tagValue', '');
            }
        },

        removeTag: function (tag) {
            this.sendAction('removeTag', tag);
        }
    }
});
