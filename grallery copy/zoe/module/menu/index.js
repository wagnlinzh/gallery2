// 导航组件，可以用作Tab，Menu，Nav等
// by lizzz (http://lizzz0523.github.io/)

define(function(require, exports, module) {

var utils = require('tool/utils'),

    $ = require('jquery'),
    _ = require('underscore'),

    ZView = require('module/view/index');


var defaults = {
        'tmpl'    : _.template('<a href="#<%= target %>"><%= text %></a>'),
        'pattern' : false,
        'hover'   : false, // 控制鼠标滑过是否激活控件
        'repeat'  : false, //重复标志，由于现实按钮能否重复点击
        'init'    : ''
    };


var ZMenu = ZView.extend({
        ztype : 'menu',

        terminal : true,

        events : {
            'click a' : 'clickTab',
            'mouseenter a' : 'hoverTab'
        },

        initialize : function(options) {
            _.extend(this, _.pick(options = _.defaults(options, defaults), _.keys(defaults)));

            ZView.prototype.initialize.call(this, options);
        },

        render : function() {
            var $data = this.$data,

                data = this.data,
                tmpl = this.tmpl,

                init = this.init;

            if (data) {
                this.data.each(function(model) {
                    this.append(tmpl(model.toJSON()));
                }, this);
            } else {
                _.each($data, function(elem) {
                    this.append(elem);
                }, this);
            }

            this.cache()
            this.active(init);

            return this;
        },

        cache : function() {
            var $elem = this.$el,
                $tabs = $elem.find('a'),

                cache = {};

            _.each($tabs, function(tab) {
                var href = tab.getAttribute('href', 2),
                    hash;

                if (hash = this.getHash(href)) {
                    if (cache[hash]) {
                        cache[hash].push(tab);
                    } else {
                        cache[hash] = [tab];
                    }
                }
            }, this);

            this.tab2Elem = cache;
        },

        active : function(tab) {
            var tab2Elem = this.tab2Elem,
                curTab = this.curTab,

                repeat = this.repeat;

            if (!tab2Elem[tab] || !repeat && tab == curTab) return;

            _.each(tab2Elem, function(elem, key) {
                $(elem).toggleClass('active', tab == key);
            }, this);

            this.curTab = tab;
            this.trigger('update', this.curTab);

            return this;
        },

        current : function() {
            return this.curTab;
        },

        hoverTab : function(event) {
            if (!this.hover) return;
            return this.clickTab(event);
        },

        clickTab : function(event) {
            var target = event.currentTarget,
                href = target.getAttribute('href', 2),
                hash;

            event && event.preventDefault();

            if (hash = this.getHash(href)) {
                this.active(hash);
            }
        },

        getHash : function(url) {
            var pattern = this.pattern,
                hash = utils.parseURL(url).hash;

            if (pattern && (hash = hash.match(pattern))) {
                hash = hash.pop();
            }

            return hash;
        }
    });


module.exports = ZMenu;

});