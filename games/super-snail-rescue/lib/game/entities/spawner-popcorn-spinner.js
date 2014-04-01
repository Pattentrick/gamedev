ig.module(
    'game.entities.spawner-popcorn-spinner'
)
.requires(
    'game.entities.enemy-popcorn-spinner',
    'plusplus.abstractities.spawner-character',
    'plusplus.core.config'
)
.defines(function () {

    var _c  = ig.CONFIG;

    /**
     * This spawner will spawn a wave of enemy popcorn spinners.
     *
     * @class
     * @extends ig.EntityExtended
     * @memeberof ig
     */
    ig.EntitySpawnerPopcornSpinner = ig.global.EntitySpawnerPopcornSpinner = ig.SpawnerCharacter.extend({

        collides: ig.Entity.COLLIDES.NEVER,

        spawningEntity: ig.EntityEnemyPopcornSpinner,

        spawnCountMax: 6,

        duration: 8,

        spawnAtSide: {
            x: 0,
            y: 0
        },

        suicidal: true

    });

});