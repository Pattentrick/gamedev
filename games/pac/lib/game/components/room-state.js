ig.module(
    'game.components.room-state'
)
.requires(
    'plusplus.core.config',
    'game.entities.item-lemon',
    'game.entities.item-block',
    'game.entities.item-bottle',
    'game.entities.item-wrench'
)
.defines(function() {

    "use strict";

    var _c = ig.CONFIG;

    /**
     * Keeps track of the current state of room and
     * recreates this state on revisiting the room.
     *
     * @class
     * @extends ig.Class
     * @memeberof ig
     */
    ig.RoomState = ig.Class.extend({

        lemon: {
            class: ig.EntityItemLemon,
            isPickedUp: false
        },

        block: {
            class: ig.EntityItemBlock,
            isPickedUp: false
        },

        bottle: {
            class: ig.EntityItemBottle,
            isPickedUp: false
        },

        wrench: {
            class: ig.EntityItemWrench,
            isPickedUp: false
        },

        /**
         * Creates the current game state
         * based of the item properties.
         */
        createState: function(){

            var currentLevel = ig.game.currentLevel;

            // On bedromm
            if( currentLevel === 'bedroom' ){

                if( !this.bottle.isPickedUp ){

                    ig.game.spawnEntity( this.bottle.class, 180, 103 );

                }

            }

            // On kitchen
            if( currentLevel === 'kitchen' ){

                if( !this.lemon.isPickedUp ){

                    ig.game.spawnEntity( this.lemon.class, 182, 78 );

                }

            }

            // On Junkroom
            if( currentLevel === 'junkroom' ){

                if( !this.wrench.isPickedUp ){

                    ig.game.spawnEntity( this.wrench.class, 149, 69 );

                }

            }

        }

    });

});