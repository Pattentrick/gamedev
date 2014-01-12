ig.module(
    'game.ui.cursor'
)
.requires(
    'plusplus.core.config',
    'plusplus.ui.ui-element'
)
.defines(function () {

	var _c  = ig.CONFIG;

    /**
     * UI Entity that functions as an animated cursor,
     * which replaces the default browser cursor.
     *
     * To hide the default cursor,
     * add "cursor: none;" to the
     * canvas css.
     *
     * @class
     * @extends ig.UIElement
     * @memeberof ig
     */
    ig.EntityCursor = ig.global.EntityCursor = ig.UIElement.extend({

        name: 'cursor',

        size: {
            x: 14,
            y: 14
        },

        cursorOffset: {
            x: -6,
            y: -6
        },

        frozen: false,

        fixed: false,

        performance: 'moveable',

        zIndex: 10,

        animSheet: new ig.AnimationSheet( _c.PATH_TO_MEDIA + 'ui/cursor.png', 14, 14 ),

        animInit: "blink",

        animSettings: {

            blink: {
                frameTime: 0.20,
                sequence: [0,1,2,0]
            }

        },

        /**
         * Reposition the cursor entity to the position
         * of the default browser mouse cursor
         */
        repositionCursor: function(){

            this.pos = {
                x: ig.input.mouse.x + ig.game.screen.x + this.cursorOffset.x,
                y: ig.input.mouse.y + ig.game.screen.y + this.cursorOffset.y
            }

        },

        update: function(){

            this.parent();

            this.repositionCursor();

        }
		
	});

});