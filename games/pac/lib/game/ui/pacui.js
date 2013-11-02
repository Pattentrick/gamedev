ig.module(
    'game.ui.pacui'
)
.requires(
    'game.ui.cursor',
    // commands
    'game.ui.command-give',
    'game.ui.command-open',
    'game.ui.command-look',
    // config
    'plusplus.core.config'
)
.defines(function() {

    "use strict";

    var _c = ig.CONFIG;

    /**
     * Spawns all parts of the UI like the
     * commands, the mouse cursor and the
     * inventory
     *
     * Pacui stands for *P*oint *A*nd *C*lick *U*ser *I*nterface
     *
     * @class
     * @extends ig.Class
     * @memeberof ig
     */
    ig.Pacui = ig.Class.extend({

        init: function(){

            this.spawnCommands();
            this.spawnMouseCursor();
        },

        /**
         * Spawns all UI commandos like "talk", "pick up" or "open".
         *
         * @require game.ui.command-give
         *
         */
        spawnCommands: function(){

            ig.game.spawnEntity(ig.CommandGive, 16, 157);
            ig.game.spawnEntity(ig.CommandOpen, 16, 167);
            ig.game.spawnEntity(ig.CommandLook, 16, 181);

        },

        /**
         * Spawns an entity based mouse cursor.
         *
         * @require plusplus.core.config
         *
         */
        spawnMouseCursor: function(){

            ig.game.spawnEntity(ig.EntityCursor, 0, 0);

        }

    });

});