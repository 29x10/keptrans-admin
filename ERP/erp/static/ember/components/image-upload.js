Erp.ImageUploadComponent = Ember.Component.extend({

    barWidth: "width: 0;",

    startUpload: false,

    uploadStatus: "上传",

    imageUrl: "",

    imageObject: false,

    actions: {
        uploadImage: function (file) {
            var formData = new FormData();
            var context = this;
            if (context.get('startUpload')) {
                return;
            }
            formData.append('file', file);
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

            context.set('startUpload', true);
            context.set('uploadStatus', '上传中');
            Erp.FormDataPromise.ajax("http://192.168.1.102:5002/image", "POST", formData, true, hash).then(function (response) {
                context.set('uploadStatus', '上传完成');
                context.set('imageUrl', 'http://keptrans.b0.upaiyun.com' + response.image);
                console.log(response);
            }, function (response) {
                context.set('startUpload', false);
                context.set('uploadStatus', '上传');
                context.set('barWidth', 'width: 0');
                console.log(response);
            });
        },

        chooseImage: function () {
            this.$('input').trigger("click");
        }
    }


});
