ig.module(
    'game.entities.enemy-elite-laser'
)
.requires(
    'plusplus.core.config',
    'game.entities.enemy',
    'game.entities.projectile-enemy-laser'
)
.defines(function () {

    'use strict';

    var _c  = ig.CONFIG;
    var _ut = ig.utils;

    /**
     * A static elite enemy that shoots lasers. Takes more than one hit to defeat.
     *
     * @class
     * @extends ig.EntityExtended
     * @memeberof ig
     */
    ig.EntityEnemyEliteLaser = ig.global.EntityEnemyEliteLaser = ig.EntityEnemy.extend({

        size: {
            x: 33,
            y: 13
        },

        health: 1,

        explodingDamage: false,

        /**
         * Whether this is the first time that the turret fires or not.
         *
         * @type Boolean
         */
        isFirstShot: true,

        /**
         * Delay in seconds between shots.
         *
         * @type Number
         */
        shootDelay: 3,

        /**
         * How far the player can move towards the turret before it shoots.
         */
        attackRange: 200,

        canFlipX: false,

        maxVelGrounded: {
            x: 5,
            y: 20
        },

        animSheet: new ig.AnimationSheet( _c.PATH_TO_MEDIA + 'enemy-elite-laser.png', 33, 13 ),

        animSettings: {
            idle: {
                frameTime: 0.1,
                sequence: [0,1]
            },
            damaged: {
                frameTime: 0.05,
                sequence: [2]
            }
        },

        initProperties: function(){

            this.parent();

            this.shootingTimer = new ig.Timer;

        },

        /**
         * Handles all things that are related to shooting a projectile towards a player.
         *
         * @param {Object} player A reference to the player
         *
         */
        handleShootMechanic: function( player ){

            // Is the player in shooting range?

            if( this.getDifference( player.pos.x, this.pos.x ) < this.attackRange ){

                if( this.isFirstShot || this.shootingTimer.delta() > this.shootDelay ){

                    ig.game.spawnEntity( ig.EntityProjectileEnemyLaser, this.pos.x - 30,  this.pos.y + 5, {
                        vel: {
                            x: -120,
                            y: 0
                        }
                    });

                    this.isFirstShot = false;
                    this.shootingTimer.reset();

                }

            }

        },

        receiveDamage: function( amount, from, unblockable ){

            this.parent( amount, from, unblockable );

            this.animOverride('damaged');

        },

        updateChanges: function(){

            var player = ig.game.getPlayer();

            this.parent();

            if( !this.isWaiting ){

                if( player ){

                    this.handleShootMechanic( player );
                    this.moveToLeft();

                }

            }

        }

    });

});