/*
Navigation controller plugin for jquery
Version 0.2.0
(c) 2013 Arthur Clemens arthur@visiblearea.com
Released under MIT licence

https://github.com/ArthurClemens/jquery-navigation-controller-plugin
*/

(function ($) {
    "use strict";

    var init,
        defaultSettings = {
            triggerSelector: "[data-rel=trigger]",
            closeSelector: "[data-rel=close]",
            getId: function ($el, $trigger) {
                return $trigger.attr("data-pane");
            },
            getPane: function ($el, id, $trigger) {
                return $(".pane[data-name='" + id + "']", $el);
            },
            show: function ($el, $pane, $trigger, $currentPane, $currentTrigger) {
                $pane.removeClass("hidden");
                $trigger.addClass("active");
            },
            hide: function ($el, $pane, $trigger) {
                $pane.addClass("hidden");
                $trigger.removeClass("active");
            },
            mayShow: function ($el, $pane, $trigger, $currentPane, $currentTrigger) {
                return true;
            },
            mayHide: function ($el, $pane, $trigger) {
                return true;
            },
            inDelay: 0,
            outDelay: 0
        };

    init = function (options, $el) {
        var opts,
            ids, // associative list of objects { trigger: $jQueryObject, pane: $jQueryObject, shown: Boolean  }
            currentId,
            showTimer,
            clickPos,
            show,
            hide,
            registerId,
            showNow,
            hideNow,
            getIdFunc,
            getPaneFunc,
            activeFunc,
            showFunc,
            hideFunc,
            mayShowFunc,
            mayHideFunc,
            triggerSelector,
            closeSelector,
            inDelay,
            outDelay;

        registerId = function (id, $trigger, $pane) {
            ids[id] = {
                trigger: $trigger,
                pane: $pane,
                active: false
            };
            return ids[id];
        };

        showNow = function (id) {
            var $currentTrigger,
                $currentPane,
                active,
                $trigger,
                $pane,
                mayShow;

            if (currentId === id) {
                return;
            }

            clearTimeout(showTimer);

            if (currentId !== undefined) {
                $currentTrigger = ids[currentId].trigger;
                $currentPane = ids[currentId].pane;
                active = ids[currentId].active;
            }

            if (mayShowFunc) {
                mayShow = mayShowFunc($el, $currentPane, $currentTrigger);
                if (!mayShow) {
                    return;
                }
            }

            if (currentId !== undefined) {
                if ($currentPane && active) {
                    if (hideFunc !== undefined) {
                        hideFunc($el, $currentPane, $currentTrigger);
                    }
                }
            }

            currentId = id;

            $trigger = ids[currentId].trigger;
            $pane = ids[currentId].pane;

            if (showFunc !== undefined) {
                showFunc($el, $pane, $trigger, $currentPane, $currentTrigger);
            }
            ids[currentId].active = true;
        };

        hideNow = function () {
            var $pane,
                $trigger,
                mayHide;

            if (currentId === undefined) {
                return;
            }
            if (hideFunc === undefined) {
                return;
            }
            if (!ids[currentId].active) {
                return;
            }

            $pane = ids[currentId].pane;
            $trigger = ids[currentId].trigger;

            if (mayHideFunc) {
                mayHide = mayHideFunc($el, $pane, $trigger);
                if (!mayHide) {
                    return;
                }
            }

            if (hideFunc !== undefined) {
                hideFunc($el, $pane, $trigger);
            }
            ids[currentId].active = false;
            currentId = undefined;
        };

        show = function (id, delay) {
            var d = delay || inDelay;
            clearTimeout(showTimer);
            showTimer = setTimeout(function () {
                showNow(id);
            }, d);
        };

        hide = function (delay) {
            var d = delay || outDelay;
            clearTimeout(showTimer);
            showTimer = setTimeout(function () {
                hideNow();
            }, d);
        };

        opts = $.extend({}, options); // copy to make sure each link has unique values

        ids = [];
        getIdFunc = opts.getId;
        getPaneFunc = opts.getPane;
        activeFunc = opts.active;
        showFunc = opts.show;
        hideFunc = opts.hide;
        mayShowFunc = opts.mayShow;
        mayHideFunc = opts.mayHide;
        triggerSelector = opts.triggerSelector;
        closeSelector = opts.closeSelector;
        inDelay = opts.inDelay;
        outDelay = opts.outDelay;

        // init all triggers and corresponding panes
        $(triggerSelector, $el).each(function (e) {
            var $trigger = $(this),
                id = getIdFunc($el, $trigger),
                $pane = getPaneFunc($el, id, $trigger);

            registerId(id, $trigger, $pane);

            $pane.hover(function () {
                clearTimeout(showTimer);
            }, function () {
                clearTimeout(showTimer);
                hide();
            });
        });

        $(triggerSelector, $el).hover(function (e) {
            var $trigger = $(this),
                id = getIdFunc($el, $trigger);
            // check hover location with previous click location
            // to prevent Firefox from triggering hover right after
            // the click
            if (clickPos && (e.clientX === clickPos.x && e.clientY === clickPos.y)) {
                return;
            }
            clickPos = {};
            show(id);
        }, function () {
            hide();
        });

        $(closeSelector, $el).live("click", function (e) {
            e.preventDefault();
            // store click location for Firefox
            clickPos = {x: e.clientX, y: e.clientY};
            hideNow();
            return false;
        });

        if (activeFunc) {
            showNow(activeFunc($el));
        }
    };

    $.fn.navcontrol = function (options) {
        options = $.extend({}, defaultSettings, options);
        return this.each(function () {
            init(options, this);
        });
    };

}(jQuery));

/*jslint regexp: true, browser: true */