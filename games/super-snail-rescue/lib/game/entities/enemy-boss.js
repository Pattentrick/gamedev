ig.module(
    'game.entities.enemy-boss'
)
.requires(
    'plusplus.abstractities.character',
    'plusplus.entities.destructable',
    'game.entities.big-explosion',
    'plusplus.core.config'
)
.defines(function () {

    var _c  = ig.CONFIG;
    var _ut = ig.utils;

    /**
     * The final boss of the game.
     *
     * @class
     * @extends ig.Character
     * @memeberof ig
     */
    ig.EntityEnemyBoss = ig.global.EntityEnemyBoss = ig.Character.extend({

        performance: 'dynamic',

        health: 1,

        damage: 1,

        explodingDamage: false,

        damageDelay: 1.5,

        temporaryInvulnerabilityAlpha: 0,

        temporaryInvulnerabilityPulses: 15,

        /**
         * Position of the top stop on the y-axis (needed for the movement pattern).
         *
         * @type Number
         *
         */
        topStop: 40,

        /**
         * Position of the middle stop on the y-axis (needed for the movement pattern).
         *
         * @type Number
         *
         */
        middleStop: 100,

        /**
         * Position of the bottom stop on the y-axis (needed for the movement pattern).
         *
         * @type Number
         *
         */
        bottomStop: 160,

        deathSettings: {
            spawnCountMax: 200,
            spawningEntity: ig.EntityParticleSmallExplosion,
            spawnSettings: {
                vel: {
                    x: 95,
                    y: 95
                },
                lifeDuration: 0.8,
                // fade in after spawning
                fadeAfterSpawnDuration: 0.4,
                // fade out before dieing
                fadeBeforeDeathDuration: 0.4
            }
        },

        size: {
            x: 22,
            y: 16
        },

        offset: {
            x: 0,
            y: 32
        },

        maxVelGrounded: {
            x: 20,
            y: 20
        },

        animSheet: new ig.AnimationSheet( _c.PATH_TO_MEDIA + 'enemy-boss.gif', 81, 80 ),

        animSettings: {
            idle: {
                frameTime: 1,
                sequence: [0]
            },
            damaged: {
                frameTime: 0.05,
                sequence: [1]
            }
        },

        initProperties: function(){

            this.parent();

            // Soundeffects

            this.explosion = new ig.Sound( 'media/sounds/explosion.*' );
            this.explosion.volume = 0.2;

        },

        initTypes: function() {

            this.parent();

            _ut.addType(ig.EntityExtended, this, 'checkAgainst', "PLAYER");
            _ut.addType(ig.EntityExtended, this, 'type', "FOE");

        },

        check: function( entity ) {

            // Kill player on collison if he is not invulnerable

            if( !entity.invulnerable ){

                entity.receiveDamage(this.damage, this, this.damageUnblockable);

            }

        },

        /**
         * Override this for special damaged animation (flickering).
         */
        receiveDamage: function( amount, from, unblockable ){

            this.parent( amount, from, unblockable );

            if( !this.invulnerable ){

                this.animOverride('damaged');

            }

        },

        /**
         * Creates particle explosion.
         * @param {Object} [settings] settings object for an {@link ig.EntityExplosion}.
         **/
        explode: function(settings) {

            ig.game.spawnEntity(ig.EntityExplosion, this.getCenterX() + 35, this.getCenterY(), ig.merge({
                size: {
                    x: this.size.x,
                    y: this.size.y
                }
            }, settings || this.damageSettings));

        },

        die: function(){

            this.parent();

            // Explosions

            // Boom!

            this.explosion.play();

            // bring da roof down

            ig.game.camera.shake(2,25);

            // Center

            ig.game.spawnEntity( ig.EntityBigExplosion, this.getCenterX() -8 + 35, this.getCenterY() -8, {
                hasDelay: false
            });

            // down right

            ig.game.spawnEntity( ig.EntityBigExplosion, this.getCenterX() -2 + 35, this.getCenterY() );

            // down left

            ig.game.spawnEntity( ig.EntityBigExplosion, this.getCenterX() - 10 + 35, this.getCenterY() + 5 );

            // up left

            ig.game.spawnEntity( ig.EntityBigExplosion, this.getCenterX() -12 + 35, this.getCenterY() -25 );

            // up right

            ig.game.spawnEntity( ig.EntityBigExplosion, this.getCenterX() + 2 + 35, this.getCenterY() -15 );

            // Extra critical explosions

            ig.game.spawnEntity( ig.EntityBigExplosion, this.getCenterX() -16 + 35, this.getCenterY());
            ig.game.spawnEntity( ig.EntityBigExplosion, this.getCenterX(), this.getCenterY() -30);
            ig.game.spawnEntity( ig.EntityBigExplosion, this.getCenterX() - 14  + 35, this.getCenterY() + 35 );

            // More!

            ig.game.spawnEntity( ig.EntityBigExplosion, this.getCenterX(), this.getCenterY());
            ig.game.spawnEntity( ig.EntityBigExplosion, this.getCenterX(), this.getCenterY() + 10);
            ig.game.spawnEntity( ig.EntityBigExplosion, this.getCenterX(), this.getCenterY() - 10 );

            // Debris

            var destructable = ig.game.spawnEntity(ig.EntityDestructable, this.getCenterX() + 35, this.getCenterY(), {
                spawnCountMax: 60,
                spawnSettings: {
                    animSheet: new ig.AnimationSheet(_c.PATH_TO_MEDIA + 'enemy-debris.gif', 4, 4),
                    vel: {
                        x: 60,
                        y: 60
                    },
                    lifeDuration: 5,
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

        handleMovement: function(){

        },

        update: function(){

            this.parent();

            this.handleMovement();

        }

    });

});