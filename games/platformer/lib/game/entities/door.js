ig.module(
    'game.entities.door'
)
.requires(
    'impact.entity',
    'impact.sound'
)
.defines(function(){

    EntityDoor = ig.Entity.extend({

        // add player sprites
        animSheet : new ig.AnimationSheet('media/new_door.gif', 32, 32),

        gravityFactor : 0,

        size : {
            x : 32,
            y : 32
        },

        font : new ig.Font( 'media/04b03.font.png' ),

        showText : false,

        type : ig.Entity.TYPE.A,

        checkAgainst : ig.Entity.TYPE.A,

        init : function( x, y, settings){

            this.parent( x, y, settings );

            this.addAnim('idle', 1, [0]);

        },

        check : function( other ) {

            if( other instanceof EntityPlayer  ){

                if( other.hasKey ){

                    ig.system.setGame( LevelScreen );

                }
                else {
                    this.showText = true;
                }

            }

        },

        // update() gets called each frame BEFORE draw()
        update : function(){

            // on default, there is no text at the door
            this.showText = false;

        },

        draw : function(){

            this.parent();

            if( this.showText ){

                var fontPosX = ( this.pos.x - ig.game.screen.x ) + 14,
                    fontPosY = ( this.pos.y -ig.game.screen.y ) - 12;

                this.font.draw( 'the door is locked', fontPosX, fontPosY, ig.Font.ALIGN.CENTER );

            }

        }

    });
});
