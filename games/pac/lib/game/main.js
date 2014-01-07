ig.module(
    'game.main'
)
.requires(
	// include impact++
    'plusplus.core.plusplus',
    // player class
    'game.entities.player',
    // dev levels
    'game.levels.titlescreen',
    'game.levels.test',
    'game.levels.another-room',
    // game levels
    'game.levels.bedroom',
    'game.levels.floor',
    'game.levels.junkroom',
    'game.levels.kitchen',
    // cursor
    'game.ui.cursor',
    // enable debug
    //'plusplus.debug.debug',
    // command execution
    'game.components.command-execution',
    // user interface module
    'game.ui.pacui',
    // inventory
    'game.ui.inventory',
    // room state tracker/creator
    'game.components.room-state'
)
// define the main module
.defines(function () {

    "use strict";

    // config variable
    var _c = ig.CONFIG;

    // Game instance
	var Pac = ig.GameExtended.extend({

        // Background color of canvas
        //clearColor: "#330033",
        clearColor: "#000000",

        // Contains the name of the current level
        currentLevel: null,

		init: function () {

			this.parent();

		    // Load starting level
            //this.loadLevelDeferred( 'test', 'spawner' );
            this.loadLevelDeferred( 'bedroom', 'spawner-a' );

            // Create new pac user interface instance
            this.gui = new ig.Pacui();

            // Instance room state
            this.roomState = new ig.RoomState();

            // Instance the inventory
            this.inventory = new ig.Inventory();

		},

        /**
         * Here i override the loadLevelDeferred method, so
         * i can set the currentLevel property. This is needed
         * for spawning/removing game items after the level build.
         *
         * @param level
         * @param playerSpawnerName
         * @override
         */
        loadLevelDeferred: function( level, playerSpawnerName ){

            this.currentLevel = level;

            this.parent( level, playerSpawnerName );

        },

        /**
         * This method creates the level and spawns all
         * the entitys. So any logic for spawning/removing
         * entitys in a certain room goes here after calling
         * parent.
         *
         * @override
         */
        buildLevel: function(){

            this.parent();

            // reposition camera on level switch
            this.centerStaticCamera();

            // Create room state
            this.roomState.createState();

            // Create new command execution instance
            this.commandExecution = new ig.CommandExecution();

            this.inventory.respawnInventoryItems();

            // Set facing direction
            this.setFacingDirection();

        },

        /**
         * Set a proper facing direction
         * in relation too the new room.
         */
        setFacingDirection: function(){

            var player       = ig.game.getPlayer();
            var currentLevel = ig.game.currentLevel;

            switch( currentLevel ){
                case 'test':

                    player.facing = {
                        x: -1,
                        y: 1
                    };

                break;
                case 'another-room':

                    player.facing = {
                        x: -1,
                        y: 1
                    };

                break;
            }

            //console.log( player.facing );

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

        },

        update: function(){

            this.parent();

            // Sort entities to avoid zIndex bugs
            ig.game.sortEntities('entities');

        }

	});

    // Titlescreen instance
    var Titlescreen = ig.GameExtended.extend({

        // Background color of canvas
        clearColor: "#000000",

        init: function () {

            this.parent();

            // Load Titlescreen
            this.loadLevelDeferred( 'titlescreen' );

            ig.game.spawnEntity(ig.EntityCursor, 0, 0);

            // Play title theme
            var theme = new ig.Sound( _c.PATH_TO_MEDIA + 'music/title-theme.*' );

            theme.play();

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

        },

        update: function(){

            this.parent();

            if( ig.input.pressed('click') ){

                ig.system.setGame( Pac );

            }

        }

    });

    // Start up game
	ig.main(
		'#canvas',
		Pac,
        //Titlescreen,
        60,
		_c.GAME_WIDTH,
		_c.GAME_HEIGHT,
		_c.SCALE,
		ig.LoaderExtended
	);
	
});
