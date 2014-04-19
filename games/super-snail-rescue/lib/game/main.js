ig.module(
    'game.main'
)
.requires(
	// include impact++
    'plusplus.core.plusplus',
    // enable debug
    'plusplus.debug.debug',
    // levels
    'game.levels.intro-scene-1',
    'game.levels.intro-scene-2',
    'game.levels.title',
    'game.levels.starfield',
    'game.levels.gameover',
    // loader
    'game.components.ssrloader',
    // level scroller
    'game.entities.level-scroller',
    // player
    'game.entities.player',
    // movement border
    'game.entities.movement-border',
    // player respawner
    'game.components.player-respawner'
)
.defines(function () {

    "use strict";

    var _c = ig.CONFIG;

    // opening and title instance

	var openingAndTitle = ig.GameExtended.extend({

        // Background color of canvas

        clearColor: "#000000",

		init: function () {

			this.parent();

		    // Load starting level

            this.loadLevelDeferred( 'intro-scene-1' );

		},

        inputStart: function() {

            ig.input.bind(ig.KEY.ESC, 'skipIntro');
            ig.input.bind(ig.KEY.C, 'start');

        },

        inputEnd: function() {

            ig.input.unbind(ig.KEY.ESC, 'skipIntro');
            ig.input.unbind(ig.KEY.C, 'start');

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

        },

        update: function(){

            this.parent();

            // Skipt to title

            if( ig.input.pressed('skipIntro') ){

                ig.game.loadLevelDeferred( 'title' );

            }

            // Start the game!

            if( ig.game.getEntitiesByClass(ig.EntityPressCToStart)[0] && ig.input.pressed('start') ){

                ig.system.setGame( superSnailRescue );

            }

        }

	});

    // Main game instance

    var superSnailRescue = ig.GameExtended.extend({

        /**
         * Background color of the canvas.
         *
         * @type {String} The Color value as hex.
         *
         */
        clearColor: "#000000",

        /**
         * Number of extra lives.
         *
         * @type {Boolean} If true the level will autoscroll.
         *
         */
        hasScrollingEnabled: false,

        /**
         * Whether the player has lost the game or not.
         *
         * @type {Boolean} True when the player lost all of his lives.
         *
         */
        hasLostTheGame: false,

        /**
         * Delay before loading the game over screen.
         *
         * @type {Number} Delay in seconds how fast the game over screen will load.
         *
         */
        gameOverDelay: 3,

        init: function () {

            this.parent();

            // Amount of extra lives that the player starts with

            this.amountOfStartLives = 2;

            // Number of current extra lives

            this.extraLives = this.amountOfStartLives;

            // Load starting level

            this.loadLevelDeferred( 'starfield' );

            // Init player respawner

            this.playerRespawner = new ig.PlayerRespawner();

        },

        inputStart: function(){

            // Movement

            ig.input.bind(ig.KEY.LEFT_ARROW, 'left');
            ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');
            ig.input.bind(ig.KEY.UP_ARROW, 'up');
            ig.input.bind(ig.KEY.DOWN_ARROW, 'down');

            // Shooting

            ig.input.bind(ig.KEY.C, 'shoot');

        },

        inputEnd: function(){

            // Movement

            ig.input.unbind(ig.KEY.LEFT_ARROW, 'left');
            ig.input.unbind(ig.KEY.RIGHT_ARROW, 'right');
            ig.input.unbind(ig.KEY.UP_ARROW, 'up');
            ig.input.unbind(ig.KEY.DOWN_ARROW, 'down');

            // Shooting

            ig.input.unbind(ig.KEY.C, 'shoot');

        },

        /**
         * Here I override the loadLevelDeferred method, so
         * I can set the currentLevel property.
         *
         * @param level
         * @param playerSpawnerName
         * @override
         */
        loadLevelDeferred: function( level, playerSpawnerName ){

            this.currentLevel = level;

            this.parent( level, playerSpawnerName );

        },

        buildLevel: function() {

            this.parent();

            if( this.currentLevel === 'starfield' ){

                // Refill extra lives

                this.extraLives = this.amountOfStartLives;

                // Spawn the level scroller

                ig.game.spawnEntity(ig.EntityLevelScroller, 156, 96);

                // Spawn the movement borders

                this.spawnMovementBorders();

                // Spawn the ship of the player

                this.player = ig.game.spawnEntity(ig.EntityPlayer, 50, 96);

                // Follow the level scroller with the camera

                this.camera.follow( this.getEntityByName('levelScroller'), true, true );

            }
            else {

                // Center on game over screen

                this.camera.follow( this.getEntityByName('pressCToContinue'), true, true );

            }

        },

        /**
         * Spawns border entities which prevent the
         * player ship from leaving the screen.
         *
         */
        spawnMovementBorders: function(){

            // Top border

            ig.game.spawnEntity(ig.EntityMovementBorder, 0, 0, {
                name: 'movementBorderTop',
                size: {
                    x: 320,
                    y: 1
                }
            });

            // Bottom border

            ig.game.spawnEntity(ig.EntityMovementBorder, 0, 200, {
                name: 'movementBorderBottom',
                size: {
                    x: 320,
                    y: 1
                }
            });

            // Left border

            ig.game.spawnEntity(ig.EntityMovementBorder, 0, 0, {
                name: 'movementBorderLeft',
                size: {
                    x: 1,
                    y: 200
                }
            });

            // Right border

            ig.game.spawnEntity(ig.EntityMovementBorder, 320, 0, {
                name: 'movementBorderRight',
                size: {
                    x: 1,
                    y: 200
                }
            });

        },

        update: function(){

            this.parent();

            this.playerRespawner.checkForRespawn();

            // If the player has lost the game, switch to the game over screen, after a given time.

            if( this.hasLostTheGame ){

                if( this.gameOverTimer.delta() > this.gameOverDelay ){

                    // Load game over screen

                    ig.game.loadLevelDeferred( 'gameover' );

                    // Reset flag

                    this.hasLostTheGame = false;


                }

            }

        }

    });

    // Start up game
	ig.main(
		'#canvas',
        superSnailRescue,
        60,
		_c.GAME_WIDTH_VIEW,
		_c.GAME_HEIGHT_VIEW,
		_c.SCALE,
        ig.ssrLoader
	);
	
});
