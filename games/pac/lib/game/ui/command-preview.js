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

        // default text command
        defaultCommand: 'ÖGehe zu',

        // current activated command
        currentCommand: '',

        // text that will be displayed
        text: '',

        font: new ig.Font( _c.PATH_TO_MEDIA + 'command_preview_font.png' ),

        /**
         * Changes to text for UI display based on the
         * currently selected command. Falls back to the
         * default command if no command is selected
         */
        handleCommandPreview: function(){

            if( this.currentCommand === ''){
                this.text = this.defaultCommand;
            }
            else {
                this.text = this.currentCommand;
            }

        },

        /**
         * Centers the command preview inside the gamescreen.
         * Method needs to be called after the parent reposition
         * method for proper repositioning!
         */
        centerCommandPreview: function(){

            this.pos.x = ( _c.GAME_WIDTH_VIEW / 2 ) - ( this.size.x / 2 );

        },

        update: function(){

            this.parent();

            this.handleCommandPreview();

        },

        reposition: function(){

            this.parent();

            this.centerCommandPreview();

        }

	});

});