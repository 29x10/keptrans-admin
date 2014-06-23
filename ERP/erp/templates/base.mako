<!DOCTYPE html>
<html lang="${request.locale_name}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <meta name="description" content="凯思电气">
    <meta name="author" content="BINLEI XUE">
    <link rel="shortcut icon" type="image/x-icon" href="/static/keptrans.ico">

    <title>KepTrans 凯思电气</title>
    <link rel="stylesheet" href="//cdnjscn.b0.upaiyun.com/libs/semantic-ui/0.16.1/css/semantic.min.css" type="text/css"/>

    % for url in webassets(request,\
                                  'lib/alertify/alertify.core.css',\
                                  'lib/alertify/alertify.default.css',\
                                  'base.css', output='out.css', filters='yui_css', debug=False):
        <link href="${url}" rel="stylesheet">
    % endfor


</head>

<body>

<%include file="components.hbs"/>
<%include file="login.hbs" />
<%include file="sidebar.hbs"/>
<%include file="productNew.hbs"/>
<%include file="productMasterList.hbs"/>
<%include file="productDetail.hbs"/>
<%include file="productEdit.hbs"/>
<%include file="orderNew.hbs"/>
<%include file="clientNew.hbs"/>
<%include file="clientList.hbs"/>
<%include file="orderMasterList.hbs"/>
<%include file="orderDetail.hbs"/>

<script src="//cdnjscn.b0.upaiyun.com/libs/jquery/2.1.1/jquery.min.js" type="text/javascript"></script>
<script src="//cdnjscn.b0.upaiyun.com/libs/semantic-ui/0.16.1/javascript/semantic.min.js" type="text/javascript"></script>
<script src="//cdnjscn.b0.upaiyun.com/libs/handlebars.js/1.3.0/handlebars.min.js" type="text/javascript"></script>
<script src="//cdnjscn.b0.upaiyun.com/libs/ember.js/1.5.1/ember.min.js" type="text/javascript"></script>
<script src="//cdnjscn.b0.upaiyun.com/libs/ember-data.js/1.0.0-beta.7/ember-data.min.js" type="text/javascript"></script>
<script src="//cdnjscn.b0.upaiyun.com/libs/zeroclipboard/2.1.1/ZeroClipboard.min.js" type="text/javascript"></script>

    % for url in webassets(request,\
                                  'lib/ember/ember-simple-auth.js',\
                                  'lib/alertify/alertify.js',\
                                  'lib/moment.js',\
                                  'ember/app.js',\
                                  'ember/models/product.js',\
                                  'ember/models/order.js',\
                                  'ember/models/client.js',\
                                  'ember/views/product.js',\
                                  'ember/components/tags-add.js',\
                                  'ember/components/clipboard.js',\
                                  'ember/components/form-field.js',\
                                  'ember/components/image-upload.js',\
                                  'ember/components/images-list.js',\
                                  'ember/components/product-add-modal.js',\
                                  'ember/components/product-unit-dropdown.js',\
                                  'ember/components/product-search.js',\
                                  'ember/components/contract-info-add-modal.js',\
                                  'ember/components/client-search.js',\
                                  'ember/router.js',\
                                  'ember/controllers/clients_new.js',\
                                  'ember/controllers/account.js',\
                                  'ember/controllers/products_new.js',\
                                  'ember/controllers/products_list.js',\
                                  'ember/controllers/product_detail.js',\
                                  'ember/controllers/product_edit.js',\
                                  'ember/controllers/orders_new.js',\
                                  'ember/controllers/orders_list.js',\
                                  'ember/controllers/order_detail.js',\
                                  output='out.js', filters='yui_js', debug=False):
        <script src="${url}" type="text/javascript"></script>
    % endfor
</body>
</html>
