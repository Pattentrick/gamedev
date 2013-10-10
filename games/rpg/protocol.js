// create/check namespace
var RPG = RPG || {};

$(function(){

    /*
     * the protocol displays the action in the game
     *
     * @return {function} addMessage function for adding messages to the protocol
     * @return {function} init initializes the protocol
     *
     */
    RPG.protocol = (function(){

        var protocol = {

            output : $('.protocol'),

            /*
             * adds message to the output box
             *
             * @param {string} message the message that will be added
             * @param {string} color   the color of the message
             *
             */
            addMessage : function( message, color ){

                protocol.output.append('<p class="' + color + '">' + message + '</p>');

                // scroll to bottom of the protocol
                protocol.output.scrollTop(
                    protocol.output[0].scrollHeight - protocol.output.height()
                );

            }

        };

        return {

            addMessage : protocol.addMessage,

            init : function(){

                protocol.addMessage( RPG.message[0], 'white' );

            }

        }

    })();

});