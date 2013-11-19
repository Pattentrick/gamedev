ig.module(
    'game.entities.item-chest'
)
.requires(
    'plusplus.core.entity',
    'plusplus.core.config'
)
.defines(function () {

	var _c  = ig.CONFIG;

    /**
     * Chest item.
     *
     * @class
     * @extends ig.EntityExtended
     * @memeberof ig
     */
    ig.EntityItemChest = ig.global.EntityItemChest = ig.EntityExtended.extend({

        name: 'Truhe',

        collides: ig.Entity.COLLIDES.FIXED,

		size: {
            x: 16,
            y: 16
        },

        matchingInventoryItem: ig.EntityInventoryItemLemon,
		
		animSheet: new ig.AnimationSheet( _c.PATH_TO_MEDIA + 'chest.gif', 16, 16 ),

        animInit: 'idle',

		animSettings: {
            idle: {
                frameTime: 1,
                sequence: [0]
            }
		},

        interact: function( command ){

            if( command === 'Öffne' ){

                console.log('Ich kriege die Truhe nicht auf. Das Schloss klemmt.');

            }
            else if( command === 'Schau' ){

                console.log('Eine große massive Holztruhe.');

            }
            else {

                console.log('Das macht keinen Sinn.');

            }

        }
		
	});

});