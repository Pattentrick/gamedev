ig.module(
    'game.entities.player'
)
.requires(
    'plusplus.abstractities.player',
    'plusplus.core.config',
    'game.entities.particle-storm-horizontal',
    'game.entities.particle-color-liftoff',
    'game.entities.particle-jetengine',
    'game.entities.particle-small-explosion',
    'game.abilities.plasma-gun',
    'game.entities.small-explosion'
)
.defines(function () {

    var _c  = ig.CONFIG;

    /**
     * Entity that represents a playable character
     *
     * @class
     * @extends ig.Player
     * @memeberof ig
     */
    ig.EntityPlayer = ig.global.EntityPlayer = ig.Player.extend({

        size: {
            x: 25,
            y: 10
        },

        offset: {
            x: 7,
            y: 3
        },

        health: 1,

        zIndex: 100,

        canFlipX: false,

        canFlipY: false,

        /**
         * True when the player touches the top border.
         *
         * @type Boolean
         */
        isTouchingBorderTop: false,

        /**
         * True when the player touches the right border.
         *
         * @type Boolean
         */
        isTouchingBorderRight: false,

        /**
         * True when the player touches the bottom border.
         *
         * @type Boolean
         */
        isTouchingBorderBottom: false,

        /**
         * True when the player touches the left border.
         *
         * @type Boolean
         */
        isTouchingBorderLeft: false,

        persistent: false,

        temporaryInvulnerabilityAlpha: 0,

        temporaryInvulnerabilityPulses: 20,

        maxVelGrounded: {
            x: 50,
            y: 50
        },

        animInit: 'idle',

        animSheet: new ig.AnimationSheet( _c.PATH_TO_MEDIA + 'player.png', 32, 16 ),

        animSettings: {
            idle: {
                frameTime: 0.1,
                sequence: [0,1]
            },
            idleDown: {
                frameTime: 0.1,
                sequence: [0,1]
            },
            idleLeft: {
                frameTime: 0.1,
                sequence: [0,1]
            },
            idleRight: {
                frameTime: 0.1,
                sequence: [0,1]
            },
            idleUp: {
                frameTime: 0.1,
                sequence: [0,1]
            },
            moveDown: {
                frameTime: 0.1,
                sequence: [2,3]
            },
            moveUp: {
                frameTime: 0.1,
                sequence: [4,5]
            },
            moveLeft: {
                frameTime: 0.1,
                sequence: [0,1]
            },
            moveRight: {
                frameTime: 0.1,
                sequence: [0,1]
            },
            shootDown: {
                frameTime: 0.1,
                sequence: [2,3]
            },
            shootUp: {
                frameTime: 0.1,
                sequence: [4,5]
            },
            shootLeft: {
                frameTime: 0.1,
                sequence: [0,1]
            },
            shootRight: {
                frameTime: 0.1,
                sequence: [0,1]
            }
        },

        deathSettings: {
            spawnCountMax: 30,
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

        jetEngine: null,

        initProperties: function() {

            this.parent();

            // Init the plasma gun

            this.shoot = new ig.PlasmaGun(this);

            // Init the shoot ability

            this.abilities.addDescendants([this.shoot]);

            // Spawn the jetengine

            this.spawnJetEngine();

        },

        /**
         * Spawns the jet engine of the player ship.
         */
        spawnJetEngine: function(){

            this.jetEngine = ig.game.spawnEntity(ig.EntityParticleStormHorizontal, this.pos.x + 1, this.pos.y + 2, {
                size: {
                    x: 1,
                    y: 5
                },
                spawnCountMax: 5,
                spawnSettings: {
                    vel: {
                        x: -150,
                        y: 0
                    },
                    lifeDuration: 0.3,
                    // fade in after spawning
                    fadeAfterSpawnDuration: 0.1,
                    // fade out before dieing
                    fadeBeforeDeathDuration: 0.1
                },
                spawningEntity: ig.EntityParticleJetengine
            });

        },

        handleInput: function(){

            var projectileOffsetY;

            // reset facing before handling input

            this.facing = {
                x: 0,
                y: 0
            };

            if ( ig.input.state('right') && !this.isTouchingBorderRight ) {

                this.maxVelGrounded.x = 100;

                this.moveToRight();


            }
            else if ( ig.input.state('left') && !this.isTouchingBorderLeft ) {

                this.maxVelGrounded.x = 0;

                this.moveToLeft();

            }
            else {

                this.maxVelGrounded.x = 50;

                // no input? move right!

                this.moveToRight();

            }

            if ( ig.input.state('up') && !this.isTouchingBorderTop ) {

                this.moveToUp();


            }
            else if ( ig.input.state('down') && !this.isTouchingBorderBottom ) {

                this.moveToDown();

            }

            if ( ig.input.pressed('shoot') ) {

                // determine offsetY value for proper projectile spawning point

                switch( this.facing.y ){
                    case 0:
                        projectileOffsetY = 3;
                    break;
                    case -1:
                        projectileOffsetY = -3;
                    break;
                    case 1:
                        projectileOffsetY = 2;
                    break;
                }

                this.shoot.activate({
                    offsetX: 11,
                    offsetY: projectileOffsetY
                });

            }

        },

        die: function(){

            this.parent();

            // bring da roof down

            ig.game.camera.shake(3,5);

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
            ig.game.spawnEntity( ig.EntitySmallExplosion, this.getCenterX() - 16, this.getCenterY() + 3 );
            ig.game.spawnEntity( ig.EntitySmallExplosion, this.getCenterX() - 16, this.getCenterY() - 4 );

            // Kill jet engine

            this.jetEngine.kill();

            // Inform player respawner that the player is dead

            ig.game.playerRespawner.hasDeadPlayer = true;

        },

        update: function(){

            this.parent();

            // Update jet engine position

            if( this.jetEngine ){

                this.jetEngine.pos = {
                    x: this.pos.x - 1,
                    y: this.pos.y + 2
                };

            }

            // Reset border flags

            this.isTouchingBorderTop = false;
            this.isTouchingBorderRight = false;
            this.isTouchingBorderBottom = false;
            this.isTouchingBorderLeft = false;

        }

    });

});