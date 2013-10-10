ig.module(
    'game.entities.fallingPlatform'
)
.requires(
    'impact.entity',
    'impact.sound'
)
.defines(function(){

    EntityFallingPlatform = ig.Entity.extend({

        // add player sprites
        animSheet : new ig.AnimationSheet('media/falling_platform.png', 16, 16),

        gravityFactor : 0,

        collides : ig.Entity.COLLIDES.FIXED,

        hasActiveTimer : false,

        init : function( x, y, settings){

            this.parent( x, y, settings );

            this.addAnim('idle', 1, [0]);

        },

        collideWith : function( other, axis ){

            if( other instanceof EntityPlayer && axis === 'y' ){

                if( !this.hasActiveTimer ){

                    this.hasActiveTimer = true;

                    this.timer = new ig.Timer(0.5);

                }

            }

        },

        handlePlatformFalling : function(){

            if( this.hasActiveTimer ){

                if( this.timer.delta() > 0 ){

                    this.gravityFactor = 1;

                }

            }

        },

        update : function(){

            this.handlePlatformFalling();

            this.parent();

        }

    });
});
