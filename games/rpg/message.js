// create/check namespace
var RPG = RPG || {};

/*
 * the message module contains all
 * messages that the game protocol
 * will print.
 */
RPG.message = (function(){

    return [
        // dungeon introduction - 0
        'Du befindest dich in einen Verlies voller Monster, Fallen, finsterer Gestalten und verborgenen Schätzen. Was wirst du tun?',
        // loot is health potion - 1
        'Das besiegte Monster lässt ein kleines, funkelndes Fläschchen fallen.',
        // player got health potion - 2
        'Du erhältst einen Heiltrank.',
        // player got full health, potion used - 3
        'Verwirrt steckst du deinen Heiltrank wieder ein, du erfreust dich bester Gesundheit.',
        // player used health potion - 4
        'In einen Zug trinkst du den Heiltrank aus, sofort merkst du wie deine Lebensgeister zurückkehren.',
        // player used health potion, hp restored - 5
        'Der Heiltrank hat 5 HP wiederhergestellt.',
        // no use for sword - 6
        'Du schwingst dein Schwert, aber es ist niemand zum kämpfen da ...',
        // use skill: hard blow - 7
        'Du setzt zu einen schweren Schwerthieb an ...',
        // no use for heal - 8
        'Du hast bereits volle HP.',
        // use skill: heal - 9
        'Du sprichst einen Heilzauberspruch und stellst ',
        // use skill: heal/2 - 10
        ' HP wieder her.'
    ];

})();