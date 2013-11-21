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

                ig.game.gui.inventory.addItem( this.matchingInventoryItem, this );

            }
            else if( command === 'Schau' ){

                console.log('Eine riesige Zitrone ... unglaublich!');

            }
            else if( command === 'Rede' ){

                console.log('Na Zitrone, bist du SAUER auf mich. Wortspiel!');

            }
            else {
                console.log('Das macht keinen Sinn.');
            }

        },

        /**
         * Gets called when the player tries to
         * combine another item with this item
         *
         * @param {object} entity The item entity
         */
        combine: function( entity ){


        }
		
	});

});