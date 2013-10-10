ig.module(
    'game.entities.bat'
)
.requires(
    'impact.entity',
    'impact.sound'
)
.defines(function(){

    EntityBat = ig.Entity.extend({

        // add player sprites
        animSheet : new ig.AnimationSheet('media/bat.gif', 16, 16),

        size : {
            x : 15,
            y : 9
        },

        offset : {
            x : 0,
            y : 2
        },

        gravityFactor : 0,

        movementRange : 50,

        collides : ig.Entity.COLLIDES.FIXED,

        movementSpeed : 40,

        isMovementStart : true,

        zIndex : 2,

        init : function( x, y, settings){

            this.parent( x, y, settings );

            this.addAnim('idle', 0.1, [0,1,2,3,4,5,6,7,8]);

            // set start/end position for the bat
            this.startPosition = this.pos.x;
            this.endPosition   = this.pos.x + this.movementRange;

        },

        handleBatMovement : function(){

            if( this.isMovementStart ){

                // if bat reaches end position, move in opposite direction
                if( this.pos.x >= this.endPosition ){
                    this.isMovementStart = false;
                }
                else {
                    this.vel.x = this.movementSpeed;
                }

            }
            else {

                if( this.pos.x <= this.startPosition ){
                    this.isMovementStart = true;
                }
                else {
                    this.vel.x = - this.movementSpeed;
                }

            }

        },

        collideWith : function( other ){

            // if bat collides with player, kill him
            if( other instanceof EntityPlayer ){
                other.kill();
            }

        },

        update : function(){

            this.handleBatMovement();

            this.parent();

        }

    });
});
