ig.module(
    'game.entities.snail-sitting'
)
.requires(
    'plusplus.core.entity',
    'plusplus.abstractities.character',
    'plusplus.core.config'
)
.defines(function () {

    var _c  = ig.CONFIG;

    /**
     * The sitting snail, which is
     * featured in the first intro scene.
     *
     * @class
     * @extends ig.EntityExtended
     * @memeberof ig
     */
    ig.EntitySnailSitting = ig.global.EntitySnailSitting = ig.Character.extend({

        collides: ig.Entity.COLLIDES.NEVER,

        size: {
            x: 26,
            y: 18
        },

        zIndex: 20,

        animSheet: new ig.AnimationSheet( _c.PATH_TO_MEDIA + 'snail-sitting.gif', 26, 18 ),

        animInit: 'happy',

        animSettings: {
            happy: {
                frameTime: 1,
                sequence: [0]
            },
            sad: {
                frameTime: 1,
                sequence: [1]
            }
        }

    });

});