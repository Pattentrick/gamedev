ig.module(
    'game.entities.enemy-popcorn-fodder'
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
     * Popcorn enemy that is easy to defeat. Will try to collide with the player.
     *
     * @class
     * @extends ig.EntityExtended
     * @memeberof ig
     */
    ig.EntityEnemyPopcornFodder = ig.global.EntityEnemyPopcornFodder = ig.EntityEnemy.extend({

        size: {
            x: 20,
            y: 14
        },

        canFlipX: false,

        animSheet: new ig.AnimationSheet( _c.PATH_TO_MEDIA + 'enemy-popcorn-fodder.gif', 20, 14 ),

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

           if( !this.isWaiting ){

/*               this.moveToLeft();
               this.moveToDown();*/


           }

        }

    });

});