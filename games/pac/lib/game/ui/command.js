ig.module(
    'game.ui.command'
)
.requires(
    'plusplus.core.config',
    'plusplus.ui.ui-button'
)
.defines(function () {

	var _c  = ig.CONFIG;

    /**
     * Entity that functions as the give command. Part of the Ui.
     *
     * @class
     * @extends ig.UIButton
     * @memeberof ig
     */
    ig.Command = ig.global.Command = ig.UIButton.extend({

        performance: "dynamic",

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

        },

        /**
         * Detects if the mouse cursor hovers over an entity
         *
         * @returns {boolean}
         */
        inFocus: function() {
            return (
                (this.pos.x <= (ig.input.mouse.x + ig.game.screen.x)) &&
                    ((ig.input.mouse.x + ig.game.screen.x) <= this.pos.x + this.size.x) &&
                    (this.pos.y <= (ig.input.mouse.y + ig.game.screen.y)) &&
                    ((ig.input.mouse.y + ig.game.screen.y) <= this.pos.y + this.size.y)
                );
        },

        /**
         * Toggles animation on mouseOver and mouseOut
         */
        handleMouseOver: function(){

            this.inFocus() ? this.animOverride('mouseOver') : this.animOverride('mouseOut');

        },

        update: function(){

            this.parent();

            this.handleMouseOver();

        }
		
	});

});