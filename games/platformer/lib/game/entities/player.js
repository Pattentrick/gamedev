ig.module(
    'game.entities.player'
)
.requires(
    'impact.entity',
    'impact.sound',
    'game.entities.crate',
    'game.entities.movingPlatform'
)
.defines(function(){

    EntityPlayer = ig.Entity.extend({

        // add player sprites
        animSheet : new ig.AnimationSheet('media/player.png', 16, 18),

        // add sound
        jumpSFX : new ig.Sound( 'media/sounds/jump.*' ),
        blobSFX : new ig.Sound( 'media/sounds/blob.*' ),

        // set size/offset of player
        size : {
            x : 13,
            y : 15
        },

        offset : {
            x : 3,
            y : 3
        },

        flip : false,

        // player max speed when moving
        maxVel : {
            x : 80,
            y : 150
        },

        // stops the player once moving
        friction : {
            x : 500,
            y : 0
        },

        accelGround: 400,

        accelAir : 200,

        jump : 200,

        zIndex : 2,

        type : ig.Entity.TYPE.A,

        checkAgainst : ig.Entity.TYPE.A,

        collides : ig.Entity.COLLIDES.ACTIVE,

        hasKey : false,

        isInPushingMode : false,

        isOnMovingPlattform : true,

        crate : null,

        init : function( x, y, settings ){

            this.parent( x, y, settings );

            this.setPlayerAnimSheets();

            // set sound volume
            this.jumpSFX.volume = 0.1;
            this.blobSFX.volume = 0.2;

        },

        setPlayerAnimSheets : function(){

            // set animation
            this.addAnim('idle', 0.2, [0,1,2,3] );
            this.addAnim('run', 0.2, [4,5,6,7] );

            this.addAnim('jump', 0.3, [8,9,10,11] );

            this.addAnim('fall', 1, [11] );

            // pushing
            // this.addAnim('pushing', 0.5, [13,14]);
            // this.addAnim('pushingStart', 1, [14]);

        },

        movePlayer : function(){

            var accel = this.standing ? this.accelGround : this.accelAir;

            // left/right movement based on acceleration
            if( ig.input.state('left') ) {

                this.accel.x = -accel;

                this.flip = true;

            }
            else if( ig.input.state('right') ) {

                this.accel.x = accel;

                this.flip = false;

            }
            else{
                this.accel.x = 0;
            }

            // jump
            if( this.standing && ig.input.pressed('jump') ) {

                this.vel.y = -this.jump;

                this.jumpSFX.play();

            }

        },

        setPlayerAnimations : function(){

            // set the current animation, based on the player's speed
            if( this.vel.y < 0  && !this.isOnMovingPlattform ) {
                this.currentAnim = this.anims.jump;
            }
            else if( this.vel.y > 0 && !this.isOnMovingPlattform ) {

                this.currentAnim = this.anims.fall;
                this.anims.jump.rewind();

            }
            else if( this.vel.x != 0 && this.standing ) {
                this.currentAnim = this.anims.run;
            }
            else{

                if( this.standing ){
                    this.currentAnim = this.anims.idle;
                }

            }

            this.currentAnim.flip.x = this.flip;

        },

        collideWith : function( other, axis ){

            if( other instanceof EntityCrate && axis === 'x' ){

                this.isInPushingMode = true;
                this.crate = other;

            }

            if( other instanceof EntityMovingPlatform === false ){

                this.isOnMovingPlattform = false;

            }

            // player bounces off the blob (like a trampoline)
            if( other instanceof EntityBlob && axis === 'y' ){

                this.maxVel.y = 1000;
                this.vel.y = -220;

                this.blobSFX.play();

                other.currentAnim = other.anims.blobs.rewind();

            }

            this.parent();

        },

        // pushing mode works most of the time, but is sometimes buggy ...
        handlePushingMode : function(){

            var accel = this.standing ? this.accelGround : this.accelAir;

            // if the crate is not on the ground, exit pushing mode
            if( this.crate.standing === false ){

                this.isInPushingMode = false;

            }
            else {

                // if the player jumps, or moves in a different direction
                // as the crate, exit pushing mode ...

                // move left
                if( ig.input.state('left') && this.flip === false ) {

                    this.accel.x = -accel;
                    this.flip = true;

                    this.isInPushingMode = false;

                }
                // move right
                else if( ig.input.state('right') && this.flip === true ) {

                    this.accel.x = accel;
                    this.flip = false;

                    this.isInPushingMode = false;

                }
                else {
                    this.accel.x = 0;
                }

                // jump
                if( this.standing && ig.input.pressed('jump') ) {

                    this.vel.y = - this.jump;
                    this.jumpSFX.play();

                    this.isInPushingMode = false;

                }

                // make jumps over the crate possible
                if( ig.input.state('jump') && ig.input.state('right')  ) {

                    this.accel.x = accel;
                    this.isInPushingMode = false;

                }
                else if( ig.input.state('jump') && ig.input.state('left') ){

                    this.accel.x = -accel;
                    this.isInPushingMode = false;

                }

                // move the crate together with the player, if the
                // player presses in the direction of the crate ...
                if( ig.input.state('right') && this.flip === false && this.standing ) {

                    this.crate.vel.x = 40;
                    this.vel.x = 40;

                }
                else if( ig.input.state('left') && this.flip && this.standing ) {

                    this.crate.vel.x = -40;
                    this.vel.x = -40;

                }

            }

        },

        kill : function(){

            this.parent();

            // death animation
            ig.game.spawnEntity( EntityDeathExplosion, this.pos.x, this.pos.y )

        },

        update : function(){

            if( this.isInPushingMode ){

                this.handlePushingMode();

            }
            else {
                this.movePlayer();
            }

            this.setPlayerAnimations();

            // set to false to avoid unwanted animations in midair
            this.isOnMovingPlattform = false;

            // set default max y.velocity when falling (needed for trampoline/blob)
            if( this.vel.y > 0 ){
                this.maxVel.y = 150;
            }

            this.parent();

        }

    });

    EntityDeathExplosion = ig.Entity.extend({

            lifetime: 1,
            callBack: null,
            particles: 50,

            init: function( x, y, settings ) {

                this.parent( x, y, settings );

                for( var i = 0; i < this.particles; i++ ) {

                    ig.game.spawnEntity( EntityDeathExplosionParticle, x, y, {
                        colorOffset: settings.colorOffset ? settings.colorOffset : 0
                    });

                    this.idleTimer = new ig.Timer();

                }

            },

            update: function() {

                if( this.idleTimer.delta() > this.lifetime ) {

                    this.kill();

                    if(this.callBack) {

                        this.callBack();
                        return;

                    }

                }
            }

    });

    EntityDeathExplosionParticle = ig.Entity.extend({

            size: {
                x: 2,
                y: 2
            },

            maxVel: {
                x: 160,
                y: 200
            },

            lifetime: 2,

            fadetime: 1,

            bounciness: 0,

            vel: {
                x: 100,
                y: 30
            },

            friction: {
                x : 100,
                y: 0
            },

            collides: ig.Entity.COLLIDES.LITE,

            colorOffset: 0,

            totalColors: 7,

            animSheet: new ig.AnimationSheet( 'media/blood.png', 2, 2 ),

            init: function( x, y, settings ) {

                this.parent( x, y, settings );

                var frameID = Math.round(Math.random()*this.totalColors) + (this.colorOffset * (this.totalColors+1));

                this.addAnim( 'idle', 0.2, [frameID] );

                this.vel.x = (Math.random() * 2 - 1) * this.vel.x;
                this.vel.y = (Math.random() * 2 - 1) * this.vel.y;

                this.idleTimer = new ig.Timer();
            },

            update: function() {

                if( this.idleTimer.delta() > this.lifetime ) {

                    this.kill();

                    // reload level
                    lvl.reload();

                }

                this.currentAnim.alpha = this.idleTimer.delta().map(
                    this.lifetime - this.fadetime, this.lifetime,
                    1, 0
                );

                this.parent();
            }

    });

});