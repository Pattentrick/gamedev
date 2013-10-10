ig.module(
    'game.entities.blob'
)
.requires(
    'impact.entity'
)
.defines(function(){

    EntityBlob = ig.Entity.extend({

        // add player sprites
        animSheet : new ig.AnimationSheet('media/blob.png', 16, 12),

        size : {
            x : 16,
            y : 12
        },

        gravityFactor : 0,

        collides : ig.Entity.COLLIDES.FIXED,

        init : function( x, y, settings){

            this.parent( x, y, settings );

            this.addAnim('idle', 1, [0]);
            this.addAnim('blobs', 0.1, [3,2,1,0], true);

        }

    });

});
