$("#box").ready(buildDice);
//Variables Block

// Functions Block

function buildDice() {
    buildDiceDiv(document.getElementById("messageFormBox").getElementsByTagName("img").item(0).alt);
}

function buildDiceDiv(user) {
    var userInput = '<input id="diceUser" value="' + user + '"/>';
    var opponentInput = '<input id="diceOpponent" value="tu wpisz nazwę gracza"/>'
    var button = '<button id="roll" onclick="rollDice()">losuj</button>';
    //var script = '<script src="https://raw.github.com/chiredan/WorldOfEquestriaDice/MainBranch/woeDice.js"> </script>
    $("#box").before('<div id="dice">' + userInput + opponentInput + button+ '</div>');

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

            var user1 = getStats(ponyUser[0]);
            var user2 = getStats(ponyOpponent[0]);
            var rollUser1 = Math.floor((Math.random() * 6) + 1);
            var rollUser2 = Math.floor((Math.random() * 6) + 1);
            var win = 0
            console.log("Rzucono kośćmi");
            if (user1 * rollUser1 > user2 * rollUser2)
                win = 1;
            if (user1 * rollUser1 < user2 * rollUser2)
                win = 2;
            var message = "Losowanie pojedynku dla graczy: " + document.getElementById("diceUser").value + " i " + document.getElementById("diceOpponent").value + "\n\ Gracz pierwszy wylosował: " + rollUser1 + " a drugi: " + rollUser2 + "\n\ ";
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


            WoE.Chat.sendMessage(message);
            messagesHistory.push(messages);


            console.log(message);
            return false;
        })
    });

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
