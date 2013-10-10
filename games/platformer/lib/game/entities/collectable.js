ig.module(
    'game.entities.collectable'
)
.requires(
    'impact.entity',
    'impact.sound'
)
.defines(function(){

    EntityCollectable = ig.Entity.extend({

        // add player sprites
        animSheet : new ig.AnimationSheet('media/coin.png', 16, 16),

        gravityFactor : 0,

        size : {
            x : 16,
            y : 16
        },

        type : ig.Entity.TYPE.A,

        checkAgainst : ig.Entity.TYPE.A,

        collectableSFX : new ig.Sound( 'media/sounds/coin.*' ),

        init : function( x, y, settings){

            this.parent( x, y, settings );

            this.addAnim('idle', 1, [0]);

            this.collectableSFX.volume = 0.2;

        },

        update : function(){

            // move!
            this.parent();

        },

        check: function( other ) {

            if( other instanceof EntityPlayer ){

                // play sound
                this.collectableSFX.play();

                // remove key from game
                this.kill();

            }

        }

    });
});
