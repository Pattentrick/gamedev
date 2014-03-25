ig.module(
    'game.entities.enemy-popcorn-spinner'
)
.requires(
    'plusplus.core.config',
    'game.entities.enemy'
)
.defines(function () {

    'use strict';

    var _c  = ig.CONFIG;
    var _ut = ig.utils;

    /**
     * Popcorn enemy that is easy to defeat. Will fly through the
     * level and spawn a projectile if it's near enough to the player.
     *
     * @class
     * @extends ig.EntityExtended
     * @memeberof ig
     */
    ig.EntityEnemyPopcornSpinner = ig.global.EntityEnemyPopcornSpinner = ig.EntityEnemy.extend({

        size: {
            x: 17,
            y: 16
        },

        animSheet: new ig.AnimationSheet( _c.PATH_TO_MEDIA + 'enemy-popcorn-spinner.gif', 17, 16 ),

        animSettings: {
            idle: {
                frameTime: 0.1,
                sequence: [0,1,2,3]
            }
        },

        maxVelGrounded: {
            x: 20,
            y: 20
        },

        updateChanges: function(){

            this.parent();

            this.moveToLeft();

        }

    });

});