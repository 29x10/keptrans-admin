Erp.FromFieldView = Ember.TextField.extend({

    attributeBindings: ['type', 'value', 'size', 'pattern', 'name', 'min', 'max',
                      'accept', 'autocomplete', 'autosave', 'formaction',
                      'formenctype', 'formmethod', 'formnovalidate', 'formtarget',
                      'height', 'inputmode', 'list', 'multiple', 'pattern', 'step',
                      'width', 'error', 'regex'],
    name: 'default',

    error: '',

    regex: '^.+$',

    hasError: false,

    valueChanged: function () {
        re = new RegExp(this.get('regex'), 'g');
        this.set('hasError', !re.test(this.get('value')));
    }.observes('value'),

    focusIn: function (event) {
        this._super(event);
        this.valueChanged();
        this.set('error', this.get('hasError'));
    },

    focusOut: function (event) {
        this._super(event);
        this.set('error', false);
    }
});

Ember.Handlebars.helper('form-field', Erp.FromFieldView);

Erp.ImageUploadView = Ember.TextField.extend({
    
    attributeBindings: ['type', 'value', 'size', 'pattern', 'name', 'min', 'max',
                      'accept', 'autocomplete', 'autosave', 'formaction',
                      'formenctype', 'formmethod', 'formnovalidate', 'formtarget',
                      'height', 'inputmode', 'list', 'multiple', 'pattern', 'step',
                      'width', 'file'],

    change: function (event) {
        
        var file = this.get('element').files[0];
        this.set('file', file);
    },
    
    file: ""
});

Ember.Handlebars.helper('img-upload', Erp.ImageUploadView);


Erp.MultiImageUploadView = Ember.TextField.extend({

    attributeBindings: ['type', 'value', 'size', 'pattern', 'name', 'min', 'max',
                      'accept', 'autocomplete', 'autosave', 'formaction',
                      'formenctype', 'formmethod', 'formnovalidate', 'formtarget',
                      'height', 'inputmode', 'list', 'multiple', 'pattern', 'step',
                      'width', 'files'],

    change: function (event) {

        var files = this.get('files');
        var targetFiles = this.get('element').files;

        for (var i=0; i<targetFiles.length; i++) {
            targetFiles[i].file_name = targetFiles[i].name;
            targetFiles[i].isCover = "";
            files.pushObject(this.get('element').files[i]);
        }
        this.set('files', files);
    },

    files: Ember.A()
});

Ember.Handlebars.helper('multi-img-upload', Erp.MultiImageUploadView);

Erp.ImagePreviewView = Ember.View.extend({
    tagName: 'img',
    attributeBindings: ['src', 'file'],
    
    classNames: ['ui', 'image', 'avatar'],
    
    src: '',
    
    file: '',
    
    willInsertElement: function () {
        var reader = new FileReader();
        reader.onload = function (event) {
            this.set('src', event.target.result);
            
        }.bind(this);
        reader.readAsDataURL(this.get('file'));
    },

    fileChanged: function () {
        this.get('controller').set('barWidth', 'width: 0');
        this.get('controller').set('uploadStatus', "上传");
        this.get('controller').set('startUpload', false);
        var reader = new FileReader();
        reader.onload = function (event) {
            this.set('src', event.target.result);

        }.bind(this);
        reader.readAsDataURL(this.get('file'));
    }.observes('file')
});

Ember.Handlebars.helper('img-preview', Erp.ImagePreviewView);


Erp.ItemView = Ember.View.extend({
    didInsertElement: function() {
        this.get('controller').set('index',this.get('contentIndex'));
    }
});


Ember.Handlebars.helper('price', function(value, options) {
    value = "" + value;
    return value.slice(0, -2) + '.' + value.slice(-2);
});


Erp.ImageUploadComponent = Ember.Component.extend({

    barWidth: "width: 0",

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