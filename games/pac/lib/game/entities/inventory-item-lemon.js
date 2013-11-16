ig.module(
    'game.entities.inventory-item-lemon'
)
.requires(
    'plusplus.core.entity',
    'plusplus.core.config'
)
.defines(function () {

	var _c  = ig.CONFIG;

    /**
     * Inventory item lemon
     *
     * @class
     * @extends ig.EntityExtended
     * @memeberof ig
     */
    ig.EntityInventoryItemLemon = ig.global.EntityInventoryItemLemon = ig.EntityExtended.extend({

        name: 'Monsterzitrone',

		size: {
            x: 30,
            y: 16
        },
		
		animSheet: new ig.AnimationSheet( _c.PATH_TO_MEDIA + 'inventory-item-lemon.gif', 30, 16 ),

        animInit: 'idle',

		animSettings: {
            idle: {
                frameTime: 1,
                sequence: [0]
            }
		},

        interact: function( command ){

            if( command === 'Nimm' ){
                console.log('Gegenstand aufgehoben.');
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

        }
		
	});

});