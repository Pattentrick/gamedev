ig.module(
    'game.entities.projectile-enemy-bullet'
)
.requires(
    'plusplus.abstractities.projectile'
)
.defines(function () {

    'use strict';

    var _c = ig.CONFIG;
    var _ut = ig.utils;

    /**
     * Basic projectile that is used by enemys of all sorts.
     */
    ig.EntityProjectileEnemyBullet = ig.global.EntityProjectileEnemyBullet = ig.Projectile.extend({

        performance: 'dynamic',

        size: {
            x: 6,
            y: 6
        },

        // plasma hurts
        damage: 1,

        // lasers eventually fade (like a particle)
        lifeDuration: 30,

        friction: {
            x:0,
            y:0
        },

        maxVel: {
            x: 200,
            y: 200
        },

        bounciness: 0,

        /**
         * In which direction should the projectile fly?
         *
         * Possible Values:
         *
         * - up
         * - upLeft
         * - left
         * - downLeft
         * - down
         *
         * @type String
         *
         */
        movementDirection: 'left',

        isFired: false,

        animSheet: new ig.AnimationSheet( _c.PATH_TO_MEDIA + 'enemy-bullet.gif', 6, 6),

        animSettings: {
            idle: {
                frameTime: 0.1,
                sequence: [0,1,2,3,4,5]
            }
        },

        initTypes: function() {

            _ut.addType(ig.EntityExtended, this, 'checkAgainst', "PLAYER");

        },

        update: function(){

            this.parent();

            if( !this.isFired ){

                switch( this.movementDirection ){
                    case 'up':

                        this.vel = {
                            x: 0,
                            y: -20
                        };

                    break;
                    case 'upRight':
                    break;
                    case 'right':
                    break;
                    case 'downRight':

                    break;
                    case 'down':

                        this.vel = {
                            x: 0,
                            y: 40
                        };

                    break;
                    case 'downLeft':

                        this.vel = {
                            x: -80,
                            y: 65
                        };

                    break;
                    case 'left':

                        this.vel = {
                            x: -80,
                            y: 0
                        };

                    break;
                    case 'upLeft':

                        this.vel = {
                            x: -80,
                            y: -65
                        };

                    break;
                }

                this.isFired = true;

            }

        }

    });

});