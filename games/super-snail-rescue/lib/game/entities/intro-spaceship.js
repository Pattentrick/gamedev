ig.module(
    'game.entities.intro-spaceship'
)
.requires(
    'plusplus.core.entity',
    'plusplus.abstractities.character',
    'plusplus.core.config'
)
.defines(function () {

    var _c  = ig.CONFIG;

    /**
     * A spaceships that lift off in scene 2 of the intro.
     *
     * @class
     * @extends ig.EntityExtended
     * @memeberof ig
     */
    ig.EntityIntroSpaceship = ig.global.EntityIntroSpaceship = ig.Character.extend({

        performance: 'dynamic',

        size: {
            x: 32,
            y: 16
        },

        /**
         * If ship is in liftoff position
         *
         * @type Boolean
         *
         */
        hasLiftoff: false,

        animSheet: new ig.AnimationSheet( _c.PATH_TO_MEDIA + 'player.png', 32, 16 ),

        animSettings: {
            idle: {
                frameTime: 0.3,
                sequence: [0,1]
            }
        },

        maxVelGrounded: {
            x: 50,
            y: 10
        },

        initProperties: function(){

            this.parent();

            this.timer = new ig.Timer();

        },

        updateChanges: function(){

            this.parent();

            if( !this.hasLiftoff ){

                this.moveToRight();

            }

            if( this.timer.delta() >= 8 ){
                console.log('load title');
            }

        },

        activate: function(){

            this.hasLiftoff = true;

            ig.game.camera.shake(4,3);

            this.animSettings.idle.frameTime = 0.3;

            this.moveToRight();
            this.moveToUp();

            this.maxVelGrounded = {
                x: 150,
                y: 50
            }

        }

    });

});