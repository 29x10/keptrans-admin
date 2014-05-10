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

<script type="text/x-handlebars" data-template-name="erp">
    <div class="ui vertical sidebar menu show-sidebar">
        <a class="item close mobile-only" {{action 'hideSideBar'}}>
            <i class="close icon"></i>关闭
        </a>
        {{#link-to 'erp' class="item" activeClass="keptrans" closeSideBar="true"}}
            <i class="home icon"></i> 凯思ERP
        {{/link-to}}

        <div class="item">
            <div class="ui input"><input placeholder="Search..." type="text"></div>
        </div>
        <div class="item">
            <i class="list icon"></i> 产品管理
            <div class="menu">
                {{#link-to 'products.new' class="item" closeSideBar="true"}}
                    添加产品
                {{/link-to}}
                {{#link-to 'products.view' class="item" closeSideBar="true"}}
                    查看产品
                {{/link-to}}
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
        <a class="item" {{action 'showSideBar'}}>
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
    <div {{bind-attr class="formError:warning isLoading:loading :ui :form :segment"}}>
        {{#if formError}}
            <div class="ui warning message">
                <div class="ui header">出错啦</div>
                <ul class="list">
                    {{#each error in productError}}
                        <li>{{error}}</li>
                    {{/each}}
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
            {{textarea value=desc}}
        </div>
        <div class="ui blue button"
            {{action 'addProduct'}}>
            <i class="icon location"></i>添加
        </div>
        {{img-upload type="file" multiple="true" id="upload" class="hidden" files=files}}
        <div class="ui green button" {{action 'uploadImage'}}>
            <i class="icon photo"></i>上传
        </div>
        <div class="ui list">
            {{#each files itemController="productImageUpload" itemViewClass="Erp.ItemView"}}
                <div class="ui top attached successful progress">
                    <div class="bar" {{bind-attr style="barWidth"}}></div>
                </div>
                <div class="item ui attached">
                    {{img-preview file=model}}
                    <div {{bind-attr class=":ui :tiny :button :red :floated :right isUploading:disabled"}}
                        {{action 'upload'}}><i class="icon heart"></i>{{uploadStatus}}</div>
                    <div {{bind-attr class=":ui :tiny :button :green :floated :right uploadFinished::disabled"}}
                        {{action 'setCover'}}><i class="icon checkmark"></i>设为封面
                    </div>
                    <div class="content">
                        <div class="header">{{file_name}}</div>
                        <div class="description">{{isCover}}</div>
                    </div>
                </div>
            {{/each}}
        </div>
    </div>


</script>

<script type="text/x-handlebars" data-template-name="products/view">
    <div class="ui three items stackable">
        {{#each product in model}}
            <div class="item">
                <div class="image">
                    <img {{bind-attr src=product.cover}}>
                    <a class="star ui corner label">
                        <i class="star icon"></i>
                    </a>
                </div>
                <div class="content">
                    {{#link-to 'product' product class="ui button small green floated right"}}
                        点击查看
                    {{/link-to}}
                    <div class="name">{{product.brand}}</div>
                    <p class="description">{{product.spec}}</p>
                </div>
            </div>
        {{/each}}
    </div>
</script>

<script type="text/x-handlebars" data-template-name="product">
    <div class="ui segment">
        <div class="ui grid stackable">
            <div class="five column wide">
                <div class="ui segment raised">
                    <img class="ui medium image attached" {{bind-attr src=cover}}>
                </div>
            </div>
            <div class="eleven column wide">
                <div class="ui header huge blue">
                    {{brand}}
                    <div class="ui label black">{{category}}</div>
                    <div class="sub header">价格: &yen {{price}}</div>
                </div>
                <div class="ui divider"></div>
                <div class="ui small images">
                    <img class="ui image" {{bind-attr src=cover}}>
                    <img class="ui image" {{bind-attr src=cover}}>
                    <img class="ui image" {{bind-attr src=cover}}>
                    <img class="ui image" {{bind-attr src=cover}}>
                </div>
                <div class="ui button basic red">DHC1J-A1PR</div>
                <div class="ui button basic red">DHC1J-A1R</div>
            </div>
        </div>
    </div>
    <div class="ui segment">
        asdfasdfasdf
    </div>
</script>


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
