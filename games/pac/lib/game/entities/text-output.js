ig.module(
    'game.entities.text-output'
)
.requires(
    'plusplus.ui.ui-text-bubble',
    'plusplus.core.config'
)
.defines(function () {

	var _c  = ig.CONFIG;

    /**
     * Textoutput.
     *
     * @class
     * @extends ig.UITextBubble
     * @memeberof ig
     */
    ig.EntityTextOutput = ig.global.EntityTextOutput = ig.UITextBubble.extend({

        fixed: false,

        posAsPct: false,

        cornerRadius: 10,

        triangleLength: 0,

        textSettings: {

            text: 'Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor',
            font: new ig.Font( _c.PATH_TO_MEDIA + 'command_preview_font.png' )

        }
		
	});

});