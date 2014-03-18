ig.module(
    'game.abilities.plasma-gun'
)
.requires(
    'plusplus.abilities.ability-shoot',
    'game.entities.projectile-plasma'
)
.defines(function () {

    "use strict";

    ig.PlasmaGun = ig.AbilityShoot.extend({

        spawningEntity: ig.EntityProjectilePlasma,

        offsetVelX: 1000,

        cooldownDelay: 0.3

    });

});