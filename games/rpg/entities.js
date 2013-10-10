// create/check namespace
var RPG = RPG || {};

$(function(){

    /*
     * the entities modules contains all entities, like
     * the player, the monster and NPCs
     *
     * @return {function} init initializes the entities module
     *
     */
    RPG.entities = (function(){
        
        /*
         * event handling ...
         */            
        
        // attack with sword 
        $('.use-sword').click(function(){
            player.attack( 'sword' );
            player.handleCooldown( 'swordAttack');
        });
        
        // look around
        $('.look-around').click(function(){
            player.lookAround();
            player.handleCooldown( 'look-around' );
        });

        // drink potion
        $('.drink-potion').click(function(){
            player.drinkPotion( 'healthPotion', this );
        });

        // hard blow
        $(document).on('click', '.skillHardBlow', function() {
            player.useSkill('hardBlow', this);
        });

        // heal spell
        $(document).on('click', '.heal', function() {
            player.useSkill('heal', this);
        });

        // retry
        $('.retry').click(function(){
            location.reload();
        });
        
        /*
         * the player object represents the hero of the game
         */            
        var player = {
            
            name : "",
            
            level : 1,
            
            exp : 0,

            monsterDefeated: 0,

            potionsFound: 0,
            
            healthMax : 10,
                           
            healthMin :  0,
            
            healthNow  : 10,
            
            swordDamage : 2,

            healthPotion: 0,

            lvlCaps : [8,25,80,130,200,300,500,800,1000,1200,1400],

            lastLvlCap : 0,
            
            isInBattle : false,
            
            currentEnemy : '',

            /*
             * check if there is any loot, after the monster
             * is defeated.
             */
            checkForLoot : function(){

                // check for potion
                if( RPG.helper.calculateProbability( 20 ) ){

                    RPG.protocol.addMessage(RPG.message[1], 'white');
                    RPG.protocol.addMessage(RPG.message[2], 'green');

                    player.addItemToInventory( 'healthPotion' );

                    // increase potion counter
                    player.potionsFound++;

                }

            },

            addItemToInventory : function( item ){

                switch( item ){
                    case 'healthPotion':

                        // add health potion
                        player.healthPotion++;

                        // update inventory
                        $('.number-of-potions').text( player.healthPotion );

                        if( player.healthPotion > 0 ){
                            $('.drink-potion').attr('data-status', 'active').removeClass('inactive');
                        }

                    break;
                }

            },

            removeItemFromInventory : function( item ){

                switch( item ){
                    case 'healthPotion':

                        player.healthPotion = player.healthPotion - 1;

                        if( player.healthPotion <= 0){

                            $('.drink-potion').attr('data-status', 'inactive').addClass('inactive');

                        }

                        player.updateInventory();

                    break;
                }

            },

            updateInventory : function(){

                $('.number-of-potions').text( player.healthPotion );

            },

            /*
             * the player drinks a potion
             *
             * @param {string} kindOfPotion the kind of potion the player drinks
             * @param {object} domReference the current target of the mouse event
             */
            drinkPotion : function( kindOfPotion, domReference ){

                if( $(domReference).attr('data-status') === 'active' ){

                    switch( kindOfPotion ){
                        case 'healthPotion':

                            if( player.healthNow === player.healthMax ){
                                RPG.protocol.addMessage(RPG.message[3],'white');
                            }
                            else {

                                player.healthNow = player.healthNow + 5;

                                if( player.healthNow > player.healthMax ){
                                    player.healthNow = player.healthMax;
                                }

                                player.updateStats();

                                RPG.protocol.addMessage(RPG.message[4], 'white');
                                RPG.protocol.addMessage(RPG.message[5], 'green');

                                player.removeItemFromInventory( 'healthPotion' );

                                // update health bar
                                player.updateHealthBar();

                            }

                        break;
                    }

                }

            },

            /*
             * player uses a special skill
             *
             * @param {string} skillName name of skill
             * @param {object} domReference the current target of the mouse event
             *
             */
            useSkill : function( skillName, domReference ){

                if( $(domReference).attr('data-status') === 'active' ){

                    if( skillName === 'hardBlow' ){

                        if( player.isInBattle === false){
                            RPG.protocol.addMessage(RPG.message[6], 'white');
                        }
                        else {

                            // attr returns string, parse to number
                            if( parseInt( $('.skillHardBlow').attr('data-cooldown-counter'), 10 ) === 0 ){

                                $('.skillHardBlow').addClass('inactive').attr('data-status','inactive').attr('data-cooldown-counter', 5);

                                RPG.protocol.addMessage(RPG.message[7], 'green');

                                // do twice the sword damage
                                player.calculatePlayerDamage( (player.swordDamage * 2), player.currentEnemy );

                            }

                        }

                    }

                    if( skillName === 'heal' ){

                        if( player.healthNow === player.healthMax){
                            RPG.protocol.addMessage(RPG.message[8], 'white');
                        }
                        else {

                            // attr returns string, parse to number
                            if( parseInt( $('.heal').attr('data-cooldown-counter'), 10 ) === 0 ){

                                $('.heal').addClass('inactive').attr('data-cooldown-counter', 5).attr('data-status','inactive');;

                                player.healthNow = player.healthNow + (player.level + 2);

                                if( player.healthNow > player.healthMax ){
                                    player.healthNow = player.healthMax;
                                }

                                player.updateStats();

                                // update health bar
                                player.updateHealthBar();

                                RPG.protocol.addMessage(RPG.message[9] + (player.level + 2) + RPG.message[10], 'green');

                            }

                        }

                    }

                }

            },

            /*
             * handles cooldowns on abiliities
             *
             * @param {string} action action that handles the cooldown
             *
             */
            handleCooldown : function( action ){

                if( action === 'swordAttack' && player.isInBattle ){
                    player.calculateNewCooldown();
                }

                if( action === 'look-around' && player.isInBattle === false ){
                    player.calculateNewCooldown();
                }

            },

            calculateNewCooldown : function(){

                var btnWithCooldown = $('button[data-cooldown-counter]');

                btnWithCooldown.each(function(){

                    if( $(this).attr('data-cooldown-counter') > 0 ){

                        $(this).attr('data-cooldown-counter', ( parseInt( $(this).attr('data-cooldown-counter'),10 ) - 1 ) );

                        if( parseInt($(this).attr('data-cooldown-counter'),10) === 0 ){
                            $(this).removeClass('inactive').addClass('active').attr('data-status','active');
                        }

                    }

                });

            },

            setCurrentEnemy : function(){

                // the number after * indicates the max range
                var randomNumber = Math.floor( (Math.random()*3) +1 );

                // level 1 / level 2 monster
                if( player.level < 3 ){

                    switch( randomNumber ){
                        case 1:
                            player.currentEnemy = new InfernoZwerg();
                            RPG.protocol.addMessage('Du siehst Flammen, es riecht verbrannt, ein kreischender Infernozwerg stürmt auf dich zu!' , 'red');
                        break;
                        case 2:
                            player.currentEnemy = new Bronzegolem();
                            RPG.protocol.addMessage('Der Boden zittert, Staub rieselt von der Decke, ein grimmiger Bronzegolem steht vor dir!' , 'red');
                        break;
                        case 3:
                            player.currentEnemy = new SkelettKrieger();
                            RPG.protocol.addMessage('Du siehst dich um und bemerkst ein Skelett, bewaffnet mit Schwert und Schild, das sich laut klappernd in deine Richtung bewegt.' , 'red');
                        break;
                    }

                }

                // level 3 / level 4 monster
                if( player.level === 3 || player.level === 4 ){

                    switch( randomNumber ){
                        case 1:
                            player.currentEnemy = new Ork();
                            RPG.protocol.addMessage('Ein wilder Ork springt dich von der Seite an!' , 'red');
                            break;
                        case 2:
                            player.currentEnemy = new Zombie();
                            RPG.protocol.addMessage('Ein Zombie erscheint!' , 'red');
                            break;
                        case 3:
                            player.currentEnemy = new Goblin();
                            RPG.protocol.addMessage('Ein Goblin erscheint!' , 'red');
                            break;
                    }

                }

                // level 5 / level 6 monster
                if( player.level === 5 || player.level === 6 || player.level > 6 ){

                    switch( randomNumber ){
                        case 1:
                            player.currentEnemy = new Gargoyle();
                            RPG.protocol.addMessage('Ein Gargoyle erscheint!' , 'red');
                            break;
                        case 2:
                            player.currentEnemy = new Mumie();
                            RPG.protocol.addMessage('Eine Mumie erscheint!' , 'red');
                            break;
                        case 3:
                            player.currentEnemy = new Minotaurus();
                            RPG.protocol.addMessage('Ein Minotaurus erscheint!' , 'red');
                            break;
                    }

                }

                RPG.protocol.addMessage('Verteidige dich!' , 'red');

            },

            lookAround : function(){

                if ( player.isInBattle ){
                    
                    RPG.protocol.addMessage('Du versuchst dich weiter umzusehen, aber das Monster versperrt dir den Weg. ', 'white');
                    
                }
                else {

                    // set to true if something happens
                    var isDungeonEvent = false;

                    // find fairy
                    if( player.healthNow < player.healthMax ){

                        if( RPG.helper.calculateProbability( 1 ) && isDungeonEvent === false ){

                            isDungeonEvent = true;

                            RPG.protocol.addMessage('In der Dunkelheit siehst du ein weißes Licht glimmen. Du gehst näher heran und siehst eine Fee, die verspielt in einen Gang herumfliegt. Die Fee bemerkt deine Anwesenheit. Aus Bewunderung, das du dich in dieses Verlies getraut hast, heilt sie alle deine Wunden.', 'white');
                            RPG.protocol.addMessage('Du besitzt wieder volle HP.', 'green');

                            player.healthNow = player.healthMax;

                            player.updateStats();

                            player.updateHealthBar();

                        }

                    }

                    // find small health potion
                    if( RPG.helper.calculateProbability( 15 ) && isDungeonEvent === false ){

                        isDungeonEvent = true;

                        RPG.protocol.addMessage('Vorsichtig schaust du dich im dunklen Verlies um. Im Schein der Fackeln siehst du eine kleine Schatulle auf den Boden liegen. Behutsam öffnest du diese und findest, zu deiner Freude, einen Heiltrank!', 'white');
                        RPG.protocol.addMessage('Du erhältst einen Heiltrank.', 'green');

                        player.addItemToInventory( 'healthPotion' );

                        player.updateInventory();

                        // increase potion counter
                        player.potionsFound++;

                    }

                    // find scroll of wisdom
                    if( RPG.helper.calculateProbability( 15 ) && isDungeonEvent === false ){

                        var expBonus = 1 + player.level;

                        isDungeonEvent = true;

                        RPG.protocol.addMessage('In der Bibliothek des Verlieses findest du ein altes, mit staubbedecktes, Buch mit dem Titel „Monsterkampf für Fortgeschrittene“. Nach der Lektüre dieser alten Kampfkünste, fühlst du dich besser vorbereitet auf den nächsten Kampf.', 'white');
                        RPG.protocol.addMessage('Du erhältst ' + expBonus + ' Erfahrungspunkte.', 'green' );

                        player.exp = player.exp + expBonus;

                        // lvl up?
                        player.checkForLevelUp();

                    }

                    // small trap
                    if( RPG.helper.calculateProbability( 10 ) && isDungeonEvent === false ){

                        isDungeonEvent = true;

                        RPG.protocol.addMessage('Du löst versehentlich einen versteckten Mechanismus aus. Du siehst noch wie kleine Dolche aus einer Öffnung in der Wand auf dich zufliegen, kannst aber unmöglich ausweichen.', 'red');
                        RPG.protocol.addMessage('Du erleidest 2 Schaden.', 'red');

                        player.sufferTrapDamage( 2 );

                    }

                    // big trap
                    if( RPG.helper.calculateProbability( 1 ) && isDungeonEvent === false ){

                        isDungeonEvent = true;

                        RPG.protocol.addMessage('Im Verlies ist es stockdunkel, darum übersiehst du einen Stolperdraht und löst eine Falle aus. An Ritzen in der Wand tritt plötzlich Gas aus. Noch bevor du gemerkt hast was passiert, hast du den gifitgen Nebel bereits eingeatmet.', 'red');
                        RPG.protocol.addMessage('Du erleidest 4 Schaden.', 'red');

                        player.sufferTrapDamage( 4 );

                    }

                    // if no dungeon event is triggered, trigger fight with a monster
                    if(!isDungeonEvent){

                        player.setCurrentEnemy();

                        player.isInBattle = true;

                        // show monster stats
                        player.currentEnemy.initMonsterStats();

                    }
                        
                }
                 
            },

            /*
             * player gets trap damagae
             *
             * @param {number} damage amount of damage taken
             *
             */
            sufferTrapDamage : function( damage ){

                player.healthNow = player.healthNow - damage;

                // if the monster kills the hero
                if( player.healthNow <= 0 ){

                    RPG.protocol.addMessage('Du erliegst deinen Verletzungen ... du bist tot.', 'red');

                    $('.commands').children().remove();

                    // show monsters killed/potions found
                    player.onDeath();

                }

                player.updateStats();
                player.updateHealthBar();

            },
            
            /*
             * attack of the player
             *
             * @param {string} attackType type of attack
             */
            attack : function( attackType ){
                
                if ( player.isInBattle ){

                    if( attackType === 'sword'){
                        player.calculatePlayerDamage( player.swordDamage, player.currentEnemy );
                    }
                        
                }
                else {
                   RPG.protocol.addMessage('Du schwingst dein Schwert, aber es ist niemand zum kämpfen da ...', 'white'); 
                }                
                     
            },
            
            /*
             * calculates the damage, that the player deals
             * to monsters.
             * 
             * @param {number} damage     damage that the player deals
             * @param {string} monster    name of the monster, which gets the damage
             * 
             */
            calculatePlayerDamage : function( damage, monster ){

                // misses blow
                if( RPG.helper.calculateProbability( 10 ) ){
                    RPG.protocol.addMessage('Du schlägst zu, aber dein Gegner weicht geschickt aus.', 'green' );
                }
                else {

                    // critical blow
                    if( RPG.helper.calculateProbability( 10 ) ){

                        var bonus = 1;

                        RPG.protocol.addMessage('Kritischer Treffer: Du fügst deinen Gegner ' + (damage + bonus) + ' Schaden zu!', 'green' );

                        // reduce monster health
                        monster.healthNow = monster.healthNow - (damage + bonus);

                        if ( monster.healthNow <= 0 ){
                            monster.healthNow = 0;
                        }

                    }
                    else {

                        RPG.protocol.addMessage('Du verursachst ' + damage + ' Schaden.', 'green' );

                        // reduce monster health
                        monster.healthNow = monster.healthNow - damage;

                        if ( monster.healthNow <= 0 ){
                            monster.healthNow = 0;
                        }

                    }

                    // update monster health bar
                    monster.updateHealthBar();

                    // update monster stats
                    monster.updateStats();

                }
                
                // if monster is killed
                if ( monster.healthNow <= 0 ){

                   // reset monster healthbar
                   $('.monster-stats .inner-health-bar').animate({width:90});

                   player.handlePlayerVictory( monster );

                }
                else {
                    
                    // monster attacks
                    player.currentEnemy.attack();
                    
                }                
                 
            },
            
            /*
             * handles the case of victory
             * 
             * @param {string} killedMonster name of killed monster
             * 
             */
            handlePlayerVictory : function( killedMonster ){

                RPG.protocol.addMessage('*** Du hast den ' + killedMonster.name + ' besiegt! ***', 'white' );

                // check for loot
                player.checkForLoot();

                // player is not in battle anymore
                player.isInBattle = false;

                // clear current enemy
                player.currentEnemy = '';

                // increase monster counter
                player.monsterDefeated++;

                // increase exp
                player.exp = player.exp + killedMonster.expWorth;

                RPG.protocol.addMessage('Du erhältst ' + killedMonster.expWorth + ' Erfahrungspunkte.', 'green' );

                // lvl up?
                player.checkForLevelUp();

                // hide monster
                killedMonster.toggleMonsterVisibility();
                
            },

            checkForLevelUp : function(){

                if( player.exp >= player.lvlCaps[0] ){

                    // remember last level cap (needed for exp bar)
                    player.lastLvlCap = player.lvlCaps[0];

                    // remove achieved lvl cap from array
                    player.lvlCaps.shift();

                    // level up
                    player.levelUp();

                }
                else {

                    player.updateExpBar();

                }

            },

            levelUp : function(){

                // increase sword damage
                player.swordDamage = player.swordDamage + 1;

                // increase health
                player.healthMax = player.healthMax + 5;
                player.healthNow = player.healthMax;

                // increase level counter
                player.level = player.level + 1;

                player.updateStats();

                // update exp bar
                player.updateExpBar(true);

                // update healthbar
                player.updateHealthBar();

                RPG.protocol.addMessage('*** Du steigst eine Stufe auf! ***', 'white');

                // new skill on level 2 (hard blow)
                if( player.level === 2 ){
                    $('.use-sword').after('<button class="skillHardBlow" data-description="Schweren Schwerthieb ausführen (doppelter Schaden)." data-cooldown-counter="0" data-status="active">Schwerer Hieb.</button>');
                    $('.skillHardBlow').fadeIn(1000);
                    RPG.protocol.addMessage('Neue Fähigkeit erlernt: Schwerer Schwerthieb.', 'yellow');
                }

                // new skill on level 3 (heal)
                if( player.level === 3 ){
                    $('.look-around').after('<button class="heal" data-description="Heilzauberspruch anwenden (Heilt ' + (player.level + 2) + ' HP)." data-status="active" data-cooldown-counter="0">Benutze einen Heilzauberspruch</button>');
                    $('.heal').fadeIn(1000);
                    RPG.protocol.addMessage('Neue Fähigkeit erlernt: Heilzauberspruch.', 'yellow');
                }

                // update skill power/description
                if( player.level > 3 ){
                    $('button.heal').attr('data-description', 'Heilzauberspruch anwenden (Heilt ' + (player.level + 2) + ' HP).');
                    RPG.protocol.addMessage('Dein Heilzauberspruch ist stärker geworden', 'yellow');
                }

                RPG.protocol.addMessage('Dein Schwertschaden hat sich erhöht.', 'yellow');
                RPG.protocol.addMessage('Deine maximale HP Anzahl hat sich erhöht.', 'yellow');
                RPG.protocol.addMessage('Du besitzt wieder volle HP.', 'white');

            },

            /*
             * calculates new width of exp bar
             *
             * @return {number} new width of exp bar
             *
             */
            calculateExpBarWidth : function(){

                var expNow       = player.exp - player.lastLvlCap,
                    nextLevel    = player.lvlCaps[0],
                    // calculate percentage
                    percentOfLvl = ( expNow * 100 ) / nextLevel,
                    totalValue   = 140;

                     // return new bar width
                    return Math.floor( ( totalValue / 100 ) * percentOfLvl );

            },

            /*
             * updates the exp bar
             *
             * @param {boolean} levelUp if true, the bar will reset after full width
             *
             */
            updateExpBar : function( levelUp ){

                var expBar = $('.inner-exp-bar');

                // on lvl up
                if( levelUp ){

                    expBar.animate({
                        width : 140
                    }, 600, function(){

                        // reset bar
                        expBar.css({width:0});

                        // add exp
                        expBar.animate({
                            width : player.calculateExpBarWidth()
                        }, 600);

                    });

                }
                else {

                    expBar.animate({
                        width : player.calculateExpBarWidth()
                    }, 600);

                }

            },

            updateHealthBar : function(){

                var healthBar  = $('.player-stats .inner-health-bar'),

                    // calculate percentage
                    percentOfHealth = ( player.healthNow * 100 ) / player.healthMax,
                    totalValue = 140,

                    // calculate new bar width
                    result     = Math.floor( ( totalValue / 100 ) * percentOfHealth );

                    // animate health bar
                    healthBar.animate({
                        width : result
                    }, 600);

            },
            
            updateStats : function(){
                
                $('.player-stats .health-min').text( player.healthNow );
                $('.player-stats .health-max').text( player.healthMax );
                $('.player-level').text( player.level );
                
            },
            
            initStats : function(){
                
                player.name = prompt('Wie heißt dein Held?') || 'Held';
                
                $('.player-name').text( player.name );
                $('.player-stats .health-min').text( player.healthNow );
                $('.player-stats .health-max').text( player.healthMax );
                $('.player-level').text( player.level );
                
            },

            onDeath : function(){

                player.healthNow = 0;

                $('.monster-killed').text( player.monsterDefeated );
                $('.potions-found').text( player.potionsFound );

                $('.results').fadeIn(2000);
            }
            
        };       
        
        /*
         * parent constructor of all monsters, from
         * which all other monsters inherit
         *
         * @constructor
         * 
         */
        var Monster = function() {
           
           this.attack = function(){

               // monster misses
               if( RPG.helper.calculateProbability( 10 ) ){
                   RPG.protocol.addMessage('Dein Gegner setzt zum Angriff an, aber du kannst rechtzeitig ausweichen.', 'red');
               }
               else {

                   // critical hit
                   if( RPG.helper.calculateProbability( 10 ) ){

                       var bonus = 1;

                       RPG.protocol.addMessage('Kritischer Treffer: Dein Gegner fügt dir ' + (this.dealsDamage + bonus) + ' Schaden zu!', 'red');

                       // reduce player health
                       player.healthNow = player.healthNow - (this.dealsDamage + bonus);
                       player.updateHealthBar();

                   }
                   else {

                       RPG.protocol.addMessage('Der ' + this.name + ' fügt dir ' + this.dealsDamage + ' Schaden zu!', 'red');

                       // reduce player health
                       player.healthNow = player.healthNow - this.dealsDamage;
                       player.updateHealthBar();

                   }

               }

               // if the monster kills the hero
               if( player.healthNow <= 0 ){

                  RPG.protocol.addMessage('Verzweifelt kämpfst du gegen das Monster an, letztlich hast du aber keine Chance. Das Monster reißt dich in Stücke … du bist tot.', 'red');
                  
                  $('.commands').children().remove();

                  // show monsters killed/potions found
                  player.onDeath();

               }

               // update player stats
               player.updateStats();
               
           };
           
           this.initMonsterStats = function(){

               // img
               $('#monster-img').attr('src', this.monsterImg);

               // name / hp
               $('.monster-stats .monster-name').text( this.name );
               $('.monster-stats .health-min').text( this.healthNow );
               $('.monster-stats .health-max').text( this.healthMax );

               this.toggleMonsterVisibility()

           };

           this.toggleMonsterVisibility = function(){

               var monsterStats = $('.tiles-monster-stats');

               if( monsterStats.attr('data-monster-status') === 'inactive' ){

                   monsterStats.attr('data-monster-status','active');

                   monsterStats.animate({
                       left : 0
                   }, 200);

               }
               else {

                   monsterStats.attr('data-monster-status','inactive');

                   monsterStats.animate({
                       left : '-210px'
                   }, 200);

               }

           };

           this.updateHealthBar = function(){


               var healthBar  = $('.monster-stats .inner-health-bar'),

               // calculate percentage
                   percentOfHealth = ( this.healthNow * 100 ) / this.healthMax,
                   totalValue = 90,

               // calculate new bar width
                   result     = Math.floor( ( totalValue / 100 ) * percentOfHealth );

               // animate health bar
               healthBar.animate({
                   width : result
               }, 600);

           };
           
           this.updateStats = function(){
               $('.monster-stats .health-min').text( this.healthNow );
               $('.monster-stats .health-max').text( this.healthMax );
           }
                    
        };

        /*
         * creates instance of Infernozwerg
         *
         * @constructor
         *
         */
        var InfernoZwerg = function(){

            this.name = 'Infernozwerg';

            this.healthMax = 4;

            this.healthMin =  0;

            this.healthNow  = 4;

            this.dealsDamage = 1;

            this.expWorth = 1;

            this.monsterImg = 'img/monster/inferno_dwarf.png';

        };

        /*
         * creates instance of Infernozwerg
         *
         * @constructor
         *
         */
        var SkelettKrieger = function(){

            this.name = 'Skelettkrieger';

            this.healthMax = 6;

            this.healthMin =  0;

            this.healthNow  = 6;

            this.dealsDamage = 1;

            this.expWorth = 2;

            this.monsterImg = 'img/monster/skeleton_warrior.png';

        };

        /*
         * creates instance of Infernozwerg
         *
         * @constructor
         *
         */
        var Bronzegolem = function(){

            this.name = 'Bronzegolem';

            this.healthMax = 10;

            this.healthMin =  0;

            this.healthNow  = 10;

            this.dealsDamage = 1;

            this.expWorth = 2;

            this.monsterImg = 'img/monster/bronze_golem.png';

        };

        /*
         * creates instance of ork
         *
         * @constructor
         *
         */
        var Ork = function(){

            this.name = 'Ork';

            this.healthMax = 16;

            this.healthMin =  0;

            this.healthNow  = 16;

            this.dealsDamage = 4;

            this.expWorth = 5;

            this.monsterImg = 'img/monster/ork.png';

        };

        /*
         * creates instance of goblin
         *
         * @constructor
         *
         */
        var Goblin = function(){

            this.name = 'Goblin';

            this.healthMax = 8;

            this.healthMin =  0;

            this.healthNow  = 8;

            this.dealsDamage = 2;

            this.expWorth = 3;

            this.monsterImg = 'img/monster/goblin.png';

        };

        /*
         * creates instance of zombie
         *
         * @constructor
         *
         */
        var Zombie = function(){

            this.name = 'Zombie';

            this.healthMax = 12;

            this.healthMin =  0;

            this.healthNow  = 12;

            this.dealsDamage = 3;

            this.expWorth = 4;

            this.monsterImg = 'img/monster/zombie.png';

        };

        /*
         * creates instance of Gargoyle
         *
         * @constructor
         *
         */
        var Gargoyle = function(){

            this.name = 'Gargoyle';

            this.healthMax = 12;

            this.healthMin =  0;

            this.healthNow  = 12;

            this.dealsDamage = 5;

            this.expWorth = 6;

            this.monsterImg = 'img/monster/gargoyle.png';

        };

        /*
         * creates instance of Mumie
         *
         * @constructor
         *
         */
        var Mumie = function(){

            this.name = 'Mumie';

            this.healthMax = 18;

            this.healthMin =  0;

            this.healthNow  = 18;

            this.dealsDamage = 6;

            this.expWorth = 8;

            this.monsterImg = 'img/monster/mummy.png';

        };

        /*
         * creates instance of Minotaurus
         *
         * @constructor
         *
         */
        var Minotaurus = function(){

            this.name = 'Minotaurus';

            this.healthMax = 24;

            this.healthMin =  0;

            this.healthNow  = 24;

            this.dealsDamage = 8;

            this.expWorth = 10;

            this.monsterImg = 'img/monster/minotaurus.png';

        };

        // setting inheritance
        InfernoZwerg.prototype = new Monster();
        Bronzegolem.prototype = new Monster();
        SkelettKrieger.prototype = new Monster();
        Ork.prototype = new Monster();
        Zombie.prototype = new Monster();
        Goblin.prototype = new Monster();
        Mumie.prototype = new Monster();
        Gargoyle.prototype = new Monster();
        Minotaurus.prototype = new Monster();

        return {
            
            init : function(){
                player.initStats();
            }
            
        };

    })();

    // init game
    RPG.entities.init();
    RPG.protocol.init();        
    
});