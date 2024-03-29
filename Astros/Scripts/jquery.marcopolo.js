/*!
* jQuery UI Widget 1.8.14
*
* Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
* Dual licensed under the MIT or GPL Version 2 licenses.
* http://jquery.org/license
*
* http://docs.jquery.com/UI/Widget
*/
(function (b, j) {
    if (b.cleanData) { var k = b.cleanData; b.cleanData = function (a) { for (var c = 0, d; (d = a[c]) != null; c++) b(d).triggerHandler("remove"); k(a) } } else { var l = b.fn.remove; b.fn.remove = function (a, c) { return this.each(function () { if (!c) if (!a || b.filter(a, [this]).length) b("*", this).add([this]).each(function () { b(this).triggerHandler("remove") }); return l.call(b(this), a, c) }) } } b.widget = function (a, c, d) {
        var e = a.split(".")[0], f; a = a.split(".")[1]; f = e + "-" + a; if (!d) { d = c; c = b.Widget } b.expr[":"][f] = function (h) {
            return !!b.data(h,
a)
        }; b[e] = b[e] || {}; b[e][a] = function (h, g) { arguments.length && this._createWidget(h, g) }; c = new c; c.options = b.extend(true, {}, c.options); b[e][a].prototype = b.extend(true, c, { namespace: e, widgetName: a, widgetEventPrefix: b[e][a].prototype.widgetEventPrefix || a, widgetBaseClass: f }, d); b.widget.bridge(a, b[e][a])
    }; b.widget.bridge = function (a, c) {
        b.fn[a] = function (d) {
            var e = typeof d === "string", f = Array.prototype.slice.call(arguments, 1), h = this; d = !e && f.length ? b.extend.apply(null, [true, d].concat(f)) : d; if (e && d.charAt(0) === "_") return h;
            e ? this.each(function () { var g = b.data(this, a), i = g && b.isFunction(g[d]) ? g[d].apply(g, f) : g; if (i !== g && i !== j) { h = i; return false } }) : this.each(function () { var g = b.data(this, a); g ? g.option(d || {})._init() : b.data(this, a, new c(d, this)) }); return h
        } 
    }; b.Widget = function (a, c) { arguments.length && this._createWidget(a, c) }; b.Widget.prototype = { widgetName: "widget", widgetEventPrefix: "", options: { disabled: false }, _createWidget: function (a, c) {
        b.data(c, this.widgetName, this); this.element = b(c); this.options = b.extend(true, {}, this.options,
this._getCreateOptions(), a); var d = this; this.element.bind("remove." + this.widgetName, function () { d.destroy() }); this._create(); this._trigger("create"); this._init()
    }, _getCreateOptions: function () { return b.metadata && b.metadata.get(this.element[0])[this.widgetName] }, _create: function () { }, _init: function () { }, destroy: function () { this.element.unbind("." + this.widgetName).removeData(this.widgetName); this.widget().unbind("." + this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass + "-disabled ui-state-disabled") },
        widget: function () { return this.element }, option: function (a, c) { var d = a; if (arguments.length === 0) return b.extend({}, this.options); if (typeof a === "string") { if (c === j) return this.options[a]; d = {}; d[a] = c } this._setOptions(d); return this }, _setOptions: function (a) { var c = this; b.each(a, function (d, e) { c._setOption(d, e) }); return this }, _setOption: function (a, c) { this.options[a] = c; if (a === "disabled") this.widget()[c ? "addClass" : "removeClass"](this.widgetBaseClass + "-disabled ui-state-disabled").attr("aria-disabled", c); return this },
        enable: function () { return this._setOption("disabled", false) }, disable: function () { return this._setOption("disabled", true) }, _trigger: function (a, c, d) { var e = this.options[a]; c = b.Event(c); c.type = (a === this.widgetEventPrefix ? a : this.widgetEventPrefix + a).toLowerCase(); d = d || {}; if (c.originalEvent) { a = b.event.props.length; for (var f; a; ) { f = b.event.props[--a]; c[f] = c.originalEvent[f] } } this.element.trigger(c, d); return !(b.isFunction(e) && e.call(this.element[0], c, d) === false || c.isDefaultPrevented()) } 
    }
})(jQuery);

/**
* Marco Polo v1.3.2
*
* A jQuery autocomplete plugin for the discerning developer.
*
* https://github.com/jstayton/jquery-marcopolo
*
* Copyright 2011 by Justin Stayton
* Released under the MIT License
* http://en.wikipedia.org/wiki/MIT_License
*/
(function (f) {
    var j = {}; f.widget("mp.marcoPolo", { options: { cache: !0, compare: !1, data: {}, delay: 250, formatData: null, formatError: function () { return "<em>Your search could not be completed at this time.</em>" }, formatItem: function (a) { return a.title || a.name }, formatMinChars: function (a) { return "<em>Your search must be at least <strong>" + a + "</strong> characters.</em>" }, formatNoResults: function (a) { return "<em>No results for <strong>" + a + "</strong>.</em>" }, hideOnSelect: !0, label: null, minChars: 1, onChange: null, onError: null,
        onFocus: null, onMinChars: null, onNoResults: null, onRequestBefore: null, onRequestAfter: null, onResults: null, onSelect: function (a) { this.val(a.title || a.name) }, param: "q", required: !1, selectable: "*", selected: null, url: null
    }, keys: { DOWN: 40, ENTER: 13, ESC: 27, UP: 38, TAB: 9 }, _create: function () {
        this.$input = this.element.addClass("mp_input"); this.$list = f('<ol class="mp_list" />').hide().insertAfter(this.$input); this.autocomplete = this.$input.attr("autocomplete"); this.$input.attr("autocomplete", "off"); this.ajax = null; this.ajaxAborted =
!1; this.documentMouseup = null; this.mousedown = this.focusReal = this.focusPseudo = !1; this.selected = null; this.selectedMouseup = !1; this.timer = null; this.value = this.$input.val(); this._bindInput()._bindList()._bindDocument(); this._initOptions()
    }, _setOption: function (a, b) { f.Widget.prototype._setOption.apply(this, arguments); this._initOptions(a, b) }, _initOptions: function (a, b) {
        var d = this, c = {}; typeof a === "undefined" ? c = d.options : c[a] = b; f.each(c, function (a, b) {
            switch (a) {
                case "label": d.options.label = f(b).addClass("mp_label");
                    d._toggleLabel(); break; case "selected": d._select(b, null); break; case "url": if (!b) d.options.url = d.$input.closest("form").attr("action")
            } 
        }); return d
    }, change: function (a) { a !== this.value && (this.$input.val(a), this._change(a), this.focusPseudo ? this._cancelPendingRequest()._hideAndEmptyList() : this._toggleLabel()) }, search: function (a) { var b = this.$input; typeof a !== "undefined" && b.val(a); b.focus() }, hideList: function () { this._hideList(); }, destroy: function () {
        var a = this.options; this.$list.remove(); this.autocomplete !== "off" && this.$input.removeAttr("autocomplete");
        this.$input.removeClass("mp_input"); a.label && a.label.removeClass("mp_label"); f(document).unbind("mouseup.marcoPolo", this.documentMouseup); f.Widget.prototype.destroy.apply(this, arguments)
    }, list: function () { return this.$list }, _bindInput: function () {
        var a = this, b = a.$input, d = a.$list; b.bind("focus.marcoPolo", function () { if (!a.focusReal) a.focusPseudo = !0, a.focusReal = !0, a._toggleLabel(), a.selectedMouseup ? a.selectedMouseup = !1 : (a._trigger("focus"), a._request(b.val())) }).bind("keydown.marcoPolo", function (b) {
            var e =
f(); switch (b.which) { case a.keys.UP: b.preventDefault(); a._showList()._highlightPrev(); break; case a.keys.DOWN: b.preventDefault(); a._showList()._highlightNext(); break; case a.keys.TAB: if (!d.is(":visible")) break; e = a._highlighted(); e.length && a._select(e.data("marcoPolo"), e); break; case a.keys.ENTER: b.preventDefault(); if (!d.is(":visible")) break; e = a._highlighted(); e.length && a._select(e.data("marcoPolo"), e); break; case a.keys.ESC: a._cancelPendingRequest()._hideList() } 
        }).bind("keyup.marcoPolo", function () { b.val() !== a.value && a._request(b.val()) }).bind("blur.marcoPolo", function () {
            a.focusReal = !1; setTimeout(function () {
                if (!a.mousedown) a.focusPseudo =
!1, a._dismiss()
            }, 1)
        }); return a
    }, _bindList: function () { var a = this; a.$list.bind("mousedown.marcoPolo", function () { a.mousedown = !0 }).delegate("li.mp_selectable", "mouseover", function () { a._addHighlight(f(this)) }).delegate("li.mp_selectable", "mouseout", function () { a._removeHighlight(f(this)) }).delegate("li.mp_selectable", "mouseup", function () { var b = f(this); a._select(b.data("marcoPolo"), b); a.selectedMouseup = !0; a.$input.focus() }); return a }, _bindDocument: function () {
        var a = this; f(document).bind("mouseup.marcoPolo",
a.documentMouseup = function () { a.mousedown = !1; if (!a.focusReal && a.$list.is(":visible")) a.focusPseudo = !1, a._dismiss() }); return a
    }, _toggleLabel: function () { var a = this.options.label; a.length && (this.focusPseudo || this.$input.val() ? a.hide() : a.show()); return this }, _firstSelectableItem: function () { return this.$list.children("li.mp_selectable:visible:first") }, _lastSelectableItem: function () { return this.$list.children("li.mp_selectable:visible:last") }, _highlighted: function () { return this.$list.children("li.mp_highlighted") },
        _removeHighlight: function (a) { a.removeClass("mp_highlighted"); return this }, _addHighlight: function (a) { this._removeHighlight(this._highlighted()); a.addClass("mp_highlighted"); return this }, _highlightFirst: function () { this._addHighlight(this._firstSelectableItem()); return this }, _highlightPrev: function () { var a = this._highlighted().prevAll("li.mp_selectable:visible:first"); a.length || (a = this._lastSelectableItem()); this._addHighlight(a); return this }, _highlightNext: function () {
            var a = this._highlighted().nextAll("li.mp_selectable:visible:first");
            a.length || (a = this._firstSelectableItem()); this._addHighlight(a); return this
        }, _showList: function () { var a = this.$list; a.children().length && a.show(); return this }, _hideList: function () { this.$list.hide(); return this }, _hideAndEmptyList: function () { this.$list.hide().empty(); return this }, _buildNoResultsList: function (a) {
            var b = this.$input, d = this.$list, c = this.options, e = f('<li class="mp_no_results" />'); (b = c.formatNoResults && c.formatNoResults.call(b, a, e)) && e.html(b); this._trigger("noResults", [a, e]); b ? (e.appendTo(d),
this._showList()) : this._hideList(); return this
        }, _buildResultsList: function (a, b) {
            for (var d = this.$input, c = this.$list, e = this.options, h = this.selected, g = e.compare && h, i, k, m = !1, l = f(), j = 0; b[j]; j++) i = b[j], l = f('<li class="mp_item" />'), k = e.formatItem.call(d, i, l), l.data("marcoPolo", i), l.html(k).appendTo(c), g && (e.compare === !0 ? k = h : (i = i[e.compare], k = h[e.compare]), i === k && (this._addHighlight(l), g = !1, m = !0)); c.children(e.selectable).addClass("mp_selectable"); this._trigger("results", [b]); this._showList();// m || this._highlightFirst();
            return this
        }, _buildSuccessList: function (a, b) { var d = this.$input, c = this.options; this.$list.empty(); c.formatData && (b = c.formatData.call(d, b)); f.isEmptyObject(b) ? this._buildNoResultsList(a) : this._buildResultsList(a, b); return this }, _buildErrorList: function (a, b, d) { var c = this.$input, e = this.$list, h = this.options, g = f('<li class="mp_error" />'); e.empty(); (c = h.formatError && h.formatError.call(c, g, a, b, d)) && g.html(c); this._trigger("error", [g, a, b, d]); c ? (g.appendTo(e), this._showList()) : this._hideList(); return this },
        _buildMinCharsList: function (a) { var b = this.$input, d = this.$list, c = this.options, e = f('<li class="mp_min_chars" />'); if (!a.length) return this._hideAndEmptyList(), this; d.empty(); (a = c.formatMinChars && c.formatMinChars.call(b, c.minChars, e)) && e.html(a); this._trigger("minChars", [c.minChars, e]); a ? (e.appendTo(d), this._showList()) : this._hideList(); return this }, _cancelPendingRequest: function () { this.ajax ? (this.ajaxAborted = !0, this.ajax.abort()) : this.ajaxAborted = !1; clearTimeout(this.timer); return this }, _change: function (a) {
            this.selected =
null; this.value = a; this._trigger("change", [a]); return this
        }, _request: function (a) {
            var b = this, d = b.$input, c = b.options; b._cancelPendingRequest(); a !== b.value && b._change(a); b.timer = setTimeout(function () {
                var e = {}, h = {}, g, i = f(); if (a.length < c.minChars) return b._buildMinCharsList(a), b; e[c.param] = a; h = f.extend({}, c.data, e); g = c.url + (c.url.indexOf("?") === -1 ? "?" : "&") + f.param(h); c.cache && j[g] ? b._buildSuccessList(a, j[g]) : (b._trigger("requestBefore"), i = d.parent().addClass("mp_busy"), b.ajax = f.ajax({ url: c.url, dataType: "json",
                    data: h, success: function (c) { b._buildSuccessList(a, c); j[g] = c }, error: function (a, c, d) { b.ajaxAborted || b._buildErrorList(a, c, d) }, complete: function (a, c) { b.ajax = null; b.ajaxAborted = !1; i.removeClass("mp_busy"); b._trigger("requestAfter", [a, c]) } 
                }))
            }, c.delay); return b
        }, _select: function (a, b) { var d = this.$input, c = this.options.hideOnSelect; this.selected = a; if (!a) return this; c && this._hideList(); this._trigger("select", [a, b]); if (d.val() !== this.value) this.value = d.val(), this._hideAndEmptyList(); return this }, _dismiss: function () {
            var a =
this.$input, b = this.options; this._cancelPendingRequest()._hideAndEmptyList(); b.required && !this.selected && (a.val(""), this._change("")); this._toggleLabel(); return this
        }, _trigger: function (a, b) { var d = "on" + a.charAt(0).toUpperCase() + a.slice(1), c = this.widgetEventPrefix.toLowerCase() + a.toLowerCase(), d = this.options[d]; this.element.trigger(c, b); return d && d.apply(this.element, b) } 
    })
})(jQuery);
