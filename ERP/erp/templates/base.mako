<!DOCTYPE html>
<html lang="${request.locale_name}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="凯思电气">
    <meta name="author" content="BINLEI XUE">
    <link rel="shortcut icon" type="image/x-icon" href="${request.static_url('erp:static/keptrans.ico')}">

    <title>KepTrans 凯思电气</title>


    <link href="//cdnjscn.b0.upaiyun.com/libs/semantic-ui/0.13.0/css/semantic.min.css" rel="stylesheet">
    <link href="${request.static_url('erp:static/base.css')}" rel="stylesheet">

</head>

<body>

<script type="text/x-handlebars" data-template-name="erp">
    <div class="ui vertical sidebar menu show-sidebar">
        <a class="item close">
            <i class="close icon"></i>关闭
        </a>
        <a class="item" href="#/">
            <i class="home icon"></i> 凯思ERP
        </a>

        <div class="item">
            <div class="ui input"><input placeholder="Search..." type="text"></div>
        </div>
        <div class="item">
            <i class="list icon"></i> 产品管理
            <div class="menu">
                {{#link-to 'products.new' class="item"}}
                    添加产品
                {{/link-to}}
                <a class="item">查看产品</a>
            </div>
        </div>
        <div class="item">
            <i class="list icon"></i> 订单管理
            <div class="menu">
                <a class="item">开单</a>
                <a class="item">查看订单</a>
            </div>
        </div>
        <div class="item">
            <i class="list icon"></i> 库存管理
            <div class="menu">
                <a class="item">产品入库</a>
                <a class="item">查看库存</a>
            </div>
        </div>
    </div>

    <div class="ui menu mobile-nav">
        <a class="item sidebar-toggle">
            <i class="icon list"></i>
        </a>
    </div>

    <div class="blank-sidebar">
        {{outlet}}
    </div>
</script>

<script type="text/x-handlebars" data-template-name="erp/index">
    <p>Home</p>
</script>

<script type="text/x-handlebars" data-template-name="products/new">
    <div class="ui dimmer page">
        <div class="content">
            <div class="center">
                <h2 class="ui inverted icon header">
                    <i class="icon circular inverted emphasized teal checkmark"></i>
                    添加产品成功
                </h2>
            </div>
        </div>
    </div>

    <h2 class="ui header">
        <i class="settings icon"></i>

        <div class="content">
            产品管理
            <div class="sub header">添加产品</div>
        </div>
    </h2>
    <div {{bind-attr class="formError:warning :ui :form :segment"}}>
        {{#if formError}}
            <div class="ui warning message">
                <div class="ui header">出错啦</div>
                <ul class="list">
                    {{#if brandNone}}
                        <li>你忘了填写<b>品牌</b>名称</li>
                    {{/if}}
                    {{#if categoryNone}}
                        <li><b>类别</b>很重要，补上吧</li>
                    {{/if}}
                    {{#if specNone}}
                        <li>每个产品的<b>型号</b>都不一样，不能落下</li>
                    {{/if}}
                    {{#if priceNone}}
                        <li>最最最重要<b>价格</b>不能忘了，而且必须是数字哦</li>
                    {{/if}}
                </ul>
            </div>
        {{/if}}
        <div class="two fields">
            <div
                {{bind-attr class="brandError:error :field"}}>
                <label>品牌</label>

                <div class="ui left labeled icon input">
                    {{form-field type="text" placeholder="品牌名称" value=brand error=brandError}}
                    <i class="bookmark icon"></i>

                </div>
                {{#if brandError}}
                    <div class="ui red pointing above label">别忘了填写品牌名称哦</div>
                {{/if}}

            </div>
            <div
                {{bind-attr class="categoryError:error :field"}}>
                <label>类别</label>

                <div class="ui left labeled icon input">
                    {{form-field type="text" placeholder="所属类别" value=category error=categoryError}}
                    <i class="reorder icon"></i>
                </div>
                {{#if categoryError}}
                    <div class="ui red pointing above label">分类很重要</div>
                {{/if}}
            </div>
        </div>

        <div class="two fields">
            <div
                {{bind-attr class="specError:error :field"}}>
                <label>型号</label>

                <div class="ui left labeled icon input">
                    {{form-field type="text" placeholder="型号" value=spec error=specError}}
                    <i class="tag icon"></i>

                </div>
                {{#if specError}}
                    <div class="ui red pointing above label">型号是区分不同产品的决定性因素</div>
                {{/if}}
            </div>
            <div
                {{bind-attr class="priceError:error :field"}}>
                <label>价格</label>

                <div class="ui left labeled icon input">
                    {{form-field type="text" placeholder="价格" value=price error=priceError regex="^\d+$"}}
                    <i class="yen icon"></i>

                </div>
                {{#if priceError}}
                    <div class="ui red pointing above label">忘了什么也不能忘了价格，单位是分</div>
                {{/if}}
            </div>
        </div>


        <div class="field">
            <label>产品手册</label>
            <textarea></textarea>
        </div>
        <div class="ui blue button"
            {{action 'addProduct'}}>
            <i class="icon location"></i>添加
        </div>
    {{img-upload type="file" multiple="true" id="upload" class="hidden"}}
        <div class="ui green button" {{action 'uploadImage'}}>
            <i class="icon photo"></i>上传
        </div>
    <div class="ui list">
        <div class="item">
            <img class="ui image small" src="http://s1.dwstatic.com/group1/M00/2A/67/148ee8b96fa6fbb1b0e9a7de8dd05ae6.jpg">
            <div class="ui tiny button red floated right"><i class="icon checkmark"></i>设为封面</div>
            <div class="ui tiny button teal floated right"><i class="icon url"></i>复制图片地址</div>
            <div class="content">
                <div class="header">123.jpg</div>
                <div class="description">封面</div>
            </div>
        </div>
        <div class="item">
            <img class="ui image small" src="http://s1.dwstatic.com/group1/M00/2A/67/148ee8b96fa6fbb1b0e9a7de8dd05ae6.jpg">
            <div class="ui tiny button red floated right"><i class="icon checkmark"></i>设为封面</div>
            <div class="ui tiny button teal floated right"><i class="icon url"></i>复制图片地址</div>
            <div class="content">
                <div class="header">123.jpg</div>
                <div class="description">封面</div>
            </div>
        </div>
        <div class="item">
            <img class="ui image small" src="http://s1.dwstatic.com/group1/M00/2A/67/148ee8b96fa6fbb1b0e9a7de8dd05ae6.jpg">
            <div class="ui tiny button red floated right"><i class="icon checkmark"></i>设为封面</div>
            <div class="ui tiny button teal floated right"><i class="icon url"></i>复制图片地址</div>
            <div class="content">
                <div class="header">123.jpg</div>
                <div class="description">封面</div>
            </div>
        </div>
    </div>
    </div>


</script>


<script src="//cdnjscn.b0.upaiyun.com/libs/jquery/2.1.0/jquery.min.js" type="text/javascript"></script>
<script src="//cdnjscn.b0.upaiyun.com/libs/semantic-ui/0.13.0/javascript/semantic.min.js" type="text/javascript"></script>
<script src="//cdnjscn.b0.upaiyun.com/libs/handlebars.js/1.3.0/handlebars.min.js" type="text/javascript"></script>
<script src="//cdnjscn.b0.upaiyun.com/libs/ember.js/1.5.0/ember.min.js" type="text/javascript"></script>
<script src="//cdnjscn.b0.upaiyun.com/libs/ember-data.js/1.0.0-beta.7/ember-data.min.js" type="text/javascript"></script>
<script src="${request.static_url('erp:static/ember/app.js')}" type="text/javascript"></script>
<script src="${request.static_url('erp:static/ember/models/product.js')}" type="text/javascript"></script>
<script src="${request.static_url('erp:static/ember/views/productAdd.js')}" type="text/javascript"></script>
<script src="${request.static_url('erp:static/ember/router.js')}" type="text/javascript"></script>
<script src="${request.static_url('erp:static/ember/controllers/products_controller.js')}"
        type="text/javascript"></script>
</body>
</html>
