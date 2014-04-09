ig.module(
    'game.entities.enemy-turret'
)
.requires(
    'plusplus.core.config',
    'game.entities.enemy'
)
.defines(function () {

    'use strict';

    var _c  = ig.CONFIG;
    var _ut = ig.utils;

    /**
     * A static turret that can't move. Will shoot at the player if he is in range.
     *
     * @class
     * @extends ig.EntityExtended
     * @memeberof ig
     */
    ig.EntityEnemyTurret = ig.global.EntityEnemyTurret = ig.EntityEnemy.extend({

        size: {
            x: 12,
            y: 14
        },

        animSheet: new ig.AnimationSheet( _c.PATH_TO_MEDIA + 'enemy-turret.gif', 12, 14 ),

        animSettings: {
            idle: {
                frameTime: 1,
                sequence: [0]
            }
        }

    });

});