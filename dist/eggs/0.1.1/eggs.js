/* 
Copyright 2014, QuickJS v1.0 dev 
MIT Licensed
build time: 2014-12-16 16:21:30 
*/
define("gallery/eggs/0.1.1/eggs",["modal/1.0.0/index","gallery/core/0.1.1/core"],function(i,n,t){i.async("./index.css"),i("modal/1.0.0/index")($);var e=i("gallery/core/0.1.1/core"),l=e.msg,a=e.repairUrl,o=$("body"),s=$(".act-pannel"),c={};c.init=function(i){var n=this;n.fn.render(i,function(){}),i.notfrist||(n.fn.tips.init(i),n.fn.page.init())},c.fn={},c.fn.createTrigger=function(i){o.append('<a href="#'+i.targetId+'" id="'+i.triggerId+'" style="display: none;"></a>')},c.fn.render=function(i,n){var t=this,e=$("#"+i.targetId);e.length>0&&e.remove(),s.append(t.getTpl(i.targetId)),t.script(i),n&&n.call()},c.fn.getTpl=function(i){return['<div class="golden_egg" id="'+i+'">','<ul class="golden_ul">','<p class="hammer pic pic_5" id="hammer">锤子</p>','<p class="resultTip" id="resultTip"><b id="result"></b></p>','<li class="golden_1"><span class="pic pic_1"></span></li>','<li class="golden_2 center"><span class="pic pic_1"></span></li>','<li class="golden_3"><span class="pic pic_1"></span></li>',"</ul>","</div>"].join("")},c.fn.script=function(i){function n(n){var e=n;$.post(a+"/bs/prize/check/hitegg",null,function(n){return e.find("span.pic").hasClass("pic_1")?($(".golden_ul li").unbind("click").unbind("mouseover"),$(".golden_egg").css({cursor:"none"}),$(".hammer").show().css({top:e.position().top-85,left:e.position().left+185}),$(".hammer").animate({top:e.position().top-25,left:e.position().left+125},60,function(){var l="pic_3";0==n.state&&(l="pic_2"),e.find("span.pic").attr("class","pic "+l),$(".resultTip").css({display:"block",top:"100px",left:e.position().left+45,opacity:0}).animate({top:"50px",opacity:1},300,function(){i.hitCallback(--i.count),0==n.state?(i.money=n.prize,i.orderId=n.id,t.tips.ok(i)):t.tips.no(i)}),$(".hammer").hide(),$(".golden_egg").css({cursor:"url("+i.staticUrl+"eggs/0.1.0/img/hit.ico),auto"})}),void 0):!1},"json")}var t=this;if(i.login&&i.count>0)$(".golden_egg").css({cursor:"url("+i.staticUrl+"eggs/0.1.0/img/hit.ico),auto"}),$(".golden_ul li").click(function(){n($(this))});else{$(".golden_egg").css({cursor:"pointer"});var e={content:"你没有用来砸蛋的幸运锤	:-(",ok:!1,fixed:!0,clock:!0,cancelValue:"我知道了",button:[{value:"如何获取幸运锤",autofocus:!0,callback:function(){l.Diy({id:"how",fixed:!0,clock:!0,title:"如何参与本活动：",content:"<ul><li><b>通过汽配铺网站平台成功消费，即可参与活动：</b></li><li>1.单笔成功消费200元以上可有机会获得砸金蛋的幸运锤一个。</li><li>2.利用幸运锤在此页面参与砸蛋活动。</li><li>3.一个幸运锤只能参与一次砸蛋活动。</li><li>4.幸运锤的幸运度与单笔成交金额成正比，与砸蛋中奖金额成正比。</li></ul>",ok:!1,cancel:!1,button:[{value:"我已了解如何参与本活动",autofocus:!0}]})}}]};i.login||(e={content:"登录查看可用幸运锤数量",ok:!1,fixed:!0,clock:!0,cancel:!1,button:[{value:"去登录",autofocus:!0,callback:function(){window.location.href=a+"/login.html"}}]}),$(".golden_ul li").click(function(){l.Diy(e)})}$(".golden_ul li").hover(function(){var i=$(this),n=i.position().left+$(this).width()-50,t=i.position().top-50;$("#hammer").css({left:n,top:t})}).on("mouseover",function(){var i=$(this),n=272;i.hasClass("center")&&(n=305),n-=25,i.animate({top:n},100,function(){i.animate({top:n+25},100)})})},c.fn.tips={},c.fn.tips.init=function(i){o.append('<div id="act-tips-pannel" style="display: none;"></div>'),o.append('<a href="#act-tips-pannel" id="act-tips-trigger" style="display: none;"></a>'),$("#act-tips-trigger").qsModal({top:250,lock:!0,closeButton:".layer-link"}),$(".wrapper-modal .layer-link").unbind("click").live("click",function(){i.notfrist=!0,c.init(i)})},c.fn.tips.ok=function(i){var n=this;$("#act-tips-pannel").empty(),$("#act-tips-pannel").append(n.getTpl("ok",i)),$("#act-tips-trigger").trigger("click")},c.fn.tips.no=function(){var i=this;$("#act-tips-pannel").empty(),$("#act-tips-pannel").append(i.getTpl("no")),$("#act-tips-trigger").trigger("click")},c.fn.tips.getTpl=function(i,n){switch(i){case"ok":return['<div id="ks-content-ks-component" class="ks-overlay-content">','	<div class="wrapper-modal">','	<div class="layer-ok layer-ie-ok">','<i class="layer-money" target="_blank">'+n.money+"</i>",'<i class="layer-close"></i>','		<a href="'+a+"/act/"+n.orderId+'/award.html" class="layer-link" target="_blank">填写领奖信息</a>',"	</div>","</div>","</div>"].join("");case"no":return['<div id="ks-content-ks-component" class="ks-overlay-content">','	<div class="wrapper-modal">','	<div class="layer-no layer-ie-no">','		<i class="layer-close"></i>','		<a href="javascript:void(0);" class="layer-link">下次再来</a>',"	</div>","</div>","</div>"].join("")}},c.fn.page={},c.fn.page.init=function(){},t.exports=c});