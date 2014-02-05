ig.module(
    'game.components.ssrloader'
)
.requires(
    'plusplus.core.loader'
)
.defines(function () {

    "use strict";

    var _utm = ig.utilsmath;

    /**
     * Custom loader.
     *
     * Overwriting the run method with just a
     * simple ig.game.run() will disable the fade
     *
     */
    ig.ssrLoader = ig.LoaderExtended.extend(/**@lends ig.LoaderExtended.prototype */{

        run: function () {

            var t     = Date.now() - this._endTime;
            var delay = 100;

            // Delay is needed for actually
            // seeing the bar reaching 100%
            if ( t < delay ) {

                this.draw();

            }
            else {

                ig.game.run();

                ig.system.setDelegate(ig.game);

            }

        }

    });

});
