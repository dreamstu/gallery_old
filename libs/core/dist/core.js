/*
 * core
 * https://github.com/dreamstu/gallery
 *
 * Copyright (c) 2014 dreamstu
 * Licensed under the MIT license.
 */
define("gallery/core/0.1.1/core", [ "json2map/1.0.0/index", "template/1.0.0/index", "gallery/dialog/0.1.0/dialog", "status/1.0.1/index", "jsons/1.0.0/index" ], function(require, exports, module) {
    var Json2Map = require("json2map/1.0.0/index");
    var Template = require("template/1.0.0/index");
    var Dialog = require("gallery/dialog/0.1.0/dialog");
    var Status = require("status/1.0.1/index")(Dialog);
    var Json = require("jsons/1.0.0/index")($);
    var utils = {
        _getPath: function(root) {
            var curWwwPath = window.document.location.href;
            var pathName = window.document.location.pathname;
            var pos = curWwwPath.indexOf(pathName);
            var rootPath = curWwwPath.substring(0, pos);
            var projectName = pathName.substring(0, pathName.substr(1).indexOf("/") + 1);
            if (root) {
                return rootPath;
            } else {
                return rootPath + projectName;
            }
        }
    };
    var baseUrl = utils._getPath(false), rootUrl = utils._getPath(true), assetsUrl = baseUrl + "/assets", jsUrl = assetsUrl + "/js", mallUrl = rootUrl + "/carvin";
    var core = {
        //dev:true,
        baseUrl: baseUrl,
        rootUrl: rootUrl,
        assetUrl: assetsUrl,
        jsUrl: jsUrl,
        //staticLib:this.dev?"http://192.168.0.36:8000":"http://static.51baturu.com",
        mallUrl: mallUrl,
        repairUrl: rootUrl,
        headUrl: mallUrl + "/global/header.html",
        appUrl: mallUrl,
        domUrl: mallUrl + "/index.html",
        obj: {
            json: Json,
            status: Status,
            json2map: Json2Map,
            template: Template,
            dialog: Dialog
        },
        tpl: {
            //模板
            id2id: function(selector, id, map, callback) {
                var html = Template(id, map);
                $(selector).html(html);
                if (callback != undefined) callback(html);
            },
            id2html: function(id, map, callback) {
                var html = Template(id, map);
                if (callback != undefined) callback(html);
            }
        },
        utils: {
            //工具
            isEmpty: function(obj) {
                //非空判断
                return !Boolean($.trim(obj) || obj === 0) || obj == "null" || obj == "undefined";
            },
            toInt: function(string, base) {
                return parseInt(string, base || 10);
            },
            omit: function(obj, arr) {
                if (obj && typeof obj == "object" && arr && typeof arr == "object") {
                    $.each(arr, function(idx, name) {
                        if (obj[name]) delete obj[name];
                    });
                }
                return obj;
            },
            json2map: function(rst, nullVal) {
                return Json2Map.rst2map(rst, nullVal);
            },
            obj2row: function(obj) {
                var heads = [];
                var datas = [];
                $.each(obj, function(head, data) {
                    heads.push(head);
                    datas.push(data);
                });
                var obj = new Object();
                obj.head = heads;
                obj.data = datas;
                return Json.toJsonString(obj);
            },
            obj2rows: function(datas) {
                var obj = new Object();
                obj.head = datas.head;
                obj.data = datas.data;
                return Json.toJsonString(obj);
            },
            mapQuery: function(uri, encode) {
                // window.location.search
                var i, key, value, uri = uri && uri.split("#")[0] || window.location.search, // remove
                // hash
                index = uri.indexOf("?"), pieces = uri.substring(index + 1).split("&"), params = {};
                if (index === -1) {
                    // 如果连?号都没有,直接返回,不再进行处理. az 2011/5/11
                    return params;
                }
                for (i = 0; i < pieces.length; i++) {
                    try {
                        index = pieces[i].indexOf("=");
                        key = pieces[i].substring(0, index);
                        value = pieces[i].substring(index + 1);
                        var tmp = value;
                        if (!encode) {
                            tmp = unescape(value);
                        }
                        if (!(params[key] = tmp)) {
                            throw new Error("uri has wrong query string when run mapQuery.");
                        }
                    } catch (e) {}
                }
                return params;
            },
            toQueryPair: function(key, value) {
                return encodeURIComponent(String(key)) + "=" + encodeURIComponent(String(value));
            },
            toQueryString: function(obj) {
                var self = this;
                var result = [];
                for (var key in obj) {
                    result.push(self.toQueryPair(key, obj[key]));
                }
                return result.join("&");
            }
        },
        http: {
            //ajax
            getJson: function(uri, options, callback, callback2, isProgress, deci) {
                //默认配置
                var attrs = {
                    async: true,
                    dataType: "json",
                    timeout: 3e4,
                    type: "GET"
                };
                attrs = $.extend(true, {
                    success: function(rst) {
                        Status.check(rst, function() {
                            //解密
                            if (core.utils.isEmpty(deci) && deci) {
                                try {
                                    rst = Crypto.getRst(rst);
                                    callback(rst);
                                } catch (e) {}
                            } else {
                                if (!core.utils.isEmpty(rst)) {
                                    callback(rst);
                                }
                            }
                        }, function() {
                            if (!core.utils.isEmpty(callback2)) {
                                callback2(rst);
                            } else if (!core.utils.isEmpty(rst.msg)) alert(rst.msg); else alert("噢~ 服务器不小心睡着了。。。");
                        }, function() {
                            require.async("verify", function(Verify) {
                                Verify.check(core.mallUrl + "/bs/verifycode/find/img?t=" + Math.random(), function(userinputcode) {
                                    core.http.getJson(core.mallUrl + "/bs/verifycode/find/verify", {
                                        data: "code=" + userinputcode
                                    }, function(rst) {
                                        Verify.okCallback(rst, attrs);
                                    }, function() {
                                        Verify.inputErrorCallback();
                                    });
                                });
                            });
                        });
                    },
                    error: function() {}
                }, attrs, options);
                if (isProgress) {
                    attrs.beforeSend = function() {
                        Progress.showDialog();
                    };
                    attrs.complete = function(xhr, state) {
                        Progress.hideDialog();
                    };
                }
                attrs.url = uri;
                $.ajax(attrs);
            }
        },
        cookie: {
            //删除cookie
            del: function(name) {
                document.cookie = name + "=;expires=" + new Date(0).toGMTString();
            },
            set: function(objName, objValue, objHours) {
                //添加cookie
                var str = objName + "=" + escape(objValue);
                if (objHours > 0) {
                    //为0时不设定过期时间，浏览器关闭时cookie自动消失
                    var date = new Date();
                    var ms = objHours * 3600 * 1e3;
                    date.setTime(date.getTime() + ms);
                    str += "; expires=" + date.toGMTString();
                } else {
                    var Days = 30;
                    //此 cookie 将被保存 30 天
                    var exp = new Date();
                    //new Date("December 31, 9998");
                    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1e3);
                    str += ";expires=" + exp.toGMTString();
                }
                document.cookie = str;
            },
            get: function(name) {
                //取cookies函数
                var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
                if (arr != null) return unescape(arr[2]);
                return null;
            }
        },
        msg: {
            Ss: function(msg, callback, callback2) {
                var d = Dialog({
                    id: "dlg-ss",
                    title: "温馨提示",
                    content: msg,
                    ok: function() {
                        if (callback) callback(); else this.close().remove();
                    },
                    cancel: false,
                    onclose: function() {
                        if (callback2) callback2();
                    }
                });
                d.showModal();
            },
            Es: function(msg, callback, callback2) {
                var d = Dialog({
                    id: "dlg-es",
                    title: "温馨提示",
                    content: msg,
                    ok: function() {
                        if (callback) callback(); else this.close().remove();
                    },
                    cancel: false,
                    onclose: function() {
                        if (callback2) callback2();
                    }
                });
                d.showModal();
            },
            Tip: function(msg, callback, callback2) {
                var d = Dialog({
                    id: "dlg-tip",
                    title: "温馨提示",
                    content: msg,
                    ok: function() {
                        if (callback) callback(); else this.close().remove();
                    },
                    cancel: false,
                    onclose: function() {
                        if (callback2) callback2();
                    }
                });
                d.showModal();
            },
            show: function(msg, time, width) {
                var d = Dialog({
                    id: "dlg-show",
                    width: width || 250,
                    content: msg
                });
                d.showModal();
                if (time) {
                    setTimeout(function() {
                        d.close().remove();
                    }, time);
                }
            },
            Confirm: function(msg, callback, callback2, callback3) {
                var d = Dialog({
                    id: "dlg-confirm",
                    title: "请确认",
                    content: msg,
                    ok: callback,
                    cancelValue: "取消",
                    cancel: function() {
                        if (callback2) callback2();
                    },
                    onclose: function() {
                        if (callback3) callback3();
                    }
                });
                d.showModal();
            },
            Diy: function(options) {
                var attrs = {
                    id: "dlg-diy",
                    title: "温馨提示",
                    content: "",
                    ok: function() {},
                    cancel: function() {},
                    onclose: function() {},
                    clock: false
                };
                attrs = $.extend(true, {}, attrs, options);
                if (attrs.clock) {
                    Dialog(attrs).showModal();
                } else {
                    Dialog(attrs).show();
                }
            }
        }
    };
    module.exports = core;
});