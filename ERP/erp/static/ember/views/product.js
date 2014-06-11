App.FormInputView = Ember.TextField.extend({

    attributeBindings: ['type', 'value', 'size', 'pattern', 'name', 'min', 'max',
                      'accept', 'autocomplete', 'autosave', 'formaction',
                      'formenctype', 'formmethod', 'formnovalidate', 'formtarget',
                      'height', 'inputmode', 'list', 'multiple', 'pattern', 'step',
                      'width', 'displayError', 'error'],
    name: 'default',

    error: '',

    regex: '^.+$',

    hasError: function () {
        var re = new RegExp(this.get('regex'), 'g');
        return !re.test(this.get('value'));
    }.property('value'),

    getFocus: false,

    valueChanged: function () {
        this.set('error', this.get('hasError'));
        this.set('displayError', this.get('hasError') && this.get('getFocus'));
    }.observes('hasError', 'getFocus'),

    focusIn: function (event) {
        this._super(event);
        this.set('getFocus', true);
    },

    focusOut: function (event) {
        this._super(event);
        this.set('getFocus', false);
    }
});

Ember.Handlebars.helper('form-input', App.FormInputView);

App.ImageUploadView = Ember.TextField.extend({

    type: "file",

    classNames: ['hidden'],
    
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

Ember.Handlebars.helper('img-upload', App.ImageUploadView);


App.MultiImageUploadView = Ember.TextField.extend({

    type: "file",

    classNames: ['hidden'],

    multiple: "multiple",

    attributeBindings: ['type', 'value', 'size', 'pattern', 'name', 'min', 'max',
                      'accept', 'autocomplete', 'autosave', 'formaction',
                      'formenctype', 'formmethod', 'formnovalidate', 'formtarget',
                      'height', 'inputmode', 'list', 'multiple', 'pattern', 'step',
                      'width', 'files'],

    change: function (event) {

        var files = this.get('files');
        var targetFiles = this.get('element').files;

        for (var i=0; i<targetFiles.length; i++) {
            files.pushObject(this.get('element').files[i]);
        }
    },

    files: Ember.A()
});

Ember.Handlebars.helper('multi-img-upload', App.MultiImageUploadView);

App.ImagePreviewView = Ember.View.extend({
    tagName: 'img',
    attributeBindings: ['src', 'file'],
    
    classNames: ['ui', 'image'],
    
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
        if (!this.get('file')) {
            return;
        }
        var reader = new FileReader();
        reader.onload = function (event) {
            this.set('src', event.target.result);

        }.bind(this);
        reader.readAsDataURL(this.get('file'));
    }.observes('file')
});

Ember.Handlebars.helper('img-preview', App.ImagePreviewView);


App.ItemView = Ember.View.extend({
    didInsertElement: function() {
        this.get('controller').set('index',this.get('contentIndex'));
    }
});