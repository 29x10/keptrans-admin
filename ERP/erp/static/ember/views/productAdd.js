Erp.FromFieldView = Ember.TextField.extend({

    attributeBindings: ['type', 'value', 'size', 'pattern', 'name', 'min', 'max',
                      'accept', 'autocomplete', 'autosave', 'formaction',
                      'formenctype', 'formmethod', 'formnovalidate', 'formtarget',
                      'height', 'inputmode', 'list', 'multiple', 'pattern', 'step',
                      'width', 'error', 'regex'],
    name: 'default',

    error: '',

    regex: '^.+$',

    valueChanged: function () {
        re = new RegExp(this.get('regex'), 'g');
        this.set('error', !re.test(this.get('value')));
    }.observes('value'),

    focusIn: function (event) {
        this._super(event);
        if (this.get('value') == undefined) {
            this.set('error', true);
        } else {
            this.valueChanged();
        }
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
   
        if (files == undefined) {
            files = Ember.A();
        }
        for (var i=0; i<this.get('element').files.length; i++) {
            files.pushObject(this.get('element').files[i]);
        }
        this.set('files', files);
    },
    
    files: []
    
    
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
    },
})

Ember.Handlebars.helper('img-preview', Erp.ImagePreviewView);