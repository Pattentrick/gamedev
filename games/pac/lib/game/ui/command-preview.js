ig.module(
    'game.ui.command-preview'
)
.requires(
    'plusplus.core.config',
    'plusplus.ui.ui-text'
)
.defines(function () {

	var _c  = ig.CONFIG;

    /**
     * Entity that shows a preview of the selected
     * commands e.g "talk to bartender". Part of the Ui.
     *
     * @class
     * @extends ig.UIText
     * @memeberof ig
     */
    ig.CommandPreview = ig.global.CommandPreview = ig.UIText.extend({

        performance: "dynamic",

        // Default text command
        defaultCommand: 'Gehe zu',

        // Current activated command
        currentCommand: '',

        // Text that will be displayed
        text: '',

        font: new ig.Font( _c.PATH_TO_MEDIA + 'command_preview_font.png' ),

        /**
         * Centers the command preview inside the gamescreen.
         * Method needs to be called after the parent reposition
         * method for proper repositioning!
         *
         * Collin Hover suggested to use posPct to center this
         * UI element. However this will render the element
         * from the center, not at the center.
         *
         */
        centerCommandPreview: function(){

            this.pos.x = ( _c.GAME_WIDTH_VIEW / 2 ) - ( this.size.x / 2 );

        },

        /**
         * Changes to text for UI display based on the
         * currently selected command. Falls back to the
         * default command if no command is selected
         */
        showCommandPreview: function(){

            if( this.currentCommand === ''){

                this.currentCommand = this.defaultCommand;
                this.text = this.currentCommand;

            }
            else {
                this.text = this.currentCommand;
            }

        },

        update: function(){

            this.parent();

            if ( ig.input.pressed('click') ) {

                ig.game.commandExecution.execute();

            }

            this.showCommandPreview();

        },

        reposition: function(){

            this.parent();

            this.centerCommandPreview();

        }

	});

});