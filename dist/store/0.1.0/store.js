/* 
Copyright 2014, QuickJS v1.0dev 
MIT Licensed
build time: 2014-12-22 18:13:33 
*/
define("gallery/store/0.1.0/store",[],function(){function n(){var n,r=[],s=!0;for(var c in l)l.hasOwnProperty(c)&&(s=!1,n=l[c]||"",r.push(u(c)+a+u(n)));t.name=s?e:o+u(e)+i+r.join(f)}var e,t=window,o="qsStorage:",r=/^([^=]+)(?:=(.*))?$/,i="?",a="=",f="&",u=encodeURIComponent,s=decodeURIComponent,l={},c={};(function(n){if(n&&0===n.indexOf(o)){var t=n.split(/[:?]/);t.shift(),e=s(t.shift())||"";for(var i,a,u,c=t.join(""),m=c.split(f),d=0,p=m.length;p>d;d++)i=m[d].match(r),i&&i[1]&&(a=s(i[1]),u=s(i[2])||"",l[a]=u)}else e=n||""})(t.name),c.setItem=function(e,t){e&&void 0!==t&&(l[e]=t+"",n())},c.getItem=function(n){return l.hasOwnProperty(n)?l[n]:null},c.removeItem=function(e){l.hasOwnProperty(e)&&(l[e]=null,delete l[e],n())},c.clear=function(){l={},n()},c.valueOf=function(){return l},c.toString=function(){var n=t.name;return 0===n.indexOf(o)?n:o+n},t.qsStorage=c,module.exports=c});