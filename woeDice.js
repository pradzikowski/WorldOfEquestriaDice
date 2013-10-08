// ==UserScript==
// @name        WoEChatDice
// @namespace   WoEDice
// @version     3
// @author Chiredan&Vienes&Sne
// ==/UserScript==


$("#box").ready(buildDice);
//Variables Block
var attype = 3;	//globalna. 3=niezdefiniowana. (debugging)
// Functions Block



function buildDice() {
    buildDiceDiv(document.getElementById("messageFormBox").getElementsByTagName("img").item(0).alt);
}

function buildDiceDiv(user) {
    var text = "<p>Uwaga jest to wersja testowa ! Skrypt jest w trakcie przebudowy, prosze u ustawienie automatycznej aktualizacji w swoich wtyczkach !</p><br />";
    var text2 = "<p> Wersja: Alpha2 : Skrypt walki wg. Vienes'a, z poprawkami Sne, Skrytp tulenia. Następna aktualizacja: przebudowa i poprawa wyglądu skryptu</p><br />";
    var userInput = '<input id="diceUser" value="' + user + '"/>';
    var opponentInput = '<input id="diceOpponent" placeholder="tu wpisz nazwę gracza"/>'
    var button = '<button id="roll" onclick="rollDice()">losuj</button>';
    var button2 = '<button id="hug" onclick="hugPony()">przytul(/me)</button>';
    var button3 = '<button id="hug" onclick="hugPerson()">przytul (/mme)</button>';
    $("#box").before('<div id="dice">' + text + text2 + userInput + opponentInput + button + button2 +button3+ '</div>');

}

// Action Listner


function rollDice() {

    $.when(
            requestUser(document.getElementById("diceUser").value),
            requestUser(document.getElementById("diceOpponent").value)
            ).done(function(reqUser, reqOpponent) {
        $.when(
                requestMainStat(reqUser[0].data.id),
                requestMainStat(reqOpponent[0].data.id)
                ).done(function(ponyUser, ponyOpponent) {
            var stat = ["strenght", "speed", "inteligence"];	// mozliwe staty, slownie
            var user1 = getStats(ponyUser[0]);
            var attype1 = attype;								// pobrano typ ataku attype gracza 1
            var user2 = getStats(ponyOpponent[0]);				// pobrano typ ataku attype gracza 2
            var rollUser1 = dice(6);
            var rollUser2 = dice(6);
            var win = 0
            var dmgroll1 = (dice(20) / 10);
            var dmgroll2 = (dice(20) / 10);

            var dmg1 = (user1 * rollUser1) * dmgroll1;
            var dmg2 = (user2 * rollUser2) * dmgroll2;
            console.log("Rzucono kośćmi");
            if (dmg1 > dmg2)
                win = 1;
            if (dmg1 < dmg2)
                win = 2;
            var message = "*Pojedynek " + document.getElementById("diceUser").value + " (" + stat[attype1] + ") kontra " + document.getElementById("diceOpponent").value + " (" + stat[attype] + ")!\n\ Gracz pierwszy wylosował " + rollUser1 + ", a drugi " + rollUser2 + "\n\ ";
            switch (win) {
                case 1:
                    message += "Pojedynek zwyciężył " + document.getElementById("diceUser").value + "!";

                    break;
                case 2:
                    message += "Pojedynek zwyciężył " + document.getElementById("diceOpponent").value + "!";
                    break;
                default :
                    message += "Pojedynek zakończył się remisem!";
            }

            message += "\n\ " + document.getElementById("diceUser").value + " zadał " + dmg1.toFixed(2) + " (" + dmgroll1 + "), a " + document.getElementById("diceOpponent").value + " zadał " + dmg2.toFixed(2) + " (" + dmgroll2 + ")*";
            console.log(message);

            WoE.Chat.sendMessage(message);
            messagesHistory.push(messages);

            return false;
        })
    });
}

function hugPerson(){
    hug("/mme");
}

function hugPony(){
    hug("/me");
}

function hug(string) {
    var message = string+" przytula czule " + document.getElementById("diceOpponent").value;
    console.log(message);

    WoE.Chat.sendMessage(message);
    messagesHistory.push(messages);
}

function requestUser(userName) {
    var request = $.ajax({
        url: "http://worldofequestria.pl/api/v2/User/GetID/" + userName + ".json?callback=zupa",
        type: 'GET',
        dataType: 'JSONP',
        success: function(json) {
            console.log(json.data.id);
        }
    });
    return request;
}

function requestMainStat(userId) {

    var request = $.ajax({
        url: "http://worldofequestria.pl/api/v2/user/skills/" + userId + ".json?=zupa",
        type: 'GET',
        dataType: 'JSONP',
        success: function(json) {
            console.log(json);
        }
    });
    return request;
}

function getStats(pony) {
    //bazowe mnozniki statystyk
    var sped = 1.0;
    var stre = 1.0;
    var inte = 1.0;

    switch (pony.data.race) {
        case "alicorn":	//wszystkie wspolczynniki sie zwiekszaja, by nie doprowadzic do zmniejszenia przy przeistoczeniu sie
            sped = 1.21;
            stre = 1.21;
            inte = 1.331;	// 10% bonus do inteligencji
            break;
        case "unicorn":
            inte = 1.21;
            break;
        case "pegasus":
            sped = 1.21;
            break;
        case "griffon":	
            sped = 1.10;
            stre = 1.10;
            break;
        default:
            stre = 1.21;
    }
// tablica ze wszystkimi statami jest mnozona przez mnozniki powyzej, po czym sortowana od najwiekszych do najmniejszych
    var stats = [(pony.data.skills.speed * sped), (pony.data.skills.strength * stre), (pony.data.skills.intelligence * inte)].sort(function(a, b) {
        return b - a
    });

    if (stats[0] == pony.data.skills.speed * sped)	// jesli pierwsza statystyka jest predkosc, to
        attype = 1;									// daj o tym znac funkcji 
    else if (stats[0] == pony.data.skills.strength * stre)
        attype = 0;
    else
        attype = 2;

    return stats[0] * 1.0 + stats[1] * 0.5 + stats[2] * 0.25;		//glowna statystyka * 1, druga/2, trzecia/4
}

function dice(dx) {
    return Math.floor((Math.random() * dx) + 1);
}