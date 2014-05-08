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

Ember.Handlebars.helper('img-upload', Erp.ImageUploadView);

Erp.ImagePreviewView = Ember.View.extend({
    tagName: 'img',
    attributeBindings: ['src', 'file'],
    
    classNames: ['ui', 'image', 'small'],
    
    src: '',
    
    file: '',
    
    willInsertElement: function () {
        var reader = new FileReader();
        reader.onload = function (event) {
            this.set('src', event.target.result);
            
        }.bind(this);
        reader.readAsDataURL(this.get('file'));
    }
});

Ember.Handlebars.helper('img-preview', Erp.ImagePreviewView);


Erp.ItemView = Ember.View.extend({
    didInsertElement: function() {
        this.get('controller').set('index',this.get('contentIndex'));
    }
});