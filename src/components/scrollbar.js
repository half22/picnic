(function (window, document, $, picnic) {

    'use strict';

    function getScrollbarWidth()
    {
        const rect = document.body.getBoundingClientRect();
        if(rect.left + rect.right >= window.innerWidth)
            return 0;

        var div = $('<div style="width:50px;height:50px;overflow:hidden;position:absolute;top:-200px;left:-200px;"><div style="height:100px;"></div>');
        // Append our div, do our calculation and then remove it
        $('body').append(div);
        var w1 = $('div', div).innerWidth();
        div.css('overflow-y', 'scroll');
        var w2 = $('div', div).innerWidth();
        $(div).remove();
        return (w1 - w2);
    }

    function preventScroll(event)
    {
        var target = $(event.currentTarget);

        if(picnic.scrollbar.allowedTarget && target != picnic.scrollbar.allowedTarget)
        {
            event.preventDefault();
        }
    }

    var scrollbar = {
        isDisabled: false,
        allowedTarget: null,

        enable: function()
        {
            if(!this.isDisabled) return;
            this.isDisabled = false;

            $('body').css({
                'overflow': '',
                'margin-right': ''
            });

            if(isMobile())
            {
                if(this.allowedTarget)
                {
                    this.allowedTarget.off('touchstart', preventScroll);
                }
                // $('body').css({
                //     'position': '',
                //     'width': '',
                //     'margin-top': ''
                // });
                // $(document).scrollTop(this.scrollTop);
            }


            this.allowedTarget = null;
        },

        disable: function(allowedTarget)
        {
            if(this.isDisabled) return;
            this.isDisabled = true;
            this.allowedTarget = allowedTarget || null;

            $('body').css({
                'overflow': 'hidden',
                'margin-right': getScrollbarWidth()
            });

            if(isMobile())
            {
                if(this.allowedTarget)
                {
                    this.allowedTarget.on('touchstart', preventScroll);
                }

                // this.scrollTop = $(document).scrollTop();
                // $('body').css({
                //     'position': 'fixed',
                //     'width': '100%',
                //     'margin-top': (this.scrollTop * -1) + 'px'
                // });
            }
        }
    };

    picnic.scrollbar = scrollbar;
    window.picnic = picnic;

    if(typeof exports === 'object')
    {
		module.exports = picnic.scrollbar;
	}
	else if(typeof define === 'function' && define.amd)
	{
		define(function() { return picnic.scrollbar; });
	}

}(window, document, jQuery, window.picnic || {}));