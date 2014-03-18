ig.module(
    'game.entities.projectile-plasma'
)
.requires(
    'plusplus.abstractities.projectile'
)
.defines(function () {

    "use strict";

    var _c = ig.CONFIG;

    ig.EntityProjectilePlasma = ig.global.EntityProjectilePlasma = ig.Projectile.extend({

        collides: ig.EntityExtended.COLLIDES.LITE,

        size: {
            x: 20,
            y: 5
        },

        // plasma hurts
        damage: 1,

        // lasers eventually fade (like a particle)
        lifeDuration: 0.27,

        fadeBeforeDeathDuration: 0.1,

        // lasers ignore gravity
        gravityFactor: 0,

        // lasers have no friction
        friction: {
            x:0,
            y:0
        },

        maxVel: {
            x: 2000,
            y: 0
        },

        // lasers don't bounce
        bounciness: 0,

        // lasers stop if they hit a wall
        collisionKills: true,

        animSheet: new ig.AnimationSheet( _c.PATH_TO_MEDIA + 'projectile.gif', 20, 5),

        animSettings: {
            idle: {
                sequence: [0],
                frameTime: 1
            }
        }

    });

});