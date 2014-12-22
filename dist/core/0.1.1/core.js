/* 
Copyright 2014, QuickJS v1.0dev 
MIT Licensed
build time: 2014-12-22 18:12:43 
*/
define("gallery/core/0.1.1/core",["json2map/1.0.0/index","template/1.0.0/index","gallery/dialog/0.1.0/dialog","status/1.0.1/index","jsons/1.0.0/index"],function(n,t,e){var o=n("json2map/1.0.0/index"),i=n("template/1.0.0/index"),r=n("gallery/dialog/0.1.0/dialog"),c=n("status/1.0.1/index")(r),a=n("jsons/1.0.0/index")($),s={_getPath:function(n){var t=window.document.location.href,e=window.document.location.pathname,o=t.indexOf(e),i=t.substring(0,o),r=e.substring(0,e.substr(1).indexOf("/")+1);return n?i:i+r}},l=s._getPath(!1),u=s._getPath(!0),d=l+"/assets",f=d+"/js",m=u+"/carvin",h={baseUrl:l,rootUrl:u,assetUrl:d,jsUrl:f,mallUrl:m,repairUrl:u,headUrl:m+"/global/header.html",appUrl:m,domUrl:m+"/index.html",obj:{json:a,status:c,json2map:o,template:i,dialog:r},tpl:{id2id:function(n,t,e,o){var r=i(t,e);$(n).html(r),void 0!=o&&o(r)},id2html:function(n,t,e){var o=i(n,t);void 0!=e&&e(o)}},utils:{isEmpty:function(n){return!Boolean($.trim(n)||0===n)||"null"==n||"undefined"==n},toInt:function(n,t){return parseInt(n,t||10)},omit:function(n,t){return n&&"object"==typeof n&&t&&"object"==typeof t&&$.each(t,function(t,e){n[e]&&delete n[e]}),n},json2map:function(n,t){return o.rst2map(n,t)},obj2row:function(n){var t=[],e=[];$.each(n,function(n,o){t.push(n),e.push(o)});var n={};return n.head=t,n.data=e,a.toJsonString(n)},obj2rows:function(n){var t={};return t.head=n.head,t.data=n.data,a.toJsonString(t)},mapQuery:function(n,t){var e,o,i,n=n&&n.split("#")[0]||window.location.search,r=n.indexOf("?"),c=n.substring(r+1).split("&"),a={};if(-1===r)return a;for(e=0;c.length>e;e++)try{r=c[e].indexOf("="),o=c[e].substring(0,r),i=c[e].substring(r+1);var s=i;if(t||(s=unescape(i)),!(a[o]=s))throw Error("uri has wrong query string when run mapQuery.")}catch(l){}return a},toQueryPair:function(n,t){return encodeURIComponent(n+"")+"="+encodeURIComponent(t+"")},toQueryString:function(n){var t=this,e=[];for(var o in n)e.push(t.toQueryPair(o,n[o]));return e.join("&")}},http:{getJson:function(t,e,o,i,r,a){var s={async:!0,dataType:"json",timeout:3e4,type:"GET"};s=$.extend(!0,{success:function(t){c.check(t,function(){if(h.utils.isEmpty(a)&&a)try{t=Crypto.getRst(t),o(t)}catch(n){}else h.utils.isEmpty(t)||o(t)},function(){h.utils.isEmpty(i)?h.utils.isEmpty(t.msg)?alert("噢~ 服务器不小心睡着了。。。"):alert(t.msg):i(t)},function(){n.async("verify",function(n){n.check(h.mallUrl+"/bs/verifycode/find/img?t="+Math.random(),function(t){h.http.getJson(h.mallUrl+"/bs/verifycode/find/verify",{data:"code="+t},function(t){n.okCallback(t,s)},function(){n.inputErrorCallback()})})})})},error:function(){}},s,e),r&&(s.beforeSend=function(){Progress.showDialog()},s.complete=function(){Progress.hideDialog()}),s.url=t,$.ajax(s)}},cookie:{del:function(n){document.cookie=n+"=;expires="+new Date(0).toGMTString()},set:function(n,t,e){var o=n+"="+escape(t);if(e>0){var i=new Date,r=1e3*3600*e;i.setTime(i.getTime()+r),o+="; expires="+i.toGMTString()}else{var c=30,a=new Date;a.setTime(a.getTime()+1e3*60*60*24*c),o+=";expires="+a.toGMTString()}document.cookie=o},get:function(n){var t=document.cookie.match(RegExp("(^| )"+n+"=([^;]*)(;|$)"));return null!=t?unescape(t[2]):null}},msg:{Ss:function(n,t,e){var o=r({id:"dlg-ss",title:"温馨提示",content:n,ok:function(){t?t():this.close().remove()},cancel:!1,onclose:function(){e&&e()}});o.showModal()},Es:function(n,t,e){var o=r({id:"dlg-es",title:"温馨提示",content:n,ok:function(){t?t():this.close().remove()},cancel:!1,onclose:function(){e&&e()}});o.showModal()},Tip:function(n,t,e){var o=r({id:"dlg-tip",title:"温馨提示",content:n,ok:function(){t?t():this.close().remove()},cancel:!1,onclose:function(){e&&e()}});o.showModal()},show:function(n,t,e){var o=r({id:"dlg-show",width:e||250,content:n});o.showModal(),t&&setTimeout(function(){o.close().remove()},t)},Confirm:function(n,t,e,o){var i=r({id:"dlg-confirm",title:"请确认",content:n,ok:t,cancelValue:"取消",cancel:function(){e&&e()},onclose:function(){o&&o()}});i.showModal()},Diy:function(n){var t={id:"dlg-diy",title:"温馨提示",content:"",ok:function(){},cancel:function(){},onclose:function(){},clock:!1};t=$.extend(!0,{},t,n),t.clock?r(t).showModal():r(t).show()}}};e.exports=h});