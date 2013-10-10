ig.module(
	'game.entities.Shotgun'
)
.requires(
	'impact.entity',
    'game.entities.InventoryItem'
)
.defines(function(){

    EntityShotgun = EntityInventoryItem.extend({

        animSheet : new ig.AnimationSheet('media/shotgun.png', 16, 16),

        init: function( x, y, settings ) {

            this.parent( x, y, settings );

            this.addAnim('idle', 1, [0]);

        },

        update: function(){

            if ( ig.input.pressed('leftButton') && this.inFocus() ) {

                console.log('SHOTGUN');

            }

        }

    });

});