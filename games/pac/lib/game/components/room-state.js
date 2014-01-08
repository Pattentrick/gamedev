ig.module(
    'game.components.room-state'
)
.requires(
    'plusplus.core.config',
    'game.entities.item-lemon',
    'game.entities.item-block',
    'game.entities.item-bottle'
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

        /**
         * Creates the current game state
         * based of the item properties.
         */
        createState: function(){

            var currentLevel = ig.game.currentLevel;

            // On room test
            if( currentLevel === 'test' ){

                if( !this.lemon.isPickedUp ){

                    ig.game.spawnEntity( this.lemon.class, 100, 108 );

                }

                if( !this.block.isPickedUp ){

                   ig.game.spawnEntity( this.block.class, 90, 110 );

                }

            }

            // On bedromm
            if( currentLevel === 'bedroom' ){

                if( !this.bottle.isPickedUp ){

                    ig.game.spawnEntity( this.bottle.class, 180, 103 );

                }

            }

        }

    });

});