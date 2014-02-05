ig.module(
    'game.entities.hearts'
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
    ig.EntityHearts = ig.global.EntityHearts = ig.EntityExtended.extend({

        collides: ig.Entity.COLLIDES.NEVER,

        size: {
            x: 13,
            y: 18
        },

        animSheet: new ig.AnimationSheet( _c.PATH_TO_MEDIA + 'hearts.gif', 13, 18 ),

        animInit: 'romantic',

        animSettings: {
            romantic: {
                frameTime: 0.8,
                sequence: [3,0,1,2]
            }
        }

    });

});