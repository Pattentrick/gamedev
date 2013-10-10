ig.module(
    'game.entities.movingPlatform'
)
.requires(
    'impact.entity',
    'impact.sound'
)
.defines(function(){

    EntityMovingPlatform = ig.Entity.extend({

        // add player sprites
        animSheet : new ig.AnimationSheet('media/moving_platform.png', 48, 16),

        size : {
            x : 48,
            y : 16
        },

        gravityFactor : 0,

        movementRange : 50,

        collides : ig.Entity.COLLIDES.FIXED,

        movementSpeed : 40,

        // platform is moving (needed for switch interaction)
        // ##########
        // IMPORTANT: weltmeister will save values as strings,
        // because of that we can not use a real boolean on this
        // property. instead we are using a string named 'true'.
        // this can be really confusing ...
        isActive : 'true',

        isMovementStart : true,

        // set to true for kind of moving platform,
        // just one can be true at a time.
        isVertical : null,

        isHorizontal: null,

        // platform moves in the opposite direction
        isReverse : false,

        player : null,

        init : function( x, y, settings){

            this.parent( x, y, settings );

            this.addAnim('idle', 1, [0]);

            // set start/end position for the platform.
            if( this.isVertical ){

                this.startPosition = this.pos.y;
                this.endPosition   = this.isReverse ? this.pos.y + this.movementRange : this.pos.y - this.movementRange ;

            }
            else {

                this.startPosition = this.pos.x;
                this.endPosition   = this.isReverse ? this.pos.x + this.movementRange : this.pos.x - this.movementRange;

            }

        },

        // a bit too complicated, could be simplified more ...
        handlePlatformMovement : function(){

            // if moving platform is active ( needed for switch interaction )
            if( this.isActive === 'true' ){

                // set kind of direction on axis
                var direction = this.isHorizontal ? 'x' : 'y';

                if( this.isMovementStart ){

                    // if platform reaches end position, move in opposite direction
                    if( !this.isReverse ){

                        if( this.pos[ direction ] <= this.endPosition ){
                            this.isMovementStart = false;
                        }
                        else {
                            this.vel[ direction ] = - this.movementSpeed;
                        }

                    }
                    // ... on reverse platforms
                    else {

                        if( this.pos[ direction ] >= this.endPosition ){
                            this.isMovementStart = false;
                        }
                        else {
                            this.vel[ direction ] = + this.movementSpeed;
                        }

                    }

                }
                else {

                    if( !this.isReverse ){

                        if( this.pos[ direction ] >= this.startPosition ){
                            this.isMovementStart = true;
                        }
                        else {

                            this.vel[ direction ] = this.movementSpeed;

                            this.fixPlayerBounce( direction );

                        }

                    }
                    // ... on reverse platforms
                    else {

                        if( this.pos[ direction ] <= this.startPosition ){
                            this.isMovementStart = true;
                        }
                        else {

                            this.vel[ direction ] = - this.movementSpeed;

                            this.fixPlayerBounce( direction );

                        }

                    }

                }

            }
            // cut off velocity on inactive platforms
            else {
                this.vel.x = 0;
                this.vel.y = 0;
            }

        },

        fixPlayerBounce : function( direction ){

            // fixing player bouncing off platform/running of the platform

            if( this.player !== null && this.player.standing && this.player.isOnMovingPlattform ){

                // on vertical movement : set player velocity to platform velocity
                if( direction === 'y' ){
                    this.player.vel[ direction ] = this.movementSpeed;
                }

            }

        },

        collideWith : function( other, axis ){

            // if the player is on the platform, set isOnMovingPlattform to true.
            // this will prevent showing a jump/fall animation while the platform
            // moves ...
            if( other instanceof EntityPlayer && axis === 'y' ){

                this.player = other;
                this.player.isOnMovingPlattform = true;

            }

        },

        update : function(){

            this.handlePlatformMovement();

            this.parent();

        }

    });
});
