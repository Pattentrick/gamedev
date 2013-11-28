ig.module(
    'game.entities.text-output'
)
.requires(
    'plusplus.ui.ui-text-box',
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
    ig.EntityTextOutput = ig.global.EntityTextOutput = ig.UITextBox.extend({

        name: 'textbox',

        fixed: false,

        posAsPct: false,

        cornerRadius: 5,

        pixelPerfect: true

    });

});