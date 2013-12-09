ig.module(
    'game.entities.item-lemon'
)
.requires(
    'plusplus.core.entity',
    'plusplus.core.config',
    'game.entities.inventory-item-lemon'
)
.defines(function () {

	var _c  = ig.CONFIG;

    /**
     * Lemon item
     *
     * @class
     * @extends ig.EntityExtended
     * @memeberof ig
     */
    ig.EntityItemLemon = ig.global.EntityItemLemon = ig.EntityExtended.extend({

        name: 'Monsterzitrone',

        collides: ig.Entity.COLLIDES.FIXED,

		size: {
            x: 8,
            y: 8
        },

        // At which distance interaction should be triggered
        interactionDistance: 2,

        matchingInventoryItem: ig.EntityInventoryItemLemon,
		
		animSheet: new ig.AnimationSheet( _c.PATH_TO_MEDIA + 'lemon.gif', 8, 8 ),

        animInit: 'idle',

		animSettings: {
            idle: {
                frameTime: 1,
                sequence: [0]
            }
		},

        interact: function( command ){

            if( command === 'Nimm' ){

                // Add to inventory
                ig.game.inventory.addItem( this.matchingInventoryItem, this );

                // Update room state
                ig.game.roomState.lemon.isPickedUp = true;

                ig.game.getPlayer().speak('Eine Zitrone. Endlich.');

            }
            else if( command === 'Schau' ){

                ig.game.getPlayer().speak('Eine riesige Zitrone ... unglaublich!');

            }
            else if( command === 'Rede' ){

                ig.game.getPlayer().speak('Na Zitrone, bist du SAUER auf mich?');

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

            ig.game.getPlayer().speak('Berm.');

        }
		
	});

});