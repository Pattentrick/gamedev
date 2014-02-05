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

        animSheet: new ig.AnimationSheet( _c.PATH_TO_MEDIA + 'panda-sitting.gif', 21, 28 ),

        animInit: 'idle',

        animSettings: {
            idle: {
                frameTime: 1,
                sequence: [0]
            }
        }

    });

});