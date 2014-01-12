ig.module(
    'game.entities.item-faucet'
)
.requires(
    'plusplus.core.entity',
    'plusplus.core.config'
)
.defines(function () {

	var _c  = ig.CONFIG;

    /**
     * Dresser.
     *
     * @class
     * @extends ig.EntityExtended
     * @memeberof ig
     */
    ig.EntityItemFaucet = ig.global.EntityItemFaucet = ig.EntityExtended.extend({

        name: 'Wasserhahn',

        _wmScalable: true,

        collides: ig.Entity.COLLIDES.NEVER,

		size: {
            x: 8,
            y: 8
        },

        // At which distance interaction should be triggered
        interactionDistance: 12,

        interact: function( command ){

            if( command === 'Schau' ){

                ig.game.getPlayer().speak('Der Wasserhahn ist kaputt');

            }
            else if( command === 'Benutze' ){

                ig.game.getPlayer().speak('Der Wasserhahn ist kaputt');

            }
            else if( command === 'Öffne' ){

                ig.game.getPlayer().speak('Der Wasserhahn ist kaputt');

            }
            else if( command === 'Nimm' ){

                ig.game.getPlayer().speak('Ähhh .. lieber nicht.');

            }
            else if( command === 'Rede' ){

                ig.game.getPlayer().speak('Hallo, ich verkaufe diese feinen Lederjacken.');

            }
            else {

                ig.game.getPlayer().speak('Berm.');

            }

        },

        /**
         * Gets called when the player tries to
         * combine another item with this item
         *
         * @param {object} entity The item entity
         */
        combine: function( entity ){

            ig.game.getPlayer().speak('... Berschauer.');

        }
		
	});

});