ig.module(
    'game.entities.key'
)
.requires(
    'impact.entity',
    'impact.sound'
)
.defines(function(){

    EntityKey = ig.Entity.extend({

        // add player sprites
        animSheet : new ig.AnimationSheet('media/key.png', 16, 16),

        gravityFactor : 0,

        zIndex : 1,

        type : ig.Entity.TYPE.A,

        checkAgainst : ig.Entity.TYPE.A,

        collides : ig.Entity.COLLIDES.NEVER,

        keyCollectedSFX : new ig.Sound( 'media/sounds/key_collected.*' ),

        maxVel : {
            x : 0,
            y : 200
        },

        friction : {
            x : 0,
            y : 120
        },

        isFloatStart : true,

        keyPosition : null,

        init : function( x, y, settings){

            this.parent( x, y, settings );

            this.addAnim('idle', 1, [0]);

            this.keyCollectedSFX.volume = 0.1;

            this.timer = new ig.Timer(1);

            // make the key bounce if affected by gravity
            if( this.gravityFactor > 0 ){

               this.bounciness = 1;
               this.minBounceVelocity = 20;

            }

        },

        floatKey : function(){

            // kind of tricky, set the velocity to zero before accelerating,
            // sor else the key will speed up
            if( this.isFloatStart ){

                this.vel.y = 0;
                this.accel.y = -5;
                this.isFloatStart = false;

            }
            else {

                this.vel.y = 0;
                this.accel.y = 5;
                this.isFloatStart = true;


            }

        },

        check: function( other ) {

            if( other instanceof EntityPlayer  ){

                // play sound
                this.keyCollectedSFX.play();

                // remove key from game
                this.kill();

                // update key possesion of player
                other.hasKey = true;

            }

        },

        update : function(){

            // float the key, if no gravity is set
            if( this.gravityFactor === 0 && this.timer.delta() > 0 ){

                this.floatKey();
                this.timer.reset();

            }

            this.parent();

        }

    });
});
