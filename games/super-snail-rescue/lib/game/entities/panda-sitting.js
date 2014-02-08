ig.module(
        'game.entities.panda-sitting'
    )
.requires(
    'plusplus.core.entity',
    'plusplus.core.config'
)
.defines(function () {

    var _c  = ig.CONFIG;

    /**
     * The sitting panda, which is
     * featured in the first intro scene.
     *
     * @class
     * @extends ig.EntityExtended
     * @memeberof ig
     */
    ig.EntityPandaSitting = ig.global.EntityPandaSitting = ig.EntityExtended.extend({

        collides: ig.Entity.COLLIDES.NEVER,

        size: {
            x: 21,
            y: 28
        },

        zIndex: 20,

        timer: new ig.Timer(),

        /**
         * Set to ture to display a sad panda
         */
        isLonelyPanda: false,

        /**
         * Time in seconds on how long this scene is
         */
        sceneDuration: 25,

        animSheet: new ig.AnimationSheet( _c.PATH_TO_MEDIA + 'panda-sitting.gif', 21, 28 ),

        animInit: 'idle',

        animSettings: {
            idle: {
                frameTime: 1,
                sequence: [0]
            },
            sad: {
                frameTime: 1,
                sequence: [2]
            }
        },

        setSadFaceAnimation: function(){

            this.isLonelyPanda = true;

        },

        update: function(){

            this.parent();

            if( this.isLonelyPanda ){

                this.animOverride('sad');

            }

            if( this.timer.delta() >= this.sceneDuration ){

                // TODO: load the next level
                console.log('end of scene');

            }

        }

    });

});