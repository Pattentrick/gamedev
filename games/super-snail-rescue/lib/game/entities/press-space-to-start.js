ig.module(
    'game.entities.press-space-to-start'
)
.requires(
    'plusplus.core.entity',
    'plusplus.core.config'
)
.defines(function () {

    var _c  = ig.CONFIG;

    /**
     * The title at the title screen of Super Snail Rescue
     *
     * @class
     * @extends ig.EntityExtended
     * @memeberof ig
     */
    ig.EntityPressSpaceToStart = ig.global.EntityPressSpaceToStart = ig.EntityExtended.extend({

        size: {
            x: 131,
            y: 11
        },

        animSheet: new ig.AnimationSheet( _c.PATH_TO_MEDIA + 'press-space-to-start.gif', 131, 11 ),

        animSettings: {
            idle: {
                frameTime: 0.8,
                sequence: [0,1]
            }
        }

    });

});