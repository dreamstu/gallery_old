define("gallery/eggs/0.1.0/eggs-debug", [ "modal-debug" ], function(require, exports, module) {
    require.async("./index-debug.css");
    require("modal-debug")($);
    var $B = $("body");
    var eggs = {};
    var $defualt = {
        top: 120,
        triggerId: "act-trigger",
        targetId: "act-pannel",
        closeButton: ".act_close"
    };
    eggs.init = function(options) {
        var _self = this;
        _self.fn.render(options, function() {
            _self.fn.createTrigger(options);
            options = $.extend($defualt, options);
            $("#" + options.triggerId).qsModal(options).trigger("click");
        });
        _self.fn.tips.init();
    };
    eggs.fn = {};
    eggs.fn.createTrigger = function(options) {
        $B.append('<a href="#' + options.targetId + '" id="' + options.triggerId + '" style="display: none;"></a>');
    };
    eggs.fn.render = function(options, callback) {
        var _self = this;
        $B.append(_self.getTpl(options.targetId));
        _self.script(options);
        if (callback) {
            callback.call();
        }
    };
    eggs.fn.getTpl = function(id) {
        return [ '<div class="golden_egg" id="' + id + '">', '<span class="act_golden_close"></span>', '<ul class="golden_ul">', '<p class="hammer pic pic_5" id="hammer">锤子</p>', '<p class="resultTip" id="resultTip"><b id="result"></b></p>', '<li class="golden_1"><span class="pic pic_1"></span></li>', '<li class="golden_2 center"><span class="pic pic_1"></span></li>', '<li class="golden_3"><span class="pic pic_1"></span></li>', "</ul>", "</div>" ].join("");
    };
    eggs.fn.script = function(options) {
        var _fn = this;
        function eggClick(obj) {
            var _this = obj;
            $.post(options.url + "bs/prize/check/hitegg", {
                id: options.orderId
            }, function(res) {
                if (!_this.find("span.pic").hasClass("pic_1")) {
                    alert("蛋都碎了，别砸了！刷新再来.");
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
                        if (res.state == 0) {
                            options.money = res.prize;
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
        $(".golden_egg").css({
            cursor: "url(" + options.staticUrl + "eggs/0.1.0/img/hit.ico),auto"
        });
        $(".golden_ul li").click(function() {
            eggClick($(this));
        });
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
        $(options.closeButton).on("click", function() {
            $(".layer-close").trigger("click");
        });
    };
    eggs.fn.tips = {};
    eggs.fn.tips.init = function() {
        $B.append('<div id="act-tips-pannel" style="display: none;"></div>');
        $B.append('<a href="#act-tips-pannel" id="act-tips-trigger" style="display: none;"></a>');
    };
    eggs.fn.tips.ok = function(options) {
        var _self = this;
        $("#act-tips-pannel").empty();
        $("#act-tips-pannel").append(_self.getTpl("ok", options));
        var $trigger = $("#act-tips-trigger");
        $trigger.qsModal({
            top: 250,
            lock: true,
            closeButton: ".layer-close"
        }).trigger("click");
    };
    eggs.fn.tips.no = function(options) {
        var _self = this;
        $("#act-tips-pannel").empty();
        $("#act-tips-pannel").append(_self.getTpl("no"));
        var $trigger = $("#act-tips-trigger");
        $trigger.qsModal({
            top: 250,
            lock: true,
            closeButton: ".layer-close"
        }).trigger("click");
        $(".layer-no .layer-link").on("click", function() {
            $(".layer-no .layer-close").trigger("click");
            $(options.closeButton).trigger("click");
        });
    };
    eggs.fn.tips.getTpl = function(type, options) {
        switch (type) {
          case "ok":
            return [ '<div id="ks-content-ks-component" class="ks-overlay-content">', '	<div class="wrapper">', '	<div class="layer-ok layer-ie-ok">', '<i class="layer-money" target="_blank">' + options.money + "</i>", '<i class="layer-close"></i>', '		<a href="' + options.url + "act/" + options.orderId + '/award.html" class="layer-link" target="_blank">填写领奖信息</a>', "	</div>", "</div>", "</div>" ].join("");
            break;

          case "no":
            return [ '<div id="ks-content-ks-component" class="ks-overlay-content">', '	<div class="wrapper">', '	<div class="layer-no layer-ie-no">', '		<i class="layer-close"></i>', '		<a href="javascript:void(0);" class="layer-link">下次再来</a>', "	</div>", "</div>", "</div>" ].join("");
            break;
        }
    };
    module.exports = eggs;
});