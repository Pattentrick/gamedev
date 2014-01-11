ig.module(
    'game.entities.item-bed'
)
.requires(
    'plusplus.core.entity',
    'plusplus.core.config'
)
.defines(function () {

	var _c  = ig.CONFIG;

    /**
     * Bed.
     *
     * @class
     * @extends ig.EntityExtended
     * @memeberof ig
     */
    ig.EntityItemBed = ig.global.EntityItemBed = ig.EntityExtended.extend({

        name: 'Bett',

        _wmScalable: true,

        collides: ig.Entity.COLLIDES.FIXED,

		size: {
            x: 8,
            y: 8
        },

        // At which distance interaction should be triggered
        interactionDistance: 8,

        interact: function( command ){

            if( command === 'Schau' ){

                ig.game.getPlayer().speak('Ein Bett ... nicht schlecht!');

            }
            else if( command === 'Benutze' ){

                ig.game.getPlayer().speak('Ich bin nicht müde.');

            }
            else if( command === 'Rede' ){

                ig.game.getPlayer().speak('Brehm.');

            }
            else {

                ig.game.getPlayer().speak('Nö.');

            }

        },

        /**
         * Gets called when the player tries to
         * combine another item with this item
         *
         * @param {object} entity The item entity
         */
        combine: function( entity ){

            ig.game.getPlayer().speak('Auf keinen Fall.');

        }
		
	});

});