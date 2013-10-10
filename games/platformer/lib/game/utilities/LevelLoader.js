ig.module( 
	'game.utilities.LevelLoader'
)
.requires(
    'game.levels.level_1',
    'game.levels.level_2',
    'game.levels.level_3',
    'game.levels.level_4',
    'game.levels.level_5'
)
.defines(function(){

    LevelLoader = ig.Class.extend({

        levels : [
            LevelLevel_1,
            LevelLevel_2,
            LevelLevel_3,
            LevelLevel_4,
            LevelLevel_5
        ],

        levelCount : 0,

        init : function(){

            // set current level
            this.currentLevel = this.levels[0];

        },

        // handle which lvl will be loaded
        // on MyGame init (based on level count)
        start : function(){

            this.levelCount === 0 ? this.first() : this.next();

        },


        // go to first level
        first : function(){

            ig.game.loadLevel( this.levels[0] );

            this.levelCount++;

        },

        // go to next level
        next : function(){

            ig.game.loadLevel( this.levels[ this.levelCount ] );
            this.currentLevel = this.levels[ this.levelCount ];

            this.levelCount++;

        },

        isLastLevel : function(){

            if( this.levels.length === this.levelCount ){
                return true;
            }

        },

        // reloads current level
        reload : function(){
            ig.game.loadLevel( this.currentLevel );
        }

    });

    // create new instance
    lvl = new LevelLoader();

});