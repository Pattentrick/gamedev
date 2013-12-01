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

        slots: [

            // first slot
            { x: 177, y: 163 },

            // second slot
            { x: 209, y: 163 },

            // third slot
            { x: 241, y: 163 },

            // fourth slot
            { x: 273, y: 163 }

        ],

        // List of all current instances of items in the inventory
        inventoryItems: [],

        /**
         * Adds an item to the inventory.
         *
         * @param {object} inventoryItem Entity to add to the inventory
         * @param {object} worldItem Matching entity in the game world
         *
         */
        addItem: function( inventoryItem, worldItem ){

            this.removeWorldItem( worldItem );

            ig.game.spawnEntity( inventoryItem, this.slots[ this.numberOfItems ].x, this.slots[ this.numberOfItems ].y );

            this.incrementNumberOfItems();
            this.inventoryItems.push( inventoryItem );

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
         * Removes an item from the inventory
         *
         * @param {object} inventoryItem Entity to remove from inventory
         */
        removeInventoryItem: function( inventoryItem ){

            ig.game.removeEntity( inventoryItem );

        },

        /**
         * Increments nuber of items by 1
         */
        incrementNumberOfItems: function(){

            this.numberOfItems += 1;

        },

        /**
         * Respawns all inventory items on room switch.
         */
        respawnInventoryItems: function(){

            if( this.inventoryItems.length > 0 ){

                for( var i = 0, len = this.inventoryItems.length; i < len; i++ ){

                    ig.game.spawnEntity( this.inventoryItems[i], this.slots[i].x, this.slots[i].y );

                }

            }

        }

    });

});