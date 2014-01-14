ig.module(
    'game.entities.item-crates'
)
.requires(
    'plusplus.core.entity',
    'plusplus.core.config',
    'game.entities.inventory-item-stick'
)
.defines(function () {

	var _c  = ig.CONFIG;

    /**
     * Boxes.
     *
     * @class
     * @extends ig.EntityExtended
     * @memeberof ig
     */
    ig.EntityItemCrates = ig.global.EntityItemCrates = ig.EntityExtended.extend({

        name: 'Kisten',

        _wmScalable: true,

        persistent: true,

        collides: ig.Entity.COLLIDES.NEVER,

		size: {
            x: 8,
            y: 8
        },

        state: 'untouched',

        matchingInventoryItem: ig.EntityInventoryItemStick,

        // At which distance interaction should be triggered
        interactionDistance: 1,

        interact: function( command ){

            if( command === 'Schau' ){

                ig.game.getPlayer().speak('Da stehen zwei komische Kisten in der Ecke.');

            }
            else if( command === 'Rede' ){

                ig.game.getPlayer().speak('Hallo, ich verkaufe diese feinen Lederjacken.');

            }
            else if( command === 'Öffne' ){

                if( this.state === 'untouched' ){

                    ig.game.getPlayer().speak('WTF? Die Kisten sind voller Stöcker ... ich nehme mal einen mit.');

                    // Add stick to inventory
                    ig.game.inventory.addItem( this.matchingInventoryItem );

                    this.state = 'touched';

                }
                else {

                    ig.game.getPlayer().speak('Der Stock, ich will nicht noch einen.');

                }

            }
            else {

                ig.game.getPlayer().speak('Brehm.');

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