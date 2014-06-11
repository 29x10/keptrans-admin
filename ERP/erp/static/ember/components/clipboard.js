App.ZeroClipboardComponent = Ember.Component.extend({
    didInsertElement: function () {
        var client = new ZeroClipboard(this.$(".ui.button"));
    }
});
