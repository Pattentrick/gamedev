ig.module(
    'game.main'
)
.requires(
	// include impact++
    'plusplus.core.plusplus',
    // enable debug
    // 'plusplus.debug.debug',
    // levels
    'game.levels.intro-scene-1',
    // loader
    'game.components.ssrloader'
)
// define the main module
.defines(function () {

    "use strict";

    // config variable
    var _c = ig.CONFIG;

    // Game instance
	var introScene1 = ig.GameExtended.extend({

        // Background color of canvas
        clearColor: "#000000",

		init: function () {

			this.parent();

		    // Load starting level
            this.loadLevelDeferred( 'intro-scene-1' );

		},

        /**
         * Centers camera on gamescreen when
         * the game runs in fullscreen mode
         */
        centerStaticCamera: function(){

            // Reset screen position for
            // proper positioning on resize
            ig.game.screen.x = 0;
            ig.game.screen.y = 0;

            // Calculate new screen position
            ig.game.screen.x -= ( ig.system.realWidth / 2 ) / ig.system.scale - ( _c.GAME_WIDTH_VIEW / 2 );
            ig.game.screen.y -= ( ig.system.realHeight / 2 ) / ig.system.scale - ( _c.GAME_HEIGHT_VIEW / 2 );

        },

        resize: function(){

            this.parent();

            // Check for game instance
            if( ig.game !== null ){

                // Center camera on gamescreen
                this.centerStaticCamera();

            }

        }

	});

    // Start up game
	ig.main(
		'#canvas',
        introScene1,
        60,
		_c.GAME_WIDTH_VIEW,
		_c.GAME_HEIGHT_VIEW,
		_c.SCALE,
        ig.ssrLoader
	);
	
});
