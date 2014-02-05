ig.module(
    'game.entities.crop'
)
.requires(
    'plusplus.core.entity',
    'plusplus.core.config'
)
.defines(function () {

    var _c  = ig.CONFIG;

    /**
     * The floating heart above the panda and the snail.
     *
     * @class
     * @extends ig.EntityExtended
     * @memeberof ig
     */
    ig.EntityCrop = ig.global.EntityCrop = ig.EntityExtended.extend({

        collides: ig.Entity.COLLIDES.NEVER,

        size: {
            x: 320,
            y: 200
        },

        zIndex: 100,

        animSheet: new ig.AnimationSheet( _c.PATH_TO_MEDIA + 'crop.gif', 320, 200 ),

        animInit: 'crop',

        animSettings: {
            crop: {
                frameTime: 1,
                sequence: [0]
            }
        }

    });

});