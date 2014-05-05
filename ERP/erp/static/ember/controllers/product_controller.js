Erp.ProductImageUploadController = Ember.ObjectController.extend({

    barWidth: "width: 0",

    actions: {

        upload: function () {
            var formData = new FormData();
            var context = this;
            formData.append('file', this.get('model'));
            var hash = {
                xhr: function () {
                    var xhr = Ember.$.ajaxSettings.xhr();

                    xhr.upload.onprogress = function (event) {
                        var width = 'width: ' + event.loaded / event.total * 100 + '%';
                        context.set('barWidth', width);
                    };

                    xhr.onload = function (event) {
                        context.set('barWidth', 'width: 100%');
                    };
                    return xhr;
                },
                contentType: false,
                processData: false
            };

            Erp.FormDataPromise.ajax("http://localhost:5002/image", "POST", formData, true, hash).then(function (response) {
                console.log(response);
            }, function (response) {
                console.log(response);
            });
            var xhr = new XMLHttpRequest();
            xhr.open('POST', 'http://localhost:5002/image', true);
            var formData = new FormData();
            formData.append('file', this.get('model'));
            xhr.onload = function (event) {
                this.set('barWidth', 'width: 100%');
            }.bind(this);
            xhr.upload.onprogress = function (event) {
                var width = 'width: ' + event.loaded / event.total * 100 + '%';
                this.set('barWidth', width);
            }.bind(this);
            xhr.send(formData);
        }
    }
});
