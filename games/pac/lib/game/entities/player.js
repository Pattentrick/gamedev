ig.module(
    'game.entities.player'
)
.requires(
    'plusplus.abstractities.player',
    'plusplus.core.config',
	'plusplus.helpers.utils'
)
.defines(function () {
	
	var _c  = ig.CONFIG;
	
    ig.EntityPlayer = ig.global.EntityPlayer = ig.Player.extend({
		
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
         * handles what to do on mouse
         * input by player
         */
        handleInput: function(){

            if ( ig.input.pressed('click') ) {

                this.moveTo({
                    x: ig.input.mouse.x + ig.game.screen.x,
                    y: ig.input.mouse.y + ig.game.screen.y
                });

            }

        }
		
	});

});