var newGameBtn = document.getElementById('js-newGameButton');

newGameBtn.addEventListener('click', newGame);

var pickRock = document.getElementById('js-playerPick_rock'),
     pickPaper = document.getElementById('js-playerPick_paper'),
     pickScissors = document.getElementById('js-playerPick_scissors');

pickRock.addEventListener('click', function() { playerPick('kamień') });
pickPaper.addEventListener('click', function() { playerPick('papier') });
pickScissors.addEventListener('click', function() { playerPick('nożyce') });

var gameState = 'notStarted',  //started // ended
    player = {
        name: '',
        score: 0
    },
    computer = {
        score: 0
    };
    
var newGameElem = document.getElementById('js-newGameElement'),
    pickElem = document.getElementById('js-playerPickElement'),
    resultsElem = document.getElementById('js-resultsTableElement');
    
function setGameElements() {
  switch(gameState) {
    case 'started':
        newGameElem.style.display = 'none';
        pickElem.style.display = 'block';
        resultsElem.style.display = 'block';
      break;
    case 'ended':
        newGameBtn.innerText = 'Jeszcze raz';
    case 'notStarted':
    default:
        newGameElem.style.display = 'block';
        pickElem.style.display = 'none';
        resultsElem.style.display = 'none';
  }
}
setGameElements();

var playerPointsElem = document.getElementById('js-playerPoints'),
    playerNameElem = document.getElementById('js-playerName'),
    computerPointsElem = document.getElementById('js-computerPoints');
    
function newGame() {
  player.name = prompt('Wpisz swoje imię:', 'imię gracza');
  if (player.name) {
    player.score = computer.score = 0;
    gameState = 'started';
    setGameElements();

    playerNameElem.innerHTML = player.name;
    setGamePoints();
  }
}

function playerPick(playerPick) {
    console.log(playerPick);
}

var x = Math.random();
function getComputerPick() {
    var possiblePicks = ['kamień', 'papier', 'nożyce'];
    return possiblePicks[Math.floor(Math.random()*3)];
}

var playerPickElem = document.getElementById('js-playerPick'),
    computerPickElem = document.getElementById('js-computerPick'),
    playerResultElem = document.getElementById('js-playerResult'),
    computerResultElem = document.getElementById('js-computerResult');
    
function playerPick(playerPick) {
    var computerPick = getComputerPick();

    playerPickElem.innerHTML = playerPick;
    computerPickElem.innerHTML = computerPick;
}

function checkRoundWinner(playerPick, computerPick) {
  playerResultElem.innerHTML = computerResultElem.innerHTML = '';

  var winnerIs = 'player';

    if (playerPick == computerPick) {
        winnerIs = 'none'; // remis
    } else if (
        (computerPick == 'kamień' &&  playerPick == 'nożyce') ||
        (computerPick == 'nożyce' &&  playerPick == 'papier') ||
        (computerPick == 'papier' &&  playerPick == 'kamień')) {

        winnerIs = 'computer';
    }

    if (winnerIs == 'player') {
        playerResultElem.innerHTML = "wygrał!";
        player.score++;
    } else if (winnerIs == 'computer') {
        computerResultElem.innerHTML = "wygrał!";
        computer.score++;
    }
     setGamePoints();
     gameOver();
}

function playerPick(playerPick) {
    var computerPick = getComputerPick();

    playerPickElem.innerHTML = playerPick;
    computerPickElem.innerHTML = computerPick;

    checkRoundWinner(playerPick, computerPick);
}

function setGamePoints() {
    playerPointsElem.innerHTML = player.score;
    computerPointsElem.innerHTML = computer.score;
}

function gameOver() {
    if (player.score == 3) {
        alert ('Gratuacje! ' + playerNameElem.innerHTML + ', wygrałeś!');
        var contGameBtn = confirm("Czy chcesz grać dalej?");
        if (contGameBtn == true){
            gameState = 'notStarted'
            setGameElements();
            return true;
        } else {
            gameState = 'ended';
            alert("Gra skończona. Zamknij okno.");
            gameState = 'notStarted'
            return false;
        }
        //setGameElements();
    } 
    else if (computer.score == 3) {
        alert ('Upsss...komputer wygrał!');
        var contGameBtn = confirm("Czy chcesz grać dalej?");
        if (contGameBtn == true){
            gameState = 'notStarted'
            setGameElements();
            return true;
        } else {
            gameState = 'ended';
            alert("Gra skończona. Zamknij okno.");
            gameState = 'notStarted'
            return false;
        }
        /*gameState = 'ended';
        setGameElements();*/
    }
}