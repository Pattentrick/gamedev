ig.module(
    'game.ui.inventory'
)
.requires(
    'plusplus.core.config'
)
.defines(function() {

    "use strict";

    var _c = ig.CONFIG;

    /**
     * Inventory of the player. Part of the UI.
     *
     * @class
     * @extends ig.Class
     * @memeberof ig
     */
    ig.Inventory = ig.Class.extend({

        numberOfItems: 0,

        slots: {

            firstSlot: {
                x: 177,
                y: 163
            },

            secondSlot: {
                x: 209,
                y: 163
            },

            thirdSlot: {
                x: 241,
                y: 163
            },

            fourthSlot: {
                x: 273,
                y: 163
            }

        },

        /**
         * Adds an item to the inventory.
         *
         * @param {object} inventoryItem Entity to add to the inventory
         * @param {object} worldItem Matching entity in the game world
         *
         */
        addItem: function( inventoryItem, worldItem ){

            this.removeWorldItem( worldItem );
            this.incrementNumberOfItems();

            switch( this.numberOfItems ){
                case 1:
                    ig.game.spawnEntity( inventoryItem, this.slots.firstSlot.x, this.slots.firstSlot.y);
                break;
            }

        },

        /**
         * Removes an item from the game world.
         *
         * @param {object} worldItem Matching entity in the game world
         */
        removeWorldItem: function( worldItem ){

            ig.game.removeEntity( worldItem );

        },

        /**
         * Increments nuber of items by 1
         */
        incrementNumberOfItems: function(){

            this.numberOfItems += 1;

        }

    });

});