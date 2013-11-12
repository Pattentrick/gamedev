ig.module(
    'game.main'
)
.requires(
	// include impact++
    'plusplus.core.plusplus',
    // levels
    'game.levels.test',
    // enable debug
    //'plusplus.debug.debug',
    // command execution
    'game.components.command-execution',
    // user interface module
    'game.ui.pacui'
)
// define the main module
.defines(function () {

    "use strict";

    // config variable
    var _c = ig.CONFIG;

	var pac = ig.GameExtended.extend({

        // background color of canvas
        clearColor: "#330033",

		init: function () {

			this.parent();

		    // Load level
            this.loadLevel(ig.global.LevelTest);

            // Create new command execution instance
            this.commandExecution = new ig.CommandExecution();

            // Create new userinterface instance
            this.gui = new ig.Pacui();

		},

        /**
         * Bind all inputs to certain events
         */
        inputStart: function () {

            // Leftclick
            ig.input.bind(ig.KEY.MOUSE1, 'click');

        },

        /**
         * Centers camera on gamescreen when
         * the game runs in fullscreen mode
         */
        centerStaticCamera : function(){

            // Reset screen position for
            // proper positioning on resize
            ig.game.screen.x = 0;
            ig.game.screen.y = 0;

            // Calculate new screen position
            ig.game.screen.x -= ( ig.system.realWidth / 2 ) / ig.system.scale - ( _c.GAME_WIDTH_VIEW / 2 );
            ig.game.screen.y -= ( ig.system.realHeight / 2 ) / ig.system.scale - ( _c.GAME_HEIGHT_VIEW / 2 );

        },

        resize : function(){

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
		pac,
		60,
		_c.GAME_WIDTH,
		_c.GAME_HEIGHT,
		_c.SCALE,
		ig.LoaderExtended
	);
	
});
