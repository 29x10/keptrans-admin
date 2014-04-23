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

    change: function (event) {
        console.log(this.get('element').files);
    }
});

Ember.Handlebars.helper('img-upload', Erp.ImageUploadView);