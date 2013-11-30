ig.module(
        'plusplus.config-user'
    )
    .defines(function () {

        /**
         * User configuration of Impact++.
         * <span class="alert alert-info"><strong>Tip:</strong> it is recommended to modify this configuration file!</span>
         * @example
         * // in order to add your own custom configuration to Impact++
         * // edit the file defining ig.CONFIG_USER, 'plusplus/config-user.js'
         * // ig.CONFIG_USER is never modified by Impact++ (it is strictly for your use)
         * // ig.CONFIG_USER is automatically merged over Impact++'s config
         * @static
         * @readonly
         * @memberof ig
         * @namespace ig.CONFIG_USER
         * @author Collin Hover - collinhover.com
         **/
        ig.CONFIG_USER = {

            // set to true for a top down game
            TOP_DOWN: true,

            // enable fullscreen
            GAME_WIDTH_PCT: 1,
            GAME_HEIGHT_PCT: 1,

            // start resolution that will be dynamically scaled
            GAME_WIDTH_VIEW: 320,
            GAME_HEIGHT_VIEW: 200,

            // show transition between levels
            TRANSITION_LEVELS: false,

            // camera settings
            CAMERA: {
                AUTO_FOLLOW_PLAYER : false
            },

            // character movement speed
            CHARACTER: {
                MAX_VEL_GROUNDED_Y: 30,
                MAX_VEL_GROUNDED_X: 30
            }

        };

    });