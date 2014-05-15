Erp.FormDataPromise = {
    ajax: function (url, type, data, crossDomain, hash) {

        var adapter = this;

        return new Ember.RSVP.Promise(function (resolve, reject) {
            hash = adapter.ajaxOptions(url, type, data, crossDomain, hash);

            hash.success = function (response) {
                Ember.run(null, resolve, response);
            };

            hash.error = function(jqXHR) {
                Ember.run(null, reject, adapter.ajaxError(jqXHR));
            };
            Ember.$.ajax(hash);
        });
    },

    ajaxError: function (jqXHR) {
        if (jqXHR) {
            jqXHR.then = null;
        }
        return jqXHR;
    },

    ajaxOptions: function (url, type, data, crossDomain, hash) {
        hash = hash || {};
        hash.url = url;
        hash.type = type;
        hash.crossDomain = crossDomain;
        hash.data = data;
        return hash;
    }
};
