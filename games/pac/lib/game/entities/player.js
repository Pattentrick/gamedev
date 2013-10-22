/** 
 * Players might need some basic functionality
 * like input handling, camera following, etc
 * to take advantage of these extend ig.Player
 */
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
	var _ut = ig.utils;
	
    ig.EntityPlayer = ig.global.EntityPlayer = ig.Player.extend({
		
		size: {
            x:8,
            y: 8
        },

		offset: {
            x:4,
            y: 4
        },
		
		// animations the Impact++ way
		// note that these animations are for
		// both side scrolling and top down mode
		// you will likely only need one or the other
		// so your animSettings will be much simpler
		
		animSheet: new ig.AnimationSheet( _c.PATH_TO_MEDIA + 'player.png', 16, 16 ),	
		
		animInit: 'moveX',
		
		// for example, a sidescroller's animSettings
		// will only use idleX, jumpX, fallX, moveX, shootX, and deathX
		// while a top down where entities can flip on X and Y
		// will use idleX/Y, moveX/Y, shootX/Y, and deathX/Y
		// but if the entities CANNOT flip on X and Y
		// will use idleLeft/Right/Up/Down, moveLeft/Right/Up/Down,
		// shootLeft/Right/Up/Down, and deathLeft/Right/Up/Down
		
		animSettings: {
			idleX: {
				frameTime: 1,
				sequence: [21]
			},
			idleLeft: {
				frameTime: 1,
				sequence: [18]
			},
			idleRight: {
				frameTime: 1,
				sequence: [21]
			},
			idleY: {
				frameTime: 1,
				sequence: [12]
			},
			idleUp: {
				frameTime: 1,
				sequence: [15]
			},
			idleDown: {
				frameTime: 1,
				sequence: [12]
			},
			jumpX: {
				frameTime: 0.1, 
				sequence: [8,9]
			},
			fallX: {
				frameTime: 0.4, 
				sequence: [6,7]
			},
			moveX: {
				frameTime: 0.07, 
				sequence: [21,22,23,22]
			},
			moveLeft: {
				frameTime: 0.07, 
				sequence: [18,19,20,19]
			},
			moveRight: {
				frameTime: 0.07, 
				sequence: [21,22,23,22]
			},
			moveY: {
				frameTime: 0.07, 
				sequence: [12,13,14,13]
			},
			moveDown: {
				frameTime: 0.07, 
				sequence: [12,13,14,13]
			},
			moveUp: {
				frameTime: 0.07, 
				sequence: [15,16,17,16]
			},
			shootX: {
				frameTime: 0.25, 
				sequence: [26]
			},
			shootRight: {
				frameTime: 0.25, 
				sequence: [26]
			},
			shootLeft: {
				frameTime: 0.25, 
				sequence: [27]
			},
			shootY: {
				frameTime: 0.25, 
				sequence: [24]
			},
			shootDown: {
				frameTime: 0.25, 
				sequence: [24]
			},
			shootUp: {
				frameTime: 0.25, 
				sequence: [25]
			},
			deathX: {
				frameTime: 0.1, 
				sequence: [29]
			},
			deathLeft: {
				frameTime: 0.1, 
				sequence: [29]
			},
			deathRight: {
				frameTime: 0.1, 
				sequence: [29]
			},
			deathY: {
				frameTime: 0.1, 
				sequence: [28]
			},
			deathDown: {
				frameTime: 0.1, 
				sequence: [28]
			},
			deathUp: {
				frameTime: 0.1, 
				sequence: [28]
			}
		},

        /**
         * handles what to do on mouse
         * input by player
         */
        handleInput : function(){

            if ( ig.input.pressed('click') ) {

                this.moveTo({
                    x: ig.input.mouse.x + ig.game.screen.x,
                    y: ig.input.mouse.y + ig.game.screen.y
                });

            }

        }
		
	});

});