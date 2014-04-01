ig.module(
    'game.entities.level-scroller'
)
.requires(
    'plusplus.core.entity',
    'plusplus.abstractities.character',
    'plusplus.core.config'
)
.defines(function () {

    var _c  = ig.CONFIG;

    /**
     * An entity which functions as a core game mechanic. The level scoller
     * entity moves slowly through a level. The camera follows the level
     * scroller, so the level has an autoscrolling behaviour.
     *
     * @class
     * @extends ig.EntityExtended
     * @memeberof ig
     */
    ig.EntityLevelScroller = ig.global.EntityLevelScroller = ig.Character.extend({

        name: 'levelScroller',

        performance: 'dynamic',

        size: {
            x: 8,
            y: 8
        },

        maxVelGrounded: {
            x: 50,
            y: 0
        },

        updateChanges: function(){

            this.parent();

            this.moveToRight();

        }

    });

});