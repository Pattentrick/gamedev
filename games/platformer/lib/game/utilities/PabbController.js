ig.module(
    'game.utilities.PabbController'
)
.requires(
	'impact.game'
)
.defines(function(){

    /*
     * handles the behaviour of the pabbs
     *
     * pabb stands for : "Peek A Boo Block"
     *
     */
    PabbController = ig.Class.extend({

        init : function(){

            // ingame time between each pabb
            this.timer = new ig.Timer(1.5);

            // set sound
            this.peekABooBlockSFX = new ig.Sound( 'media/sounds/pabb.*' );
            this.peekABooBlockSFX.volume = 0.5;

        },

        handlePabbBehaviour : function(){

            // array of pabbs
            var pabbs = ig.game.getEntitiesByType( EntityPeekABooBlock );

            // iterate over pabbs
            for( var i = 0, len = pabbs.length; i < len; i++ ){

                // this blockOrder is the nextBlock in the cycle
                if( pabbs[i].blockOrder === pabbs[i].nextBlock ){

                    // if last block is reached: reset pabbs, restart cyle
                    if( pabbs.length === ( pabbs[i].nextBlock + 1) ){
                        this.resetPabbCycle( pabbs, len );
                    }
                    else {
                        this.incrementNextBlockOnPabb( pabbs, len );
                    }

                    // set pabb visibility/collision
                    pabbs[i].addAnim('idle', 1, [0]);
                    pabbs[i].collides = ig.Entity.COLLIDES.FIXED;

                    // play sound
                    this.peekABooBlockSFX.play();

                    // exit loop if next block is found
                    break;

                }

            }

        },

        /**
         * resets the pabb cycle.
         *
         * @pabbs {array} this array contains all pabbs
         * @len {number} length of pabbs array
         */
        resetPabbCycle : function( pabbs, len ){

            for( var i = 0; i < len; i++ ){

                pabbs[i].nextBlock = 0;

                this.hideInactivePabbs( pabbs[i] );

            }

        },

        /**
         * increment the nextBlock property on all pabbs. this
         * is needed for the "cycle mechanic".
         *
         * @pabbs {array} this array contains all pabbs
         * @len {number} length of pabbs array
         */
        incrementNextBlockOnPabb : function( pabbs, len ){

            for( var i = 0; i < len; i++ ){

                pabbs[i].nextBlock += 1;

                this.hideInactivePabbs( pabbs[i] );

            }

        },

        /**
         * hide/remove collision on all inactive pabbs
         * @pabb {object} the pabb to hide
         */
        hideInactivePabbs : function( pabb ){
            pabb.currentAnim = null;
            pabb.collides = ig.Entity.COLLIDES.NEVER;
        }

    });

    pabbController = new PabbController();

});