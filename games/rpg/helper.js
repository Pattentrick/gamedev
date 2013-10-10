// create/check namespace
var RPG = RPG || {};

/*
 * the helper module contains helpful
 * functions for the game
 *
 */
RPG.helper = (function(){

    return {

        /*
         * calculates the probability of a certain action
         *
         * @param  {string}  probabilityInPercent the probability in percentage
         * @return {boolean} true returns true if probability matched
         *
         */
        calculateProbability : function( probability ){

            var randomNumber1to100 = Math.floor( (Math.random()*100) +1);

            if( randomNumber1to100 <= probability ){
                return true;
            }

        }

    }

})();