ig.module(
    'game.entities.spikeguy'
)
.requires(
    'impact.entity',
    'impact.sound'
)
.defines(function(){

    EntitySpikeguy = ig.Entity.extend({

        // add player sprites
        animSheet : new ig.AnimationSheet('media/spikeguy.png', 16, 16),

        size : {
            x : 16,
            y : 16
        },

        gravityFactor : 0,

        movementRange : 50,

        collides : ig.Entity.COLLIDES.FIXED,

        movementSpeed : 40,

        isMovementStart : true,

        init : function( x, y, settings){

            this.parent( x, y, settings );

            this.addAnim('idle', 1, [0,1]);

            // set start/end position for the spikeguy
            this.startPosition = this.pos.y;
            this.endPosition   = this.pos.y + this.movementRange;

        },

        handleSpikeguyMovement : function(){

            if( this.isMovementStart ){

                // if bat reaches end position, move in opposite direction
                if( this.pos.y >= this.endPosition ){
                    this.isMovementStart = false;
                }
                else {
                    this.vel.y = this.movementSpeed;
                }

            }
            else {

                if( this.pos.y <= this.startPosition ){
                    this.isMovementStart = true;
                }
                else {
                    this.vel.y = - this.movementSpeed;
                }

            }

        },

        collideWith : function( other ){

            // if spikeguy collides with player, kill him
            if( other instanceof EntityPlayer ){
                other.kill();
            }

        },

        update : function(){

            this.handleSpikeguyMovement();

            this.parent();

        }

    });
});
