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

        name: 'preview',

        performance: 'dynamic',

        // Default text command
        defaultCommand: 'Gehe zu',

        // Current activated command
        currentCommand: '',

        // Name of current active entity
        entityName: '',

        // Text that will be displayed
        text: '',

        hasActiveCommand: false,

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
         * Detects if the mouse cursor hovers over an entity
         *
         * @returns {boolean} true if entity is in focus
         * @param entity {object} entity to check against.
         */
        entityIsinFocus: function( entity ) {
            return (
                (entity.pos.x <= (ig.input.mouse.x + ig.game.screen.x)) &&
                    ((ig.input.mouse.x + ig.game.screen.x) <= entity.pos.x + entity.size.x) &&
                    (entity.pos.y <= (ig.input.mouse.y + ig.game.screen.y)) &&
                    ((ig.input.mouse.y + ig.game.screen.y) <= entity.pos.y + entity.size.y)
                );
        },

        /**
         * If the mouse hovers over an interactive entity set
         * entityName porperty to that entity name, else set
         * it to an empty string.
         */
        setEntityName: function(){

            var entities = ig.game.entities;
            var name = '';

            for( var i = 0, len = ig.game.entities.length; i < len; i++ ){

                if( this.entityIsinFocus( entities[i] )
                    && entities[i].name !== 'player'
                    && entities[i].name !== 'cursor'
                    && entities[i].name !== 'command'
                    && entities[i].name !== 'preview'){

                    name = entities[i].name;

                }

            }

            this.entityName = name;

        },

        /**
         * Changes to text for UI display based on the
         * currently selected command. Falls back to the
         * default command if no command is selected.
         */
        showCommandPreview: function(){

            if( this.currentCommand === ''){

                this.currentCommand = this.defaultCommand;

                this.text = this.currentCommand + ' ' + this.entityName;

            }
            else {
                this.text = this.currentCommand + ' ' + this.entityName;
            }

        },

        update: function(){

            this.parent();

            if( !ig.game.commandExecution.hasActiveCommand ){

                this.setEntityName();

            }

            this.showCommandPreview();

            // Execute player commands
            ig.game.commandExecution.execute();

        },

        reposition: function(){

            this.parent();

            this.centerCommandPreview();

        }

	});

});