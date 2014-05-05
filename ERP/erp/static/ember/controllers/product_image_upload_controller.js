Erp.ProductImageUploadController = Ember.ObjectController.extend({

    barWidth: "width: 0",

    actions: {

        upload: function () {
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
