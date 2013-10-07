// ==UserScript==
// @name        WoEChatDice
// @namespace   WoEDice
// @version     1
// @author Chiredan&Vienes
// ==/UserScript==


$("#box").ready(buildDice);
//Variables Block

// Functions Block



function buildDice() {
    buildDiceDiv(document.getElementById("messageFormBox").getElementsByTagName("img").item(0).alt);
}

function buildDiceDiv(user) {
	var text = "<p>Uwaga jest to wersja testowa ! Skrypt jest w trakcie przebudowy, prosze u ustawienie automatycznej aktualizacji w swoich wtyczkach !</p><br />";
	var text2 = "<p> Wersja: Alpha2 : Skrypt walki wg. Vines'a, Skrytp tulenia. Następna aktualizacja: przebudowa i poprawa wyglądu skryptu</p><br />";
    var userInput = '<input id="diceUser" value="' + user + '"/>';
    var opponentInput = '<input id="diceOpponent" value="tu wpisz nazwę gracza"/>'
    var button = '<button id="roll" onclick="rollDice()">losuj</button>';
	var button2 = '<button id="hug" onclick="clickUser()">przytul</button>';
    //var script = '<script src="https://raw.github.com/chiredan/WorldOfEquestriaDice/MainBranch/woeDice.js"> </script>
    $("#box").before('<div id="dice">'+text+text2 + userInput + opponentInput + button+button2+ '</div>');

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

            var user1 = getStats(ponyUser[0])/3;
            var user2 = getStats(ponyOpponent[0])/3;
            var rollUser1 = dice(6);
            var rollUser2 = dice(6);
            var win = 0
            var dmgroll1 = (dice(20)/10);
            var dmgroll2 = (dice(20)/10);
            
            var dmg1 = (user1 * rollUser1)*dmgroll1;
            var dmg2 = (user2 * rollUser2)*dmgroll2;
            console.log("Rzucono kośćmi");
            if (dmg1 > dmg2)
                win = 1;
            if (dmg1 < dmg2)
                win = 2;
            var message = "*Losowanie pojedynku dla graczy: " + document.getElementById("diceUser").value + " i " + document.getElementById("diceOpponent").value + "\n\ Gracz pierwszy wylosował: " + rollUser1 + " a drugi: " + rollUser2 + "\n\ ";
            switch (win) {
                case 1:
                    message += "Pojedynek zwyciężył: " + document.getElementById("diceUser").value;

                    break;
                case 2:
                    message += "Pojedynek zwyciężył: " + document.getElementById("diceOpponent").value;
                    break;
                default :
                    message += "Pojedynek zakończył się remisem";
            }
            
            message += "\n\ "+document.getElementById("diceUser").value + " zadał : "+dmg1+" ("+dmgroll1+ ") , a "+document.getElementById("diceOpponent").value + " zadał: "+dmg2+"("+dmgroll2+ ")*";
            console.log(message);
            
                    
            WoE.Chat.sendMessage(message);
            messagesHistory.push(messages);


            
            return false;
        })
    });

}

function clickUser(){
	var message = "/mme przytula gracza: "+document.getElementById("diceOpponent").value + " (Wersja testowa)" ;
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
    if (pony.data.race == "unicorn" || pony.data.race == "alicorn") {
        return pony.data.skills.intelligence;
    }
    else if (pony.data.race == "pegasus") {
        return pony.data.skills.speed;
    }
    else
        return pony.data.skills.strength;
}

function dice(dx){
    return Math.floor((Math.random() * dx) + 1)
}
