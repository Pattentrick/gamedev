ig.module(
    'game.entities.enemy'
)
.requires(
    'plusplus.core.entity',
    'plusplus.abstractities.character',
    'plusplus.core.config',
    'game.entities.enemy-explosion',
    'game.entities.particle-enemy-explosion'
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

        size: {
            x: 16,
            y: 16
        },

        health: 1,

        damage: 1,

        animSheet: new ig.AnimationSheet( _c.PATH_TO_MEDIA + 'enemy.gif', 16, 16 ),

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
            spawningEntity: ig.EntityParticleEnemyExplosion,
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

        /**
         * Number of explosion entitys that will be spawned. Minimum value is 1.
         *
         * @type Number
         *
         */
        numberOfExplosions: 3,

        initTypes: function() {

            this.parent();

            _ut.addType(ig.EntityExtended, this, 'checkAgainst', "PLAYER");
            _ut.addType(ig.EntityExtended, this, 'type', "DAMAGEABLE");

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

        check: function( entity ) {

            // Kill player on collison if he is not invulnerable
            if( !entity.invulnerable ){

                entity.receiveDamage(this.damage, this, this.damageUnblockable);

            }

        },

        die: function(){

            this.parent();

            // Critical hit!
            if( !ig.game.camera.shaking ){

                // bring da roof down
                ig.game.camera.shake(2,2);

                // spawn 5 explosions
                ig.game.spawnEntity( ig.EntityEnemyExplosion, this.getCenterX() -8, this.getCenterY() -8 );
                ig.game.spawnEntity( ig.EntityEnemyExplosion, this.getCenterX(), this.getCenterY() );
                ig.game.spawnEntity( ig.EntityEnemyExplosion, this.getCenterX() - 16, this.getCenterY() );
                ig.game.spawnEntity( ig.EntityEnemyExplosion, this.getCenterX() -16, this.getCenterY() -16 );
                ig.game.spawnEntity( ig.EntityEnemyExplosion, this.getCenterX(), this.getCenterY() -16 );

            }
            else {

                // Spawn explosions
                for( var i = 0, len = this.getRandomNumber(1,3); i < len; i++ ){

                    switch( i ){
                        // center
                        case 0:
                            ig.game.spawnEntity( ig.EntityEnemyExplosion, this.getCenterX() -8, this.getCenterY() -8 );
                            break;
                        // down right
                        case 1:
                            ig.game.spawnEntity( ig.EntityEnemyExplosion, this.getCenterX(), this.getCenterY() );
                            break;
                        // down left
                        case 2:
                            ig.game.spawnEntity( ig.EntityEnemyExplosion, this.getCenterX() - 16, this.getCenterY() );
                            break;
                        // up left
                        case 3:
                            ig.game.spawnEntity( ig.EntityEnemyExplosion, this.getCenterX() -16, this.getCenterY() -16 );
                            break;
                        // up right
                        case 4:
                            ig.game.spawnEntity( ig.EntityEnemyExplosion, this.getCenterX(), this.getCenterY() -16 );
                            break;
                    }

                }

            }

        }

    });

});