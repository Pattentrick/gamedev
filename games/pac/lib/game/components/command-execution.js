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

        // True when a full command like "pick up axe" exists
        hasActiveCommand: false,

        init: function(){

            this.player =  ig.game.getPlayer();

        },

        execute: function(){

            var currentCommand   = ig.game.getEntitiesByClass(ig.CommandPreview)[0].currentCommand;
            var entityName       = ig.game.getEntitiesByClass(ig.CommandPreview)[0].entityName;

            if( ig.input.pressed('click') ){

                if( this.isAbortionCommand() && currentCommand !== 'Gehe zu' ){

                    // Abort command, no executable command
                    this.removeCurrentCommand();
                    this.hasActiveCommand = false;

                }
                else {

                    // Move player on valid command
                    this.movePlayer();

                    if( currentCommand === 'Gehe zu' ){

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

                        if(!match){
                            entityName = '';
                            ig.game.getEntitiesByClass(ig.CommandPreview)[0].entityName = '';
                        }

                    }

                    if( currentCommand !== '' && entityName !== ''){

                        // Set to true if valid command gets applied to an entity
                        this.hasActiveCommand = true;

                    }

                }

            }

            if( this.hasActiveCommand && entityName !== '' ){

                if( currentCommand === 'Nimm' ){
                    console.log('Nimm');
                }

                if( currentCommand === 'Gehe zu' ){

                }

            }

        },

        /**
         * Handles how to pick up items
         *
         * @param {string} entityName The name of the entity to pick up
         */
        pickup: function( entityName ){
            console.log(entityName);
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
         * Removes current commando
         */
        removeCurrentCommand: function(){

            ig.game.getEntitiesByClass(ig.CommandPreview)[0].currentCommand = '';

        },

        /**
         * Moves the player to the desired location via pathfinding
         */
        movePlayer: function(){

            // second parameter are pathfinding settings
            this.player.moveTo({
                x: ig.input.mouse.x + ig.game.screen.x,
                y: ig.input.mouse.y + ig.game.screen.y
            }, {
                avoidEntities: true
            });

        }

    });

});