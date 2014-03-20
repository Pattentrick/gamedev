ig.module(
    'game.entities.enemy-explosion'
)
.requires(
    'plusplus.core.entity',
    'plusplus.core.config'
)
.defines(function () {

    'use strict';

    var _c  = ig.CONFIG;

    /**
     * Represents a explosion that will be spawned after the death of an enemy.
     *
     * @class
     * @extends ig.EntityExtended
     * @memeberof ig
     */
    ig.EntityEnemyExplosion = ig.global.EntityEnemyExplosion = ig.EntityExtended.extend({

        size: {
            x: 16,
            y: 16
        },

        animSheet: new ig.AnimationSheet( _c.PATH_TO_MEDIA + 'enemy-explosion.gif', 16, 16 ),

        animSettings: {
            idle: {
                frameTime: 0.1,
                sequence: [0,1,2,3],
                once: true
            }
        },

        update: function(){

            this.parent();

            // Kill this explosion entity once the animation is complete
            if( this.currentAnim.loopCount > 0 ){

               this.kill();

            }

        }

    });

});