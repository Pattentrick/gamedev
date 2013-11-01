ig.module(
    'game.ui.command-give'
)
.requires(
    'plusplus.core.config',
    'plusplus.ui.ui-button'
)
.defines(function () {

	var _c  = ig.CONFIG;

    /**
     * Entity that functions as an animated cursor,
     * which replaces the default browser cursor.
     *
     * To hide the default cursor,
     * add "cursor: none;" to the canvas css.
     *
     * @class
     * @extends ig.UIButton
     * @memeberof ig
     */
    ig.UIButtonGive = ig.global.UIButtonGive = ig.UIButton.extend({

        size: {
            x: 16,
            y: 10
        },

        performance: "dynamic",

        animSheet: new ig.AnimationSheet( _c.PATH_TO_MEDIA + 'ui_button_give.gif', 16, 10 ),

        animInit: "mouseOut",

        animSettings: {

            mouseOut: {
                frameTime: 1,
                sequence: [0]
            },

            mouseOver: {
                frameTime: 1,
                sequence: [1]
            }

        }
		
	});

});