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
    <link href="${request.static_url('erp:static/base.css')}" rel="stylesheet">


</head>

<body>

<%include file="components.hbs"/>
<%include file="sidebar.hbs"/>
<%include file="productNew.hbs"/>
<%include file="productView.hbs"/>
<%include file="productDetail.hbs"/>


<script src="//cdnjscn.b0.upaiyun.com/libs/jquery/1.11.1/jquery.min.js" type="text/javascript"></script>
<script src="//cdnjscn.b0.upaiyun.com/libs/semantic-ui/0.16.1/javascript/semantic.min.js" type="text/javascript"></script>
<script src="//cdnjscn.b0.upaiyun.com/libs/handlebars.js/1.3.0/handlebars.min.js" type="text/javascript"></script>
<script src="//cdnjscn.b0.upaiyun.com/libs/ember.js/1.5.1/ember.prod.js" type="text/javascript"></script>
<script src="//cdnjscn.b0.upaiyun.com/libs/ember-data.js/1.0.0-beta.7/ember-data.min.js" type="text/javascript"></script>
<script src="${request.static_url('erp:static/ember/app.js')}" type="text/javascript"></script>
<script src="${request.static_url('erp:static/ember/formDataPromise.js')}" type="text/javascript"></script>
<script src="${request.static_url('erp:static/ember/models/product.js')}" type="text/javascript"></script>
<script src="${request.static_url('erp:static/ember/views/productAdd.js')}" type="text/javascript"></script>
<script src="${request.static_url('erp:static/ember/router.js')}" type="text/javascript"></script>
<script src="${request.static_url('erp:static/ember/controllers/products_controller.js')}"
        type="text/javascript"></script>
<script src="${request.static_url('erp:static/ember/controllers/product_controller.js')}"
        type="text/javascript"></script>
</body>
</html>
