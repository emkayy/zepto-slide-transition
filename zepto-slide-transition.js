/* Zepto plugin : slide transition v1.1
Modified / fixed version of
https://github.com/NinjaBCN/zepto-slide-transition
*/
/* global Zepto */
(function(factory) {
    if (typeof define === 'function' && define.amd) {
        define(['zepto'], factory);
    } else {
        factory(Zepto);
    }
}(function($) {
    var slide = function(direction) {
        return function(duration, callback) {
            var callback = $.isFunction(duration) ? duration : $.isFunction(callback) ? callback : undefined,
                duration = $.isNumeric(duration) ? duration : undefined;

            this.each(function() {
                var target = $(this),
                    position = target.css('position'),
                    parentStyle;

                if (target.height() === 0 && direction === 'up') {
                    return;
                }

                // Only for slideDown
                // Prepare element and parent element to get right position and css properties
                if (direction === 'down') {
                    parentStyle = target.parent().attr('style');
                    // show element if it is hidden
                    target.show();
                    // place it so it displays as usually but hidden
                    target.parent().css({
                        position: 'relative'
                    });
                    target.css({
                        position: 'absolute',
                        visibility: 'hidden'
                    });
                } // End only for slideDown

                var height = target.height(),
                    marginTop = target.css('margin-top'),
                    marginBottom = target.css('margin-bottom'),
                    paddingTop = target.css('padding-top'),
                    paddingBottom = target.css('padding-bottom');

                if (direction === 'down') {
                    // All slideDown specific actions

                    target.parent().attr('style', parentStyle);

                    // set initial css for animation
                    target.css({
                        position: position,
                        visibility: 'visible',
                        overflow: 'hidden',
                        height: 0,
                        marginTop: 0,
                        marginBottom: 0,
                        paddingTop: 0,
                        paddingBottom: 0
                    });

                    // animate to gotten height, margin and padding
                    target.animate({
                        height: height,
                        marginTop: marginTop,
                        marginBottom: marginBottom,
                        paddingTop: paddingTop,
                        paddingBottom: paddingBottom
                    }, {
                        duration: duration,
                        complete: function() {
                            target.attr('style', '');
                            target.show();
                            callback && callback.call(target);
                        }
                    });
                    // End all slideDown specific actions
                } else {
                    // All slideUp specific actions

                    // set initial css for animation
                    target.css({
                        display: 'block',
                        visibility: 'visible',
                        overflow: 'hidden',
                        height: height,
                        marginTop: marginTop,
                        marginBottom: marginBottom,
                        paddingTop: paddingTop,
                        paddingBottom: paddingBottom
                    });

                    // animate element height, margin and padding to zero
                    target.animate({
                        height: 0,
                        marginTop: 0,
                        marginBottom: 0,
                        paddingTop: 0,
                        paddingBottom: 0
                    }, {
                        duration: duration,
                        queue: false,
                        // callback : restore defaults but hide
                        complete: function() {
                            target.attr('style', '');
                            target.hide();
                            callback && callback.call(target);
                        }
                    });
                    // End all slideUp specific actions
                }
            }); // End each
        };
    };

    ['up', 'down'].forEach(function(direction) {
        var fnName = direction.substr(0, 1).toUpperCase() + direction.substr(1);

        $.fn['slide' + fnName] = slide(direction);
    });

    /* SlideToggle */
    $.fn.slideToggle = function(duration, callback) {
        if (this.height() === 0) {
        // If the element is hidden, slideDown!
            this.slideDown(duration, callback);
        } else {
        // If the element is visible, slideUp!
            this.slideUp(duration, callback);
        }
    };
}));
