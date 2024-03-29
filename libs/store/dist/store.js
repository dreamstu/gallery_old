/*
 * store
 * https://github.com/dreamstu/gallery
 *
 * Copyright (c) 2014 dreamstu
 * Licensed under the MIT license.
 */
define("gallery/store/0.1.0/store", [], function(require, exports) {
    // qsStorage
    // 利用 window.name 实现跨页面跨域的数据传输。
    var win = window;
    var SCHEME = "qsStorage:";
    //var RE_NAMES = /^qsStorage:([^?]*)(?:\?(?:([^=]+)=([^&]*))*)?/g;
    var RE_PAIR = /^([^=]+)(?:=(.*))?$/;
    var Q = "?";
    var EQ = "=";
    var AND = "&";
    var encode = encodeURIComponent;
    var decode = decodeURIComponent;
    var STORAGE = {};
    var ORIGIN_NAME;
    var qsStorage = {};
    // 解析并初始化 name 数据。
    // 标准的 qsStorage 数据格式为 `qsStorage:origin-name?key=value`
    // @param {String} name.
    (function parse(name) {
        if (name && name.indexOf(SCHEME) === 0) {
            var match = name.split(/[:?]/);
            match.shift();
            // scheme: match[0];
            ORIGIN_NAME = decode(match.shift()) || "";
            // match[1]
            var params = match.join("");
            // match[2,...]
            var pairs = params.split(AND);
            for (var i = 0, pair, key, value, l = pairs.length; i < l; i++) {
                pair = pairs[i].match(RE_PAIR);
                if (!pair || !pair[1]) {
                    continue;
                }
                key = decode(pair[1]);
                value = decode(pair[2]) || "";
                STORAGE[key] = value;
            }
        } else {
            ORIGIN_NAME = name || "";
        }
    })(win.name);
    // 写入数据。
    // @param {String} key, 键名。
    // @param {String} value, 键值。
    qsStorage.setItem = function(key, value) {
        if (!key || "undefined" === typeof value) {
            return;
        }
        STORAGE[key] = String(value);
        save();
    };
    // 读取数据。
    // @param {String} key, 键名。
    // @return {String} 键值。如果不存在，则返回 `null`。
    qsStorage.getItem = function(key) {
        return STORAGE.hasOwnProperty(key) ? STORAGE[key] : null;
    };
    // 移除数据。
    // @param {String} key, 键名。
    qsStorage.removeItem = function(key) {
        if (!STORAGE.hasOwnProperty(key)) {
            return;
        }
        STORAGE[key] = null;
        delete STORAGE[key];
        save();
    };
    // 清空 qsStorage。
    qsStorage.clear = function() {
        STORAGE = {};
        save();
    };
    qsStorage.valueOf = function() {
        return STORAGE;
    };
    qsStorage.toString = function() {
        var name = win.name;
        return name.indexOf(SCHEME) === 0 ? name : SCHEME + name;
    };
    // 保存数据到 window.name
    // 如果没有存储数据，则恢复原始窗口名称(window.name)。
    function save() {
        var pairs = [];
        var empty = true;
        var value;
        for (var key in STORAGE) {
            if (!STORAGE.hasOwnProperty(key)) {
                continue;
            }
            empty = false;
            value = STORAGE[key] || "";
            pairs.push(encode(key) + EQ + encode(value));
        }
        win.name = empty ? ORIGIN_NAME : SCHEME + encode(ORIGIN_NAME) + Q + pairs.join(AND);
    }
    win.qsStorage = qsStorage;
    module.exports = qsStorage;
});