ig.module(
    'game.entities.item-bookshelf'
)
.requires(
    'plusplus.core.entity',
    'plusplus.core.config'
)
.defines(function () {

	var _c  = ig.CONFIG;

    /**
     * Bookshelf
     *
     * @class
     * @extends ig.EntityExtended
     * @memeberof ig
     */
    ig.EntityItemBookshelf = ig.global.EntityItemBookshelf = ig.EntityExtended.extend({

        name: 'Bücherregal',

        collides: ig.Entity.COLLIDES.NEVER,

        _wmScalable: true,

		size: {
            x: 8,
            y: 8
        },

        // At which distance interaction should be triggered
        interactionDistance: 9,

        interact: function( command ){

            if( command === 'Schau' ){

                ig.game.getPlayer().speak('Der Bücherregal, er hat viele Bücher.');

            }
            else if( command === 'Benutze' ){

                ig.game.getPlayer().speak('Warum sollte ich das benutzen?');

            }
            else {

                ig.game.getPlayer().speak('... Berschauer.');

            }

        },

        /**
         * Gets called when the player tries to
         * combine another item with this item
         *
         * @param {object} entity The item entity
         */
        combine: function( entity ){

            ig.game.getPlayer().speak('Die Kombination - er macht keinen Sinn.');

        }
		
	});

});