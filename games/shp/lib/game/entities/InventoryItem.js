ig.module(
	'game.entities.InventoryItem'
)
.requires(
	'impact.entity'
)
.defines(function(){

    EntityInventoryItem = ig.Entity.extend({

        gravityFactor : 0,

        size: {
            x: 16,
            y: 16
        },

        inFocus: function() {
            return (
                (this.pos.x <= (ig.input.mouse.x + ig.game.screen.x)) &&
                    ((ig.input.mouse.x + ig.game.screen.x) <= this.pos.x + this.size.x) &&
                    (this.pos.y <= (ig.input.mouse.y + ig.game.screen.y)) &&
                    ((ig.input.mouse.y + ig.game.screen.y) <= this.pos.y + this.size.y)
                );
        }

    });

});