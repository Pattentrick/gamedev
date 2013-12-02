ig.module(
    'game.entities.inventory-item-block'
)
.requires(
    'plusplus.core.entity',
    'plusplus.core.config'
)
.defines(function () {

	var _c  = ig.CONFIG;

    /**
     * Inventory item block
     *
     * @class
     * @extends ig.EntityExtended
     * @memeberof ig
     */
    ig.EntityInventoryItemBlock = ig.global.EntityInventoryItemBlock = ig.EntityExtended.extend({

        name: 'Block',

		size: {
            x: 30,
            y: 16
        },
		
		animSheet: new ig.AnimationSheet( _c.PATH_TO_MEDIA + 'inventory-item-block.gif', 30, 16 ),

        animInit: 'idle',

		animSettings: {
            idle: {
                frameTime: 1,
                sequence: [0]
            }
		},

        interact: function( command ){

            if( command === 'Schau' ){

                ig.game.getPlayer().speak('Ein Block!');

            }
            else {

                ig.game.getPlayer().speak('Das macht keinen Sinn.');

            }

        },

        /**
         * Gets called when the player tries to
         * combine another item with this item
         *
         * @param {object} entity The item entity
         */
        combine: function( entity ){

            if( entity.name === 'Monsterzitrone' ){

                ig.game.getPlayer().speak('Das mit der Zitrone. Was!?');

            }
            else {

                ig.game.getPlayer().speak('Berschauer.');

            }

        }
		
	});

});