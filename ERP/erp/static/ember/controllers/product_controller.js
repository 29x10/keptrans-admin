Erp.ProductImageUploadController = Ember.ObjectController.extend({

    needs: ['productsNew'],

    barWidth: "width: 0",

    isUploading: false,

    uploadStatus: "上传",

    imageUrl: "",

    uploadFinished: false,

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

            context.set('isUploading', true);
            context.set('uploadStatus', '上传中');
            Erp.FormDataPromise.ajax("http://192.168.1.102:5002/image", "POST", formData, true, hash).then(function (response) {
                context.set('uploadStatus', '上传完成');
                context.set('uploadFinished', true);
                context.set('imageUrl', response.image);
                console.log(response);
            }, function (response) {
                context.set('isUploading', false);
                context.set('uploadStatus', '上传');
                context.set('barWidth', 'width: 0');
                console.log(response);
            });
        },

        setCover: function () {
            var files = this.get('controllers.productsNew.files');
            var coverIsSet = this.get('controllers.productsNew.coverIsSet');
            var coverIndex = this.get('controllers.productsNew.coverIndex');
            var index = this.get('index');
            if (coverIsSet) {
                Ember.set(files.objectAt(coverIndex), "isCover", "");
            }
            Ember.set(files.objectAt(index), "isCover", "封面");
            this.set('controllers.productsNew.coverIndex', index);
            this.set('controllers.productsNew.coverIsSet', true);
            var imageUrl = 'http://keptrans.b0.upaiyun.com' + this.get('imageUrl');
            this.set('controllers.productsNew.cover', imageUrl);
        }
    }
});