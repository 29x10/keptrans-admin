<!DOCTYPE html>
<html lang="${request.locale_name}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <meta name="description" content="凯思电气">
    <meta name="author" content="BINLEI XUE">
    <link rel="shortcut icon" type="image/x-icon" href="${request.static_url('erp:static/keptrans.ico')}">

    <title>KepTrans 凯思电气</title>
    <link href="//cdnjscn.b0.upaiyun.com/libs/semantic-ui/0.16.1/css/semantic.min.css" rel="stylesheet">

    % for url in webassets(request, 'base.css', output='out.css', filters='yui_css'):
        <link href="${url}" rel="stylesheet">
    % endfor


</head>

<body>

<%include file="components.hbs"/>
<%include file="sidebar.hbs"/>
<%include file="productNew.hbs"/>
<%include file="productView.hbs"/>
<%include file="productDetail.hbs"/>
<%include file="productEdit.hbs"/>


<script src="//cdnjscn.b0.upaiyun.com/libs/jquery/1.11.1/jquery.min.js" type="text/javascript"></script>
<script src="//cdnjscn.b0.upaiyun.com/libs/semantic-ui/0.16.1/javascript/semantic.min.js" type="text/javascript"></script>
<script src="//cdnjscn.b0.upaiyun.com/libs/handlebars.js/1.3.0/handlebars.min.js" type="text/javascript"></script>
<script src="//cdnjscn.b0.upaiyun.com/libs/ember.js/1.5.1/ember.prod.js" type="text/javascript"></script>
<script src="//cdnjscn.b0.upaiyun.com/libs/ember-data.js/1.0.0-beta.7/ember-data.min.js" type="text/javascript"></script>

    % for url in webassets(request, 'ember/app.js', 'ember/formDataPromise.js',\
                                  'ember/models/product.js', 'ember/views/productAdd.js', 'ember/router.js',\
                                  'ember/controllers/products_controller.js', 'ember/controllers/product_controller.js',\
                                  output='out.js', filters='yui_js'):
        <script src="${url}" type="text/javascript"></script>
    % endfor
</body>
</html>
