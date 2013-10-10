ig.module(
    'game.entities.bee'
)
.requires(
    'impact.entity',
    'impact.sound'
)
.defines(function(){

    EntityBee = ig.Entity.extend({

        // add player sprites
        animSheet : new ig.AnimationSheet('media/bee.png', 16, 16),

        size : {
            x : 16,
            y : 16
        },

        gravityFactor : 0,

        movementRange : 50,

        collides : ig.Entity.COLLIDES.FIXED,

        movementSpeed : 40,

        isMovementStart : true,

        zIndex : 2,

        init : function( x, y, settings){

            this.parent( x, y, settings );

            this.addAnim('fly', 0.3, [0,1]);

            // set start/end position for the bee
            this.startPosition = this.pos.x;
            this.endPosition   = this.pos.x + this.movementRange;

        },

        handleBeeMovement : function(){

            if( this.isMovementStart ){

                // if bee reaches end position, move in opposite direction
                if( this.pos.x >= this.endPosition ){
                    this.isMovementStart = false;
                }
                else {
                    this.vel.x = this.movementSpeed;
                }

                this.currentAnim.flip.x = true;

            }
            else {

                if( this.pos.x <= this.startPosition ){
                    this.isMovementStart = true;
                }
                else {
                    this.vel.x = - this.movementSpeed;
                }

                this.currentAnim.flip.x = false;

            }

        },

        collideWith : function( other ){

            // if bat collides with player, kill him
            if( other instanceof EntityPlayer ){
                other.kill();
            }

        },

        update : function(){

            this.handleBeeMovement();

            this.parent();

        }

    });
});
