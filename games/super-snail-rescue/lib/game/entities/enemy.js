ig.module(
    'game.entities.enemy'
)
.requires(
    'plusplus.core.entity',
    'plusplus.abstractities.character',
    'plusplus.core.config',
    'game.entities.small-explosion',
    'game.entities.particle-small-explosion',
    'plusplus.entities.destructable'
)
.defines(function () {

    'use strict';

    var _c  = ig.CONFIG;
    var _ut = ig.utils;

    /**
     * Enemy base class from which all other normal enemys inherit.
     *
     * @class
     * @extends ig.EntityExtended
     * @memeberof ig
     */
    ig.EntityEnemy = ig.global.EntityEnemy = ig.Character.extend({

        performance: 'dynamic',

        /**
         * If this enemy is still waiting for the player.
         *
         * @type {Boolean} True as long is the player is far away.
         *
         */
        isWaiting: true,

        /**
         * True as long as this enemy waits.
         *
         * @type {Boolean} True on high performance.
         *
         */
        highPerformance: true,

        size: {
            x: 16,
            y: 16
        },

        health: 1,

        damage: 1,

        animSettings: {
            idle: {
                frameTime: 1,
                sequence: [0]
            }
        },

        maxVelGrounded: {
            x: 20,
            y: 20
        },

        deathSettings: {
            spawnCountMax: 20,
            spawningEntity: ig.EntityParticleSmallExplosion,
            spawnSettings: {
                vel: {
                    x: 200,
                    y: 200
                },
                lifeDuration: 0.8,
                // fade in after spawning
                fadeAfterSpawnDuration: 0.4,
                // fade out before dieing
                fadeBeforeDeathDuration: 0.4
            }
        },

        initTypes: function() {

            this.parent();

            _ut.addType(ig.EntityExtended, this, 'checkAgainst', "PLAYER");
            _ut.addType(ig.EntityExtended, this, 'type', "FOE");

        },

        initProperties: function(){

            this.parent();

            // Soundeffects

            this.explosion = new ig.Sound( 'media/sounds/explosion.*' );
            this.explosion.volume = 0.7;

        },

        handleWaiting: function(){

            var border = ig.game.getEntityByName('movementBorderRight');

            if( this.isWaiting ){

                if( this.distanceEdgeTo( border ) < 150 ){

                    this.isWaiting = false;

                    // Disable high performance

                    this.highPerformance = false;

                }

            }

        },

        /**
         * Gets the difference between two numbers.
         *
         * @param a {Number} The first number
         * @param b {Number} The second number
         *
         */
        getDifference: function( a, b ){

            return Math.abs( a - b );

        },

        /**
         * Returns a random number between min and max.
         *
         * @param {number} min The min number
         * @param {number} max The max number
         * @returns {number} A random number
         *
         */
        getRandomNumber: function(min, max){

            var diff = max - min + 1;
            var r    = Math.random()*diff;

            r = Math.floor( r );
            r = r + min;

            return r;

        },

        updateChanges: function(){

            this.parent();

            this.handleWaiting();

        },

        /**
         *  This completely ignores the trace result (res)
         *  and always moves the entity according to its velocity
         */
        handleMovementTrace: function( res ) {

            this.pos.x += this.vel.x * ig.system.tick;
            this.pos.y += this.vel.y * ig.system.tick;

        },

        check: function( entity ) {

            // Kill player on collison if he is not invulnerable

            if( !entity.invulnerable ){

                entity.receiveDamage(this.damage, this, this.damageUnblockable);

            }

        },

        /**
         * Spawns explosion entities. If the camera doesn't shake, this will trigger
         * a critical explosion with 8 explosion entities + a nice camera shake.
         *
         * If the camera already shakes (active crit) it will spawn a random number
         * of explosions between 1 and 5. All explosions are triggered after a slight
         * delay that is randomized. This delay can be deactivated via the hasDelay
         * property of the explosion.
         *
         */
        spawnCustomExplosions: function(){

            // Boom!

            this.explosion.play();

            // Critical hit!

            if( !ig.game.camera.shaking ){

                // bring da roof down

                ig.game.camera.shake(2,3);

                // Center

                ig.game.spawnEntity( ig.EntitySmallExplosion, this.getCenterX() -8, this.getCenterY() -8, {
                    hasDelay: false
                });

                // down right

                ig.game.spawnEntity( ig.EntitySmallExplosion, this.getCenterX() -2, this.getCenterY() );

                // down left

                ig.game.spawnEntity( ig.EntitySmallExplosion, this.getCenterX() - 10, this.getCenterY() + 4 );

                // up left

                ig.game.spawnEntity( ig.EntitySmallExplosion, this.getCenterX() -12, this.getCenterY() -14 );

                // up right

                ig.game.spawnEntity( ig.EntitySmallExplosion, this.getCenterX() + 2, this.getCenterY() -12 );

                // Extra critical explosions

                ig.game.spawnEntity( ig.EntitySmallExplosion, this.getCenterX() -16, this.getCenterY() -8);
                ig.game.spawnEntity( ig.EntitySmallExplosion, this.getCenterX(), this.getCenterY() -8);
                ig.game.spawnEntity( ig.EntitySmallExplosion, this.getCenterX() - 14, this.getCenterY() + 4 );

                // More!

                ig.game.spawnEntity( ig.EntitySmallExplosion, this.getCenterX() -16, this.getCenterY() -11);
                ig.game.spawnEntity( ig.EntitySmallExplosion, this.getCenterX() + 3, this.getCenterY() -8);
                ig.game.spawnEntity( ig.EntitySmallExplosion, this.getCenterX() - 14, this.getCenterY() + 5 );

            }
            else {

                // Spawn explosions

                for( var i = 0, len = this.getRandomNumber(1,5); i < len; i++ ){

                    switch( i ){
                        // center
                        case 0:
                            ig.game.spawnEntity( ig.EntitySmallExplosion, this.getCenterX() -8, this.getCenterY() -8, {
                                hasDelay: false
                            });
                            break;
                        // down right
                        case 1:
                            ig.game.spawnEntity( ig.EntitySmallExplosion, this.getCenterX() -2, this.getCenterY() );
                            break;
                        // down left
                        case 2:
                            ig.game.spawnEntity( ig.EntitySmallExplosion, this.getCenterX() - 10, this.getCenterY() + 4 );
                            break;
                        // up left
                        case 3:
                            ig.game.spawnEntity( ig.EntitySmallExplosion, this.getCenterX() -12, this.getCenterY() -14 );
                            break;
                        // up right
                        case 4:
                            ig.game.spawnEntity( ig.EntitySmallExplosion, this.getCenterX() + 2, this.getCenterY() -12 );
                            break;
                    }

                }

            }

        },

        /**
         * Spawns the "destructable entity" and kills it immediately after that.
         */
        spawnDebris: function(){

            var destructable = ig.game.spawnEntity(ig.EntityDestructable, this.getCenterX(), this.getCenterY(), {
                spawnCountMax: 6,
                spawnSettings: {
                    vel: {
                        x: 60,
                        y: 60
                    },
                    lifeDuration: 10,
                    // fade in after spawning
                    fadeAfterSpawnDuration: 0,
                    // fade out before dieing
                    fadeBeforeDeathDuration: 0.5,
                    friction: {
                        x: 0,
                        y: 0
                    }
                }
            });

            destructable.activate();

        },

        die: function(){

            this.parent();

            this.spawnDebris();
            this.spawnCustomExplosions();

        }

    });

});