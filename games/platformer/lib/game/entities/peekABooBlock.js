ig.module(
    'game.entities.peekABooBlock'
)
.requires(
    'impact.entity',
    'impact.sound'
)
.defines(function(){

    EntityPeekABooBlock = ig.Entity.extend({

        // add player sprites
        animSheet : new ig.AnimationSheet('media/pabb.png', 16, 16),

        gravityFactor : 0,

        size : {
            x : 16,
            y : 16
        },

        type : ig.Entity.TYPE.A,

        collides : ig.Entity.COLLIDES.NEVER,

        // show in wm
        _wmDrawBox  : true,
        _wmBoxColor : '#ff00ff',

        // set in wm to determine order of blocks
        blockOrder : null,

        nextBlock : 0,

        init : function( x, y, settings){

            this.parent( x, y, settings );

            this.currentAnim = null;

        },

        update : function(){

            // move!
            this.parent();

        }

    });
});
