ig.module(
    'game.entities.ufo'
)
.requires(
    'plusplus.core.entity',
    'plusplus.abstractities.character',
    'plusplus.core.config'
)
.defines(function () {

    var _c  = ig.CONFIG;

    /**
     * The ufo which abducts the poor snail!
     *
     * @class
     * @extends ig.EntityExtended
     * @memeberof ig
     */
    ig.EntityUfo = ig.global.EntityUfo = ig.Character.extend({

        collides: ig.Entity.COLLIDES.NEVER,

        performance: 'dynamic',

        timer: new ig.Timer(),

        zIndex: 10,

        /**
         * Seconds after which the abduction starts.
         *
         * @default
         * @readonly
         */
        abductionTime: 1,

        /**
         * If the UFO already starts
         * to approach the snail
         *
         * @default
         */
        isApproaching: false,

        /**
         * If the UFO abducts the snail right now
         *
         * @default
         */
        hasAbductioninProgress: false,

        size: {
            x: 92,
            y: 77
        },

        animSheet: new ig.AnimationSheet( _c.PATH_TO_MEDIA + 'ufo.png', 92, 77 ),

        animInit: 'idle',

        animSettings: {
            idle: {
                frameTime: 1,
                sequence: [0]
            },
            abducting: {
                frameTime: 1,
                sequence: [1]
            }
        },

        maxVelGrounded: {
            x: 10,
            y: 15
        },

        /**
         * Returns true if the timer reached the time
         * for approaching an snail abduction!
         *
         * @returns boolean
         */
        isAbductionTime: function(){

            return ( this.timer.delta() >= this.abductionTime );

        },

        approachTheSnail: function(){

            this.moveToDown();

            this.isApproaching = true;

        },

        hasReachedAbductionDistance: function(){

            return ( this.pos.y >= 36 )

        },

        abductTheSnail: function(){

            this.hasAbductioninProgress = true;

            // no more love for you panda!
            ig.game.getEntitiesByClass(ig.EntityHearts)[0].kill();

        },

        update: function(){

            this.parent();

            if( this.isAbductionTime() && !this.isApproaching ){

                this.approachTheSnail();

            }

            if( this.isApproaching && this.hasReachedAbductionDistance() && !this.hasAbductioninProgress ){

                this.moveToStop();

                this.abductTheSnail();

            }

            if( this.hasAbductioninProgress ){

                this.animOverride('abducting');

            }

        }

    });

});