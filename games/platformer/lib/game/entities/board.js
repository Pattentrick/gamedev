ig.module(
    'game.entities.board'
)
.requires(
    'impact.entity',
    'impact.sound'
)
.defines(function(){

    EntityBoard = ig.Entity.extend({

        // add player sprites
        animSheet : new ig.AnimationSheet('media/board.png', 16, 4),

        size : {
            x : 16,
            y : 4
        },

        gravityFactor : 0,

        collides : ig.Entity.COLLIDES.FIXED,

        init : function( x, y, settings){

            this.parent( x, y, settings );

            this.addAnim('idle', 1, [0]);

        }

    });
});
