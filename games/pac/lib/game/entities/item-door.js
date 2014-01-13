ig.module(
    'game.entities.item-door'
)
.requires(
    'plusplus.core.entity',
    'plusplus.core.config'
)
.defines(function () {

	var _c  = ig.CONFIG;

    /**
     * Door.
     *
     * @class
     * @extends ig.EntityExtended
     * @memeberof ig
     */
    ig.EntityItemDoor = ig.global.EntityItemDoor = ig.EntityExtended.extend({

        name: 'Haustür',

        _wmScalable: true,

        collides: ig.Entity.COLLIDES.NEVER,

        persistent: true,

        state: 'gummy',

		size: {
            x: 8,
            y: 8
        },

        // At which distance interaction should be triggered
        interactionDistance: 1,

        interact: function( command ){

            if( command === 'Schau' ){

                ig.game.getPlayer().speak('Hier geht es raus. Ich muss schnell zum Sport, aber die Tür ist bestimmt verschloßen.');

            }
            else if( command === 'Öffne' ){

                ig.game.getPlayer().speak('Verschloßen! Ich brauche den Schlüssel, sonst komme ich zu spät zum Sport.');

            }
            else if( command === 'Benutze' ){

                ig.game.getPlayer().speak('Verschloßen! Ich brauche den Schlüssel, sonst komme ich zu spät zum Sport.');

            }
            else if( command === 'Rede' ){

                ig.game.getPlayer().speak('Hallo, ich verkaufe diese feinen Lederjacken.');

            }
            else if( command === 'Nimm' ){

                ig.game.getPlayer().speak('Ähhh .. lieber nicht.');

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

            if( entity.name === 'Schlüssel' && this.state === 'ungummy' ){

                ig.game.showEnding();

            }
            else if( entity.name === 'Schlüssel' && this.state === 'gummy' ){

                ig.game.getPlayer().speak('Geht nicht!','Eine zähe klebrige Flüssigkeit verstopft das Schlüsselloch');

            }
            else if( entity.name === 'Kaugummi-Ex' ){

                ig.game.getPlayer().speak('Der Kaugummi-Ex konnte das Schloss frei machen.');

                ig.game.inventory.removeInventoryItem( entity );

                this.state = 'ungummy';

            }
            else {

                ig.game.getPlayer().speak('... Berschauer.');

            }

        }
		
	});

});