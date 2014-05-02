ig.module(
    'game.entities.space-snail'
)
.requires(
    'plusplus.abstractities.character',
    'plusplus.core.config'
)
.defines(function () {

    var _c  = ig.CONFIG;
    var _ut = ig.utils;

    /**
     * A snail in space :O (spawns after the final boss is defeated)
     *
     * @class
     * @extends ig.EntityExtended
     * @memeberof ig
     */
    ig.EntitySpaceSnail = ig.global.EntitySpaceSnail = ig.Character.extend({

        performance: 'dynamic',

        size: {
            x: 29,
            y: 30
        },

        animSheet: new ig.AnimationSheet( _c.PATH_TO_MEDIA + 'space-snail.gif', 29, 30 ),

        animSettings: {
            idle: {
                frameTime: 1,
                sequence: [0,1]
            }
        },

        initTypes: function() {

            this.parent();

            _ut.addType(ig.EntityExtended, this, 'checkAgainst', "PLAYER");

        }

    });

});