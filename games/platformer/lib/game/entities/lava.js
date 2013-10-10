ig.module(
    'game.entities.lava'
)
.requires(
    'impact.entity',
    'impact.sound'
)
.defines(function(){

    EntityLava = ig.Entity.extend({

        // add player sprites
        animSheet : new ig.AnimationSheet('media/lava.png', 16, 16),

        gravityFactor : 0,

        size : {
            x : 16,
            y : 16
        },

        type : ig.Entity.TYPE.B,

        checkAgainst : ig.Entity.TYPE.A,

        _wmScalable : true,

        //_wmDrawBox : true,

        //_wmBoxColor : '#ff0000',

        startPosition : null,

        init : function( x, y, settings){

            this.parent( x, y, settings );

            this.addAnim('idle', 1, [0]);

        },

        update : function(){

            // move!
            this.parent();

        },

        check: function( other ) {

            if( other instanceof EntityPlayer  ){

                other.kill();

            }

        }

    });
});
