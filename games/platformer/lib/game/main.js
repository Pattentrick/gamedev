ig.module( 
	'game.main'
)
.requires(
	'impact.game',
    'game.utilities.LevelLoader',
    'game.utilities.LevelScreen',
    'game.utilities.PabbController',
    'game.utilities.Camera'
)
.defines(function(){

    MyGame = ig.Game.extend({

        gravity : 300,

        hasPabbs : false,

        init: function() {

            // set background color
            ig.game.clearColor = '#a4e4fc';

            // Bind keys
            ig.input.bind( ig.KEY.LEFT_ARROW, 'left' );
            ig.input.bind( ig.KEY.RIGHT_ARROW, 'right' );
            ig.input.bind( ig.KEY.UP_ARROW, 'jump' );

            // start level
            lvl.start();
            //ig.game.loadLevel( LevelLevel_5 );

            // camera
            this.initTrapCamera();

/*            // check for Pabs ( "peek a boo" blocks)
            if( ig.game.getEntitiesByType( EntityPeekABooBlock ).length > 0 ){

                this.hasPabbs = true;

            }*/


        },

        initTrapCamera : function(){

            this.camera = new Camera( ig.system.width/2, ig.system.height/2, 5 );

            this.camera.trap.size.x = ig.system.width/10;
            this.camera.trap.size.y = ig.system.height/4;

            // Set camera max and reposition trap
            this.camera.max.x = this.collisionMap.width * this.collisionMap.tilesize - ig.system.width;
            this.camera.max.y = this.collisionMap.height * this.collisionMap.tilesize - ig.system.height;

            this.camera.set( this.getEntitiesByType( EntityPlayer )[0] );

        },

        update: function() {

            // Update all entities and backgroundMaps
            this.parent();

            // update camera movement
            this.camera.follow( this.getEntitiesByType( EntityPlayer )[0] );

            // trigger pabb behaviour
            if( this.hasPabbs ){

                if( pabbController.timer.delta() > 0 ){

                    pabbController.timer.reset();
                    pabbController.handlePabbBehaviour();

                }

            }

        }

    });

    // Start the Game with 60fps, a resolution of 320x240, scaled
    // up by a factor of 2
    ig.main( '#canvas', LevelScreen, 60, 320, 240, 2 );
    // alternateive resolution
    //ig.main( '#canvas', LevelScreen, 60, 512, 384, 2 );

    // fullsize
/*    ig.system.resize(
        ig.global.innerWidth * 1 * ( 1 / 4 ),
        ig.global.innerHeight * 1 * ( 1 / 4 ),
        4
    );*/

});
