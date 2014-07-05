<!DOCTYPE html>
<html lang="${request.locale_name}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <meta name="description" content="凯思电气">
    <meta name="author" content="BINLEI XUE">
    <link rel="shortcut icon" type="image/x-icon" href="${request.static_path('erp:static/keptrans.ico')}">

    <title>KepTrans 凯思电气</title>

    <link rel="stylesheet" href="${request.static_path('erp:static/bower/bower_components/semantic-ui/build/packaged/css/semantic.min.css')}" type="text/css"/>

    % for url in webassets(request,\
                                  'bower/bower_components/fancybox/source/jquery.fancybox.css',\
                                  'bower/bower_components/alertify/themes/alertify.core.css',\
                                  'bower/bower_components/alertify/themes/alertify.default.css',\
                                  'base.css', output='base.min.css', filters='yui_css'):
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


    % for url in webassets(request,\
                                  'bower/bower_components/jquery/dist/jquery.js',\
                                  'bower/bower_components/semantic-ui/build/packaged/javascript/semantic.js',\
                                  'bower/bower_components/handlebars/handlebars.js',\
                                  'bower/bower_components/zeroclipboard/dist/ZeroClipboard.js',\
                                  'bower/bower_components/fancybox/source/jquery.fancybox.js',\
                                  'bower/bower_components/moment/moment.js',\
                                  'bower/bower_components/moment/lang/zh-cn.js',\
                                  'bower/bower_components/alertify/alertify.js',\
                                  'bower/bower_components/Snap.svg/dist/snap.svg.js',\
                                  'bower/bower_components/classie/classie.js',\
                                  'loader/svgLoader.js',\
                                  output='test.min.js', filters='yui_js'):
        <script src="${url}" type="text/javascript" charset="UTF-8"></script>
    % endfor

<script src="${request.static_path('erp:static/bower/bower_components/ember/ember.min.js')}" type="text/javascript"></script>
<script src="${request.static_path('erp:static/bower/bower_components/ember-data/ember-data.min.js')}" type="text/javascript"></script>
<script src="${request.static_path('erp:static/bower/bower_components/ember-simple-auth/simple-auth.js')}" type="text/javascript"></script>

    % for url in webassets(request,\
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
                                  'ember/controllers/loading.js',\
                                  'ember/controllers/clients_new.js',\
                                  'ember/controllers/account.js',\
                                  'ember/controllers/products_new.js',\
                                  'ember/controllers/products_list.js',\
                                  'ember/controllers/product_detail.js',\
                                  'ember/controllers/product_edit.js',\
                                  'ember/controllers/orders_new.js',\
                                  'ember/controllers/orders_list.js',\
                                  'ember/controllers/order_detail.js',\
                                  output='base.min.js', filters='yui_js'):
        <script src="${url}" type="text/javascript" charset="UTF-8"></script>
    % endfor
</body>
</html>
