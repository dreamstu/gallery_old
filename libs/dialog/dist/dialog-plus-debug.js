define("gallery/dialog/0.1.0/dialog-plus-debug", [ "jquery-debug", "./dialog-debug", "./popup-debug", "./dialog-config-debug", "./drag-debug" ], function(require) {
    var $ = require("jquery-debug");
    var dialog = require("./dialog-debug");
    var drag = require("./drag-debug");
    dialog.oncreate = function(api) {
        var options = api.options;
        var originalOptions = options.original;
        // 页面地址
        var url = options.url;
        // 页面加载完毕的事件
        var oniframeload = options.oniframeload;
        var $iframe;
        if (url) {
            this.padding = options.padding = 0;
            $iframe = $("<iframe />");
            $iframe.attr({
                src: url,
                name: api.id,
                width: "100%",
                height: "100%",
                allowtransparency: "yes",
                frameborder: "no",
                scrolling: "no"
            }).on("load", function() {
                var test;
                try {
                    // 跨域测试
                    test = $iframe[0].contentWindow.frameElement;
                } catch (e) {}
                if (test) {
                    if (!options.width) {
                        api.width($iframe.contents().width());
                    }
                    if (!options.height) {
                        api.height($iframe.contents().height());
                    }
                }
                if (oniframeload) {
                    oniframeload.call(api);
                }
            });
            api.addEventListener("beforeremove", function() {
                // 重要！需要重置iframe地址，否则下次出现的对话框在IE6、7无法聚焦input
                // IE删除iframe后，iframe仍然会留在内存中出现上述问题，置换src是最容易解决的方法
                $iframe.attr("src", "about:blank").remove();
            }, false);
            api.content($iframe[0]);
            api.iframeNode = $iframe[0];
        }
        // 对于子页面呼出的对话框特殊处理
        // 如果对话框配置来自 iframe
        if (!(originalOptions instanceof Object)) {
            var un = function() {
                api.close().remove();
            };
            // 找到那个 iframe
            for (var i = 0; i < frames.length; i++) {
                try {
                    if (originalOptions instanceof frames[i].Object) {
                        // 让 iframe 刷新的时候也关闭对话框，
                        // 防止要执行的对象被强制收回导致 IE 报错：“不能执行已释放 Script 的代码”
                        $(frames[i]).one("unload", un);
                        break;
                    }
                } catch (e) {}
            }
        }
        // 拖拽支持
        $(api.node).on(drag.types.start, "[i=title]", function(event) {
            // 排除气泡类型的对话框
            if (!api.follow) {
                api.focus();
                drag.create(api.node, event);
            }
        });
    };
    dialog.get = function(id) {
        // 从 iframe 传入 window 对象
        if (id && id.frameElement) {
            var iframe = id.frameElement;
            var list = dialog.list;
            var api;
            for (var i in list) {
                api = list[i];
                if (api.node.getElementsByTagName("iframe")[0] === iframe) {
                    return api;
                }
            }
        } else if (id) {
            return dialog.list[id];
        }
    };
    return dialog;
});