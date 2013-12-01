ig.module(
    'game.ui.pacui'
)
.requires(
    'game.ui.cursor',
    // commands
    'game.ui.command-give',
    'game.ui.command-open',
    'game.ui.command-look',
    'game.ui.command-use',
    'game.ui.command-close',
    'game.ui.command-press',
    'game.ui.command-pickup',
    'game.ui.command-talk',
    'game.ui.command-pull',
    // command preview
    'game.ui.command-preview',
    // config
    'plusplus.core.config'
)
.defines(function() {

    "use strict";

    var _c = ig.CONFIG;

    /**
     * Spawns all parts of the UI like the
     * commands and the mouse cursor.
     *
     * Pacui stands for *P*oint *A*nd *C*lick *U*ser *I*nterface
     *
     * @class
     * @extends ig.Class
     * @memeberof ig
     */
    ig.Pacui = ig.Class.extend({

        /**
         * Spawns the commands, the command preview,
         * the mouse cursor and initializes the inventory
         */
        init: function(){

            // Commands
            this.spawnCommands();
            this.spawnCommandPreview();

            // Mousecursor
            this.spawnMouseCursor();

        },

        /**
         * Spawns all UI commandos like "talk", "pick up" or "open".
         *
         * @require game.ui.command-give
         *
         */
        spawnCommands: function(){

            // First row
            ig.game.spawnEntity(ig.CommandGive, 16, 161);
            ig.game.spawnEntity(ig.CommandOpen, 16, 171);
            ig.game.spawnEntity(ig.CommandLook, 16, 185);

            // Second row
            ig.game.spawnEntity(ig.CommandUse, 61, 161);
            ig.game.spawnEntity(ig.CommandClose, 61, 173);
            ig.game.spawnEntity(ig.CommandPress, 61, 185);

            // Third row
            ig.game.spawnEntity(ig.CommandPickUp, 117, 161);
            ig.game.spawnEntity(ig.CommandTalk, 117, 173);
            ig.game.spawnEntity(ig.CommandPull, 116, 185);

        },

        /**
         * Spawns an entity that displays the command preview
         *
         * @require game.ui.command-preview
         *
         */
        spawnCommandPreview: function(){

            ig.game.spawnEntity(ig.CommandPreview, 0, 149);

        },

        /**
         * Spawns an entity based mouse cursor.
         *
         * @require game.ui.cursor
         *
         */
        spawnMouseCursor: function(){

            ig.game.spawnEntity(ig.EntityCursor, 22, 33);

        }

    });

});