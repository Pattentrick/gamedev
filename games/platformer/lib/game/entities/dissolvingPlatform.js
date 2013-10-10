ig.module(
    'game.entities.dissolvingPlatform'
)
.requires(
    'impact.entity',
    'impact.sound'
)
.defines(function(){

    EntityDissolvingPlatform = ig.Entity.extend({

        animSheet : new ig.AnimationSheet('media/dissolving_platform.png', 16, 16),

        gravityFactor : 0,

        collides : ig.Entity.COLLIDES.FIXED,

        hasActiveTimer : false,

        init : function( x, y, settings){

            this.parent( x, y, settings );

            this.addAnim('idle', 1, [0]);
            this.addAnim('dissolve', 0.1, [0,1,2,3,4]);

        },

        collideWith : function( other, axis ){

            if( other instanceof EntityPlayer && axis === 'y' ){

                if( !this.hasActiveTimer ){

                    this.hasActiveTimer = true;

                    this.timer = new ig.Timer(0.5);

                    // rewind animsheet to prevent showing ended animation
                    this.anims.dissolve.rewind();

                    // show dissolving animation
                    this.currentAnim = this.anims.dissolve;

                }

            }

        },

        handlePlatformDeath : function(){

            if( this.hasActiveTimer ){

                if( this.timer.delta() > 0 ){

                    this.kill();

                }

            }

        },

        update : function(){

            this.handlePlatformDeath();

            this.parent();

        }

    });
});
