ig.module(
    'game.entities.inventory-item-bottle'
)
.requires(
    'plusplus.core.entity',
    'plusplus.core.config'
)
.defines(function () {

	var _c  = ig.CONFIG;

    /**
     * Inventory item bottle
     *
     * @class
     * @extends ig.EntityExtended
     * @memeberof ig
     */
    ig.EntityInventoryItemBottle = ig.global.EntityInventoryItemBottle = ig.EntityExtended.extend({

        name: 'Wasserflasche',

        state: 'closed',

		size: {
            x: 30,
            y: 16
        },
		
		animSheet: new ig.AnimationSheet( _c.PATH_TO_MEDIA + 'inventory-item-bottle.gif', 30, 16 ),

        animInit: 'idle',

		animSettings: {
            idle: {
                frameTime: 1,
                sequence: [0]
            }
		},

        category: 'inventory',

        interact: function( command ){

            if( command === 'Schau' ){

                if( this.state === 'closed' ){

                    ig.game.getPlayer().speak('Der Verschluß der Flasche ist eckig - wie seltsam.');

                }
                else {

                    ig.game.getPlayer().speak('Die Flasche ist offen.');

                }

            }
            else if( command === 'Rede' ){

                ig.game.getPlayer().speak('Hallo, ich verkaufe diese feinen Lederjacken.');

            }
            else if( command === 'Öffne' ){

                if( this.state === 'closed' ){

                    ig.game.getPlayer().speak('Mist. Ich bekomme den Verschluß nicht auf, er sitzt zu fest.');

                }
                else {

                    ig.game.getPlayer().speak('Die Flasche ist bereits offen.');

                }

            }
            else {

                ig.game.getPlayer().speak('Das macht keinen Sinn.');

            }

        },

        combine: function(){

            ig.game.getPlayer().speak('Berschauer.');

        }
		
	});

});