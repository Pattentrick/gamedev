ig.module(
    'game.entities.crate'
)
.requires(
    'impact.entity',
    'impact.sound'
)
.defines(function(){

    EntityCrate = ig.Entity.extend({

        // add player sprites
        animSheet : new ig.AnimationSheet('media/crate.png', 16, 18),

        size : {
            x : 16,
            y : 18
        },

        friction : {
            x : 500,
            y : 0
        },

        maxVel: {
            x: 100,
            y: 500
        },

        // in case of spikes
        zIndex : 10,

        type : ig.Entity.TYPE.A,

        checkAgainst : ig.Entity.TYPE.A,

        collides : ig.Entity.COLLIDES.FIXED,

        init : function( x, y, settings){

            this.parent( x, y, settings );

            this.addAnim('idle', 1, [0]);

        }

    });
});
