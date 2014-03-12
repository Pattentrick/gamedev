ig.module(
    'game.entities.player'
)
.requires(
    'plusplus.abstractities.player',
    'plusplus.core.config',
    'plusplus.entities.conversation',
    'game.entities.particle-storm-horizontal',
    'game.entities.particle-color-liftoff'
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
            x: 32,
            y: 16
        },

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

        temporaryInvulnerabilityAlpha: 1,

        maxVelGrounded: {
            x: 50,
            y: 50
        },

        animInit: 'idle',

        animSheet: new ig.AnimationSheet( _c.PATH_TO_MEDIA + 'player.png', 32, 16 ),

        animSettings: {
            idle: {
                frameTime: 0.4,
                sequence: [0,1]
            },
            idleDown: {
                frameTime: 0.4,
                sequence: [0,1]
            },
            idleLeft: {
                frameTime: 0.4,
                sequence: [0,1]
            },
            idleRight: {
                frameTime: 0.4,
                sequence: [0,1]
            },
            idleUp: {
                frameTime: 0.4,
                sequence: [0,1]
            },
            moveDown: {
                frameTime: 0.4,
                sequence: [2,3]
            },
            moveUp: {
                frameTime: 0.4,
                sequence: [4,5]
            },
            moveLeft: {
                frameTime: 0.4,
                sequence: [0,1]
            },
            moveRight: {
                frameTime: 0.4,
                sequence: [0,1]
            }
        },

        animsExpected: [ 'idle', 'move' ],

        jetEngine: null,

        init: function(x, y, settings) {

            this.parent(x, y, settings);

            this.jetEngine = ig.game.spawnEntity(ig.EntityParticleStormHorizontal, this.pos.x, this.pos.y, {
                size: {
                    x: 1,
                    y: 5
                },
                spawnCountMax: 5,
                spawnSettings: {
                    vel: {
                        x: -50,
                        y: 0
                    },
                    animTileOffset: 8,
                    lifeDuration: 0.8
                },
                spawningEntity: ig.EntityParticleColorLiftoff
            });

        },

        handleInput: function(){

            //console.log(this.isTouchingBorderLeft);

            if ( ig.input.state('right') && !this.isTouchingBorderRight ) {

                this.maxVelGrounded.x = 100;

                this.moveToRight();


            }
            else if ( ig.input.state('left') && !this.isTouchingBorderLeft ) {

                this.maxVelGrounded.x = 25;

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

            if (ig.input.state('fire')) {

                // TODO: add fire mechanics

            }

        },

        updateVelocity: function(){

            this.parent();

            if( this.jetEngine ){

                this.jetEngine.pos = {
                    x: this.pos.x + 10,
                    y: this.pos.y + 5
                }

            }

        },

        updateChanges: function(){

            // Reset border flags
            this.isTouchingBorderTop = false;
            this.isTouchingBorderRight = false;
            this.isTouchingBorderBottom = false;
            this.isTouchingBorderLeft = false;

        }

    });

});