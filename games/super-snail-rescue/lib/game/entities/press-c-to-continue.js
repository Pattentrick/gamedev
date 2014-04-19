ig.module(
    'game.entities.press-c-to-continue'
)
.requires(
    'plusplus.core.entity',
    'plusplus.core.config'
)
.defines(function () {

    var _c  = ig.CONFIG;

    /**
     * The title at the title screen of Super Snail Rescue
     *
     * @class
     * @extends ig.EntityExtended
     * @memeberof ig
     */
    ig.EntityPressCToContinue = ig.global.EntityPressCToContinue = ig.EntityExtended.extend({

        size: {
            x: 8,
            y: 8
        },

        name: 'pressCToContinue',

        update: function(){

            this.parent();

            // Continue

            if ( ig.input.pressed('shoot') ) {

                ig.game.loadLevelDeferred( 'starfield' );

            }

        }

    });

});