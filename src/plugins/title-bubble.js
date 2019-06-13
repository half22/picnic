(function(window, $, picnic) {

    'use strict';

    function show(event)
    {
        var target = $(event.currentTarget);
        var title = target.prop('title');
        if(target.data('title').length)
        {
            title = target.data('title');
        }

        var bubble = target.find('*[data-element=bubble]');
        if(!bubble.length)
        {
            bubble = '<span class="c-title-bubble" data-element="bubble"></span>';
            target.append(bubble);
        }

        bubble.html(title);
        target.prop('title', '');
        target.data('title', title);
    }

    $.extend($.fn, {
        titleBubble: function ()
        {
            return this.each(function (index, domElement) {
                var element = $(domElement);
                if (!element.data('plugin-title-bubble')) {
                    element.on('mouseover titleChanged', show);
                    element.data('plugin-title-bubble', true);
                }
            });
        }
    });

    window.picnic = picnic;

    if(typeof exports === 'object')
    {
		module.exports = $.fn.titleBubble;
	}
	else if(typeof define === 'function' && define.amd)
	{
		define(function() { return $.fn.titleBubble; });
	}

})(window, jQuery, window.picnic || {});