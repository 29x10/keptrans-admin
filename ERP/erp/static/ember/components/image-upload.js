App.ImageUploadComponent = Ember.Component.extend({

    barWidth: "width: 0;",

    startUpload: false,

    uploadStatus: "上传",

    imageUrl: "",

    imageObject: false,

    urlChanged: function () {
        if (!(this.get('imageUrl'))) {
            this.set('imageObject', false);
        }
    }.observes('imageUrl'),

    imageObjectChanged: function () {
        this.set('barWidth', 'width: 0');
        this.set('uploadStatus', "上传");
        this.set('startUpload', false);
    }.observes('imageObject'),

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
                url: App.API_HOST + '/' + App.API_NAME_SPACE + '/' + 'image',
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

        chooseImage: function () {
            this.$('input').trigger("click");
        }
    }


});
