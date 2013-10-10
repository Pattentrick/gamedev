ig.module(
    'game.utilities.LevelScreen'
)
.requires(
	'impact.game'
)
.defines(function(){

    LevelScreen = ig.Game.extend({

        font : new ig.Font( 'media/04b03.font.png' ),

        init : function(){

            // set timer
            this.timer = new ig.Timer(0.5);

        },

        update: function() {

            if ( this.timer.delta() > 0 ) {

                ig.system.setGame( MyGame );

            }

        },

        draw: function() {

            // draw all entities and backgroundMaps
            this.parent();

            // check for "game end"
            if( lvl.isLastLevel() ){

                // reset level counter/current level
                lvl.levelCount   = 0;
                lvl.currentLevel = lvl.levels[0];

            }

            this.font.draw( 'LEVEL ' + ( lvl.levelCount + 1 ), ig.system.width/2, ig.system.height/2, ig.Font.ALIGN.CENTER );

        }

    });

});
