App.ImagesListComponent = Ember.Component.extend({
    barWidth: "width: 0;",

    uploadStatus: "上传",

    startUpload: false,

    imageUrl: "",

    imageObject: "",

    isSet: false,

    actions: {
        upload: function (file) {
            var formData = new FormData();
            var context = this;
            if (context.get('startUpload')) {
                return;
            }
            formData.append('file', file);

            context.set('startUpload', true);
            context.set('uploadStatus', '上传中');

            Ember.$.ajax({
                url: App.API_HOST + '/' + App.API_NAME_SPACE + 'image',
                type: 'POST',
                crossDomain: true,
                data: formData,
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
            }).then(function (response) {
                context.set('uploadStatus', '上传完成');
                context.set('imageUrl', response.image);
            }, function (response) {
                context.set('startUpload', false);
                context.set('uploadStatus', '上传');
                context.set('barWidth', 'width: 0');
            }, "upload image");
        },

        addToProduct: function () {
            var image = this.get('targetObject.store').createRecord('productImage', {
                url: this.get('imageUrl')
            });
            this.set('imageObject', image);
            this.sendAction('addProductImage', image);
            this.set('isSet', true);
        },

        removeFromProduct: function () {
            var image = this.get('imageObject');
            this.sendAction('removeProductImage', image);
            this.set('isSet', false);
        }
    }
});