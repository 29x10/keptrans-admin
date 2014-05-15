Erp.FormFieldComponent = Ember.Component.extend({
    error: false,

    label: "默认标签",

    placeholder: "请输入...",

    regex: "^.+$",

    icon: "reorder",

    value: "",

    errorMessage: "出错了..."
});