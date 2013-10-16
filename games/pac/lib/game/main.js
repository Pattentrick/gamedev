// starting with Impact++ is simple!
// setup a main game file, such as 'game/main.js'
// that you load right after ImpactJS
// and inside this file...
// setup the main module
ig.module(
    'game.main'
)
// now require the appropriate files
.requires(
	// the following are the only files required to use Impact++
    'plusplus.core.plusplus',
    // levels
    'game.levels.test'
)
// define the main module
.defines(function () {

    "use strict";

    // declare config variable
    var _c = ig.CONFIG;

	// have your game class extend Impact++'s game class
	var pac = ig.GameExtended.extend({

        // background color of canvas
        clearColor: "#000000",

		// override the game init function
		init: function () {

			this.parent();

		    // load level
            this.loadLevel(ig.global.LevelTest);

		},

        /**
         * Centers camera on gamescreen when
         * the game runs in fullscreen mode
         */
        centerStaticCamera : function(){

            // reset screen position for
            // proper positioning on resize
            ig.game.screen.x = 0;
            ig.game.screen.y = 0;

            // calculate new screen position
            ig.game.screen.x -= ( ig.system.realWidth / 2 ) / ig.system.scale - ( _c.GAME_WIDTH_VIEW / 2 );
            ig.game.screen.y -= ( ig.system.realHeight / 2 ) / ig.system.scale - ( _c.GAME_HEIGHT_VIEW / 2 );

        },

        resize : function(){

            this.parent();

            // check for game instance
            if( ig.game !== null ){

                // center camera on gamescreen
                this.centerStaticCamera();

            }

        }

	});
	
	// now lets boot up impact with
	// our game and config settings
	// we've modified Impact++'s 'config-user.js' file
	// to override some of the default settings
	ig.main(
		'#canvas',
		pac,
		60,
		_c.GAME_WIDTH,
		_c.GAME_HEIGHT,
		_c.SCALE,
		ig.LoaderExtended
	);
	
});
