ig.module(
    'game.entities.player'
)
.requires(
    'plusplus.abstractities.player',
    'game.entities.text-output',
    'plusplus.core.config'
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

        facing : {
            x: 0,
            y: 1
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

        /**
         * Displays text in a small bubble above the players head.
         */
        speak: function( text ){

            this.bubble = ig.game.spawnEntity( ig.EntityTextOutput, 40, 40 );

            /*            this.bubble.pos.x = 200;
             this.bubble.pos.y = 150;*/

            //this.bubble.moveTo( ig.game.getPlayer() );

            this.bubble.textSettings.text = 'Monsterkill';

        }

	});

});