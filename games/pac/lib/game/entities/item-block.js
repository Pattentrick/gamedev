ig.module(
    'game.entities.item-block'
)
.requires(
    'plusplus.core.entity',
    'plusplus.core.config',
    'game.entities.inventory-item-block'
)
.defines(function () {

	var _c  = ig.CONFIG;

    /**
     * Block item
     *
     * @class
     * @extends ig.EntityExtended
     * @memeberof ig
     */
    ig.EntityItemBlock = ig.global.EntityItemBlock = ig.EntityExtended.extend({

        name: 'Block',

        collides: ig.Entity.COLLIDES.FIXED,

		size: {
            x: 8,
            y: 8
        },

        matchingInventoryItem: ig.EntityInventoryItemBlock,
		
		animSheet: new ig.AnimationSheet( _c.PATH_TO_MEDIA + 'block.gif', 8, 8 ),

        animInit: 'idle',

		animSettings: {
            idle: {
                frameTime: 1,
                sequence: [0]
            }
		},

        interact: function( command ){

            if( command === 'Nimm' ){

                ig.game.inventory.addItem( this.matchingInventoryItem, this );

                // Update room state
                ig.game.roomState.block.isPickedUp = true;

                ig.game.getPlayer().speak('Ein Block. Endlich.');

            }
            else if( command === 'Schau' ){

                ig.game.getPlayer().speak('Ein Block.');

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