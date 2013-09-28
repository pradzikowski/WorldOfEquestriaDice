$("#box").ready(buildDice);
//Variables Block

// Functions Block



function buildDice() {
    buildDiceDiv(document.getElementById("messageFormBox").getElementsByTagName("img").item(0).alt);
}

function buildDiceDiv(user) {
    var userInput = '<input id="diceUser" value="' + user + '"/>';
    var opponentInput = '<input id="diceOpponent" placeholder="tu wpisz nazwę gracza"/>'
    var button = '<button id="roll" onclick="rollDice()">losuj</button>';
    //var script = '<script src="https://raw.github.com/chiredan/WorldOfEquestriaDice/MainBranch/woeDice.js"> </script>
    $("#box").before('<div id="dice">' + userInput + opponentInput + button+ '</div>');

}