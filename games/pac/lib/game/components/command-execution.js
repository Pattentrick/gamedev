ig.module(
    'game.components.command-execution'
)
.requires(
    'plusplus.core.config'
)
.defines(function() {

    "use strict";

    var _c = ig.CONFIG;

    /**
     * Executes commands which are based of the interaction with the UI.
     *
     * If the Player selects a command, this command will be visible in
     * the command preview. The data from the command preview on the
     * other hand is needed for the final command execution.
     *
     * @class
     * @extends ig.Class
     * @memeberof ig
     */
    ig.CommandExecution = ig.Class.extend({

        // Flag is true when a full command
        // like "pick up axe" exists
        hasActiveCommand: false,

        playerCollidesWithEntity: false,

        collidingEntityName: '',

        init: function(){

            this.player = ig.game.getPlayer();

        },

        /**
         * Entrypoint for the execution of the current command.
         * Default command is "Gehe zu". Gets called every frame.
         */
        execute: function(){

            var currentCommand = ig.game.getEntitiesByClass(ig.CommandPreview)[0].currentCommand;
            var defaultCommand = ig.game.getEntitiesByClass(ig.CommandPreview)[0].defaultCommand;

            if( ig.input.pressed('click') ){

                if( this.isAbortionCommand() && currentCommand !== defaultCommand ){

                    this.removeCurrentCommand();

                }
                else {

                    // On valid command move the player, reset the entity name
                    // on a default command and check for an full active command

                    this.movePlayer();

                    this.resetNameOnDefaultCommand( currentCommand, defaultCommand );
                    this.checkForActiveCommand( currentCommand );

                }

            }

            this.assignCommand( currentCommand );

        },

        /**
         * Assigns the command to the specific method,
         * if the hasActiveCommand flag is set to true.
         *
         * @param {string} currentCommand The current command of the preview
         */
        assignCommand: function( currentCommand ){

            if( this.hasActiveCommand && ig.game.getEntitiesByClass(ig.CommandPreview)[0].entityName !== '' ){

                if( this.hasPlayerNearEntity() ){

                    switch( currentCommand ) {
                        case 'Nimm':
                            console.log('Nimm');
                        break;
                    }

                }

            }

        },

        hasPlayerNearEntity: function(){

            console.log(this.playerCollidesWithEntity && this.collidingEntityName === ig.game.getEntitiesByClass(ig.CommandPreview)[0].entityName);

            if( this.playerCollidesWithEntity && this.collidingEntityName === ig.game.getEntitiesByClass(ig.CommandPreview)[0].entityName ){

                this.playerCollidesWithEntity = false;
                this.collidingEntityName = '';

                return true;

            }

        },

        /**
         * Checks if the current command is the default command. If true
         * check if there are any interactive entity at the mouse position,
         * if not reset the entity name property of the command preview.
         *
         * @param {string} currentCommand The current command of the preview
         * @param {string} defaultCommand The default command of the preview
         */
        resetNameOnDefaultCommand: function( currentCommand, defaultCommand ){

            if( currentCommand === defaultCommand ){

                var entities = ig.game.entities;
                var match = false;

                for( var i = 0, len = ig.game.entities.length; i < len; i++ ){

                    if( this.entityIsinFocus( entities[i] )
                        && entities[i].name !== 'player'
                        && entities[i].name !== 'cursor'
                        && entities[i].name !== 'command'
                        && entities[i].name !== 'preview'){

                        match = false

                    }

                }

                if( !match ){
                    ig.game.getEntitiesByClass(ig.CommandPreview)[0].entityName = '';
                }

            }

        },

        /**
         * Sets the hasActiveCommand flag to true if
         * there is an full valid command, like
         * "use axe with monsterlemon" on an interactive entity.
         *
         * @param {string} currentCommand The current command of the preview
         */
        checkForActiveCommand: function( currentCommand ){

            if( currentCommand !== '' && ig.game.getEntitiesByClass(ig.CommandPreview)[0].entityName !== ''){

                this.hasActiveCommand = true;

            }

        },

        /**
         * Detects if the mouse cursor hovers over an entity
         *
         * @returns {boolean} true if entity is in focus
         * @param entity {object} entity to check against
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
         * If the player clicks inside the game world, and
         * at that position there is no entity, with the exception
         * of the cursor and the player, the command is a abortion
         * command.
         *
         * An abortion command will disable all current commands.
         *
         * returns {boolean} true on abortion command, otherwise false
         */
        isAbortionCommand: function(){

            var entities    = ig.game.entities;
            var isAbortion  = true;

            // iterate over all entitys. set isAbort
            // to false if one entity is found
            for( var i = 0, len = ig.game.entities.length; i < len; i++ ){

                if( this.entityIsinFocus( entities[i] )
                    && entities[i].name !== 'player'
                    && entities[i].name !== 'cursor'){

                    isAbortion = false;

                }

            }

            return isAbortion;

        },

        /**
         * Removes current commando and disable active command flag
         */
        removeCurrentCommand: function(){

            ig.game.getEntitiesByClass(ig.CommandPreview)[0].currentCommand = '';
            this.hasActiveCommand = false;

        },

        /**
         * Moves the player to the desired location via pathfinding
         */
        movePlayer: function(){

            if( this.isClickOnGameWorld() ){

                // second parameter are pathfinding settings
                this.player.moveTo({
                    x: ig.input.mouse.x + ig.game.screen.x,
                    y: ig.input.mouse.y + ig.game.screen.y
                }, {
                    avoidEntities: true
                });

            }

        },

        /**
         * Returns true if the user clicks inside
         * the game world instead of the UI.
         *
         * @returns {boolean}
         */
        isClickOnGameWorld: function(){

            return( ig.input.mouse.y + ig.game.screen.y <= 150 );

        }

    });

});