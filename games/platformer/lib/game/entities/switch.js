ig.module(
    'game.entities.switch'
)
.requires(
    'impact.entity',
    'impact.sound'
)
.defines(function(){

    EntitySwitch = ig.Entity.extend({

        // add player sprites
        animSheet : new ig.AnimationSheet('media/switch.png', 16, 8),

        size : {
            x : 16,
            y : 8
        },

        foo : 'bar',

        type : ig.Entity.TYPE.A,

        checkAgainst : ig.Entity.TYPE.A,

        collides : ig.Entity.COLLIDES.NEVER,

        init : function( x, y, settings){

            this.parent( x, y, settings );

            this.addAnim('inactive', 1, [0]);
            this.addAnim('active', 1, [1]);

        },

        check : function( other ){

            if( other instanceof EntityPlayer || other instanceof EntityCrate ){

                // switch to active anim
                this.currentAnim = this.anims.active;

                // set targets isActive property (in this case the platform) to true.
                // this will move the platform.
                for( var t in this.target ) {

                    var ent = ig.game.getEntityByName( this.target[t] );

                    if( ent && ent instanceof EntityMovingPlatform ) {
                        ent.isActive = 'true';
                    }

                }

            }

        },

        update : function(){

            this.currentAnim = this.anims.inactive;

            for( var t in this.target ) {

                var ent = ig.game.getEntityByName( this.target[t] );

                if( ent && ent instanceof EntityMovingPlatform ) {
                    ent.isActive = 'false';
                }

            }

            this.parent();

        }

    });
});
