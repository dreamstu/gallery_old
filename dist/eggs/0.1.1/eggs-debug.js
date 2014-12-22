/* 
Copyright 2014, QuickJS v1.0 dev 
MIT Licensed
build time: 2014-12-16 16:21:30 
*/
define("gallery/eggs/0.1.1/eggs-debug", [ "modal/1.0.0/index-debug", "gallery/core/0.1.1/core-debug" ], function(require, exports, module) {
    require.async("./index-debug.css");
    require("modal/1.0.0/index-debug")($);
    var core = require("gallery/core/0.1.1/core-debug");
    var Msg = core.msg;
    var $rpUrl = core.repairUrl;
    var $B = $("body");
    var $P = $(".act-pannel");
    var eggs = {};
    var $defualt = {
        top: 120,
        triggerId: "act-trigger",
        targetId: "act-pannel",
        closeButton: ".act_close",
        count: 0,
        hitCallback: function() {}
    };
    eggs.init = function(options) {
        var _self = this;
        _self.fn.render(options, function() {});
        if (!options.notfrist) {
            //是第一次加载时才加载
            _self.fn.tips.init(options);
            _self.fn.page.init();
        }
    };
    eggs.fn = {};
    eggs.fn.createTrigger = function(options) {
        $B.append('<a href="#' + options.targetId + '" id="' + options.triggerId + '" style="display: none;"></a>');
    };
    eggs.fn.render = function(options, callback) {
        var _self = this;
        var _target = $("#" + options.targetId);
        if (_target.length > 0) {
            _target.remove();
        }
        $P.append(_self.getTpl(options.targetId));
        _self.script(options);
        if (callback) {
            callback.call();
        }
    };
    eggs.fn.getTpl = function(id) {
        return [ '<div class="golden_egg" id="' + id + '">', '<ul class="golden_ul">', '<p class="hammer pic pic_5" id="hammer">锤子</p>', '<p class="resultTip" id="resultTip"><b id="result"></b></p>', '<li class="golden_1"><span class="pic pic_1"></span></li>', '<li class="golden_2 center"><span class="pic pic_1"></span></li>', '<li class="golden_3"><span class="pic pic_1"></span></li>', "</ul>", "</div>" ].join("");
    };
    eggs.fn.script = function(options) {
        var _fn = this;
        function eggClick(obj) {
            var _this = obj;
            $.post($rpUrl + "/bs/prize/check/hitegg", null, function(res) {
                if (!_this.find("span.pic").hasClass("pic_1")) {
                    return false;
                }
                $(".golden_ul li").unbind("click").unbind("mouseover");
                //
                $(".golden_egg").css({
                    cursor: "none"
                });
                $(".hammer").show().css({
                    top: _this.position().top - 85,
                    left: _this.position().left + 185
                });
                $(".hammer").animate({
                    top: _this.position().top - 25,
                    left: _this.position().left + 125
                }, 60, function() {
                    var cls = "pic_3";
                    if (res.state == 0) {
                        cls = "pic_2";
                    }
                    _this.find("span.pic").attr("class", "pic " + cls);
                    //蛋碎效果
                    $(".resultTip").css({
                        display: "block",
                        top: "100px",
                        left: _this.position().left + 45,
                        opacity: 0
                    }).animate({
                        top: "50px",
                        opacity: 1
                    }, 300, function() {
                        options.hitCallback(--options.count);
                        if (res.state == 0) {
                            options.money = res.prize;
                            options.orderId = res.id;
                            _fn.tips.ok(options);
                        } else {
                            _fn.tips.no(options);
                        }
                    });
                    //_this.find("sup").show(); //金花四溅
                    $(".hammer").hide();
                    $(".golden_egg").css({
                        cursor: "url(" + options.staticUrl + "eggs/0.1.0/img/hit.ico),auto"
                    });
                });
            }, "json");
        }
        if (options.login && options.count > 0) {
            $(".golden_egg").css({
                cursor: "url(" + options.staticUrl + "eggs/0.1.0/img/hit.ico),auto"
            });
            $(".golden_ul li").click(function() {
                eggClick($(this));
            });
        } else {
            $(".golden_egg").css({
                cursor: "pointer"
            });
            var _attrs = {
                content: "你没有用来砸蛋的幸运锤	:-(",
                ok: false,
                fixed: true,
                clock: true,
                cancelValue: "我知道了",
                button: [ {
                    value: "如何获取幸运锤",
                    autofocus: true,
                    callback: function() {
                        Msg.Diy({
                            id: "how",
                            fixed: true,
                            clock: true,
                            title: "如何参与本活动：",
                            content: "<ul>" + "<li><b>通过汽配铺网站平台成功消费，即可参与活动：</b></li>" + "<li>1.单笔成功消费200元以上可有机会获得砸金蛋的幸运锤一个。</li>" + "<li>2.利用幸运锤在此页面参与砸蛋活动。</li>" + "<li>3.一个幸运锤只能参与一次砸蛋活动。</li>" + "<li>4.幸运锤的幸运度与单笔成交金额成正比，与砸蛋中奖金额成正比。</li>" + "</ul>",
                            ok: false,
                            cancel: false,
                            button: [ {
                                value: "我已了解如何参与本活动",
                                autofocus: true
                            } ]
                        });
                    }
                } ]
            };
            if (!options.login) {
                _attrs = {
                    content: "登录查看可用幸运锤数量",
                    ok: false,
                    fixed: true,
                    clock: true,
                    cancel: false,
                    button: [ {
                        value: "去登录",
                        autofocus: true,
                        callback: function() {
                            window.location.href = $rpUrl + "/login.html";
                        }
                    } ]
                };
            }
            $(".golden_ul li").click(function() {
                Msg.Diy(_attrs);
            });
        }
        $(".golden_ul li").hover(function() {
            var _self = $(this);
            var posL = _self.position().left + $(this).width() - 50;
            var posT = _self.position().top - 50;
            $("#hammer").css({
                left: posL,
                top: posT
            });
        }).on("mouseover", function() {
            var _self = $(this);
            var $tmp = 272;
            if (_self.hasClass("center")) {
                $tmp = 305;
            }
            $tmp -= 25;
            _self.animate({
                top: $tmp
            }, 100, function() {
                _self.animate({
                    top: $tmp + 25
                }, 100);
            });
        });
    };
    eggs.fn.tips = {};
    eggs.fn.tips.init = function(options) {
        $B.append('<div id="act-tips-pannel" style="display: none;"></div>');
        $B.append('<a href="#act-tips-pannel" id="act-tips-trigger" style="display: none;"></a>');
        $("#act-tips-trigger").qsModal({
            top: 250,
            lock: true,
            closeButton: ".layer-link"
        });
        $(".wrapper-modal .layer-link").unbind("click").live("click", function() {
            //refesh eggs
            options.notfrist = true;
            eggs.init(options);
        });
    };
    eggs.fn.tips.ok = function(options) {
        var _self = this;
        $("#act-tips-pannel").empty();
        $("#act-tips-pannel").append(_self.getTpl("ok", options));
        $("#act-tips-trigger").trigger("click");
    };
    eggs.fn.tips.no = function(options) {
        var _self = this;
        $("#act-tips-pannel").empty();
        $("#act-tips-pannel").append(_self.getTpl("no"));
        $("#act-tips-trigger").trigger("click");
    };
    eggs.fn.tips.getTpl = function(type, options) {
        switch (type) {
          case "ok":
            return [ '<div id="ks-content-ks-component" class="ks-overlay-content">', '	<div class="wrapper-modal">', '	<div class="layer-ok layer-ie-ok">', '<i class="layer-money" target="_blank">' + options.money + "</i>", '<i class="layer-close"></i>', '		<a href="' + $rpUrl + "/act/" + options.orderId + '/award.html" class="layer-link" target="_blank">填写领奖信息</a>', "	</div>", "</div>", "</div>" ].join("");
            break;

          case "no":
            return [ '<div id="ks-content-ks-component" class="ks-overlay-content">', '	<div class="wrapper-modal">', '	<div class="layer-no layer-ie-no">', '		<i class="layer-close"></i>', '		<a href="javascript:void(0);" class="layer-link">下次再来</a>', "	</div>", "</div>", "</div>" ].join("");
            break;
        }
    };
    eggs.fn.page = {};
    eggs.fn.page.init = function() {};
    module.exports = eggs;
});
