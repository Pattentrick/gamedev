/*
 * the commands module handles the
 * command ui.
 */
RPG.commands = (function(){

    var commandInfo = $('.commands .command-info');

    // eventhandling
    $(document).on('mouseover', '.commands button', function() {
        commands.showcommandInfo( this );
    });

    $(document).on('mouseout', '.commands button', function() {
        commands.clearcommandInfo();
    });

    var commands = {

        /*
         * shows contextual information on the command
         *
         * @param {object} domReference the current target of the mouse event
         *
         */
        showcommandInfo : function( domReference ){

            if( $(domReference).attr('data-status') === 'inactive' ){

                if( $(domReference).hasClass('drink-potion') ){
                    commandInfo.text( '[Keine Tränke vorhanden] ' + $(domReference).attr('data-description') );
                }
                else {
                    commandInfo.text( '[Noch nicht bereit] ' + $(domReference).attr('data-description') );
                }

            }
            else {
                commandInfo.text( $(domReference).attr('data-description') );
            }

        },
        /*
         * clears the text after mouseout
         */
        clearcommandInfo: function(){
            commandInfo.text('');
        }

    };

})();