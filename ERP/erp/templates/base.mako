<!DOCTYPE html>
<html lang="${request.locale_name}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <meta name="description" content="凯思电气">
    <meta name="author" content="BINLEI XUE">
    <link rel="shortcut icon" type="image/x-icon" href="${request.static_url('erp:static/keptrans.ico')}">

    <title>KepTrans 凯思电气</title>

    % for url in webassets(request,\
                                  'lib/semantic-ui/css/semantic.css',\
                                  'lib/alertify/alertify.core.css',\
                                  'lib/alertify/alertify.default.css',\
                                  'base.css', output='out.css', filters='yui_css'):
        <link href="${url}" rel="stylesheet">
    % endfor


</head>

<body>

<%include file="components.hbs"/>
<%include file="sidebar.hbs"/>
<%include file="productNew.hbs"/>
<%include file="productMasterList.hbs"/>
##<%include file="productDetail.hbs"/>
##<%include file="productEdit.hbs"/>
##<%include file="orderNew.hbs"/>


    % for url in webassets(request,\
                                  'lib/jquery.js',\
                                  'lib/semantic-ui/javascript/semantic.js',\
                                  'lib/ember/handlebars.js',\
                                  'lib/ember/ember.js',\
                                  'lib/ember/ember-data.js',\
                                  'lib/zeroclipboard/ZeroClipboard.js',\
                                  'lib/alertify/alertify.js',\
                                  'ember/app.js',\
                                  'ember/form-data-promise.js',\
                                  'ember/models/product.js',\
                                  'ember/views/product.js',\
                                  'ember/components/tags-add.js',\
                                  'ember/components/clipboard.js',\
                                  'ember/components/form-field.js',\
                                  'ember/components/image-upload.js',\
                                  'ember/components/images-list.js',\
                                  'ember/components/product-add-modal.js',\
                                  'ember/router.js',\
                                  'ember/controllers/products_controller.js',\
                                  'ember/controllers/product_controller.js',\
                                  output='out.js', filters='yui_js'):
        <script src="${url}" type="text/javascript"></script>
    % endfor
</body>
</html>
