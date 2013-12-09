ig.module(
    'game.entities.player'
)
.requires(
    'plusplus.abstractities.player',
    'game.entities.text-output',
    'plusplus.core.config',
    'plusplus.core.timer',
    'plusplus.entities.conversation'
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

        name: 'player',

        collides: ig.Entity.COLLIDES.ACTIVE,

		size: {
            x: 8,
            y: 8
        },

		offset: {
            x: 3,
            y: 20
        },

        temporaryInvulnerabilityAlpha: 1,
		
		animSheet: new ig.AnimationSheet( _c.PATH_TO_MEDIA + 'player.png', 14, 30 ),

		animSettings: {
            idleX: {
                frameTime: 1,
                sequence: [0]
            },
			idleDown : {
				frameTime: 1,
				sequence: [6]
			},
            idleUp: {
                frameTime: 1,
                sequence: [12]
            },
			moveX: {
				frameTime: 0.10,
				sequence: [0,1,2,3,4,5]
			},
            moveDown: {
                frameTime: 0.10,
                sequence: [6,7,8,9,10,11]
            },
			moveUp: {
				frameTime: 0.10,
				sequence: [12,13,14,15,16,17]
			}
		},

        // Lifespan of the textbox (lifespan = number of chars * textspeed )
        textspeed: 0.08,

        init: function( x, y, settings){

            this.parent( x, y, settings);

/*            var foo = ig.game.spawnEntity( ig.EntityTextOutput, 40, 40, {

                textSettings: {

                    text: 'Lorem ipsum dolor',
                    font: new ig.Font( _c.PATH_TO_MEDIA + 'monologue_font_10px.png' )
                    //font: new ig.Font( _c.PATH_TO_MEDIA + 'command_preview_font.png' )

                }

            });

            foo.pos = {
                x: 300,
                y: 100
            }*/


        },

        /**
         * Displays text in a small bubble
         *
         * @param {string} text Text that will be displayed
         */
        speak: function( text ){

            // remove any existing monologue boxes before spawning a new one
            this.removeExistingMonologue();

            this.textbox = ig.game.spawnEntity( ig.EntityTextOutput, 40, 40, {

                textSettings: {

                    text: text,
                    font: new ig.Font( _c.PATH_TO_MEDIA + 'monologue_font_10px.png' )
                    //font: new ig.Font( _c.PATH_TO_MEDIA + 'command_preview_font.png' )

                }

            });

            this.setMonologueTimer( text.length * this.textspeed );

        },

        /**
         * Sets a timer for the textbox to a specific duration
         *
         * @param {number} duration Duration of the textbox display
         */
        setMonologueTimer: function( duration ){

            this.timer = new ig.Timer( duration );

        },

        /**
         * Checks if there is an existing monologue.
         * Calls handleMonologueEnd if that case is true.
         */
        checkForMonologue: function(){

            if( ig.game.getEntitiesByClass( ig.EntityTextOutput ).length > 0 ){

                this.handleMonologueEnd();

            }

        },

        /**
         * Removes the textbox from the game after
         * the duration specified with setMonologueTimer
         * and resets the timer.
         */
        handleMonologueEnd: function(){

            if( this.timer ){

                if( this.timer.delta() > 0 ){

                    ig.game.removeEntity( this.textbox );

                    this.timer.reset();

                }

            }

        },

        /**
         * Removes a existing textbox, if there is one.
         */
        removeExistingMonologue: function(){

            if( ig.game.getEntitiesByClass(ig.EntityTextOutput).length > 0 ){

                ig.game.removeEntity( this.textbox );

                this.timer.reset();

            }

        },

        update: function(){

            this.parent();

            this.checkForMonologue();

        }

	});

});