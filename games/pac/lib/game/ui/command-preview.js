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

        font: new ig.Font( _c.PATH_TO_MEDIA + 'command_preview_font.png' ),

        /**
         * Centers the command preview inside the gamescreen.
         * Method needs to be called after the parent reposition
         * method for proper repositioning!
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
         *
         * Does nothing if there is an active command.
         *
         */
        declareEntityName: function(){

            var entities = ig.game.entities;
            var name = '';

            if( !ig.game.commandExecution.hasActiveCommand ){

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

            }

        },

        /**
         * Changes to text for UI display based on the
         * currently selected command and the active entity.
         * Falls back to the default command if no command
         * is selected.
         */
        showCommandPreview: function(){

            if( this.currentCommand === '' ){

                this.currentCommand = this.defaultCommand;

                // Assigning a value to this.text will draw the value
                this.text = this.currentCommand + ' ' + this.entityName;

            }
            else {

                // Modify text preview on certain commands for proper grammar

                if( this.currentCommand === 'Schau' && this.entityName !== '' ){

                    this.text = this.currentCommand + ' ' + this.entityName + ' an';

                }
                else if( this.currentCommand === 'Rede' && this.entityName !== '' ){

                    this.text = this.currentCommand + ' mit ' + this.entityName;

                }
                else{

                    this.text = this.currentCommand + ' ' + this.entityName;

                }

            }

        },

        /**
         * Sets entityName property to name
         *
         * @param {string} name Name of entity
         *
         */
        setEntityName: function( name ){

            this.entityName = name;

        },

        /**
         * Sets the currentCommand property to command
         *
         * @param {string} command Name of command
         *
         */
        setCurrentCommand: function( command ){

            this.currentCommand = command;

        },

        update: function(){

            this.parent();

            this.declareEntityName();
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