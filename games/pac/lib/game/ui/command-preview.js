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

        size: {
            x: 320,
            y: 10
        },

        performance: "dynamic",

        text: 'Gehe zu',

        font: new ig.Font( _c.PATH_TO_MEDIA + 'command_preview_font.png' ),

        update: function(){
            //console.log( this.textAlign );
        }

	});

});