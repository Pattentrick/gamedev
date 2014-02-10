ig.module(
    'game.entities.bee'
)
.requires(
    'plusplus.core.entity',
    'plusplus.abstractities.character',
    'plusplus.core.config'
)
.defines(function () {

    var _c  = ig.CONFIG;

    /**
     * A bee which flies over the meadow
     *
     * @class
     * @extends ig.EntityExtended
     * @memeberof ig
     */
    ig.EntityBee = ig.global.EntityBee = ig.Character.extend({

        collides: ig.Entity.COLLIDES.NEVER,

        performance: 'dynamic',

        size: {
            x: 10,
            y: 6
        },

        hasMovementDirection: false,

        animSheet: new ig.AnimationSheet( _c.PATH_TO_MEDIA + 'bee.gif', 10, 6 ),

        /**
         * In which direction should the bee fly?
         */
        movementDirection: 'right',

        animSettings: {
            idle: {
                frameTime: 0.1,
                sequence: [0,1]
            }
        },

        maxVelGrounded: {
            x: 5,
            y: 10
        },

        update: function(){

            this.parent();

            // just call moveTo once

            if( !this.hasMovementDirection ){

                if( this.movementDirection === 'right' ){

                    this.moveToRight();

                }
                else {

                    this.moveToLeft();

                }

                this.hasMovementDirection = true;

            }

        }

    });

});