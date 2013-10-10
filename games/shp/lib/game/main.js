ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
    'game.levels.inventory'
)
.defines(function(){

MyGame = ig.Game.extend({
	
	init: function() {

        // set background color
        ig.game.clearColor = '#0066ff';

        // bind inputs
        ig.input.bind( ig.KEY.MOUSE1, 'leftButton' );

        ig.game.loadLevel( LevelInventory );

	},
	
	update: function() {
		// Update all entities and backgroundMaps
		this.parent();
		
		// Add your own, additional update code here
	}

});


// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
ig.main( '#canvas', MyGame, 60, 320, 240, 2 );

});
