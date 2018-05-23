$(document).ready(initializeApp);

let activePlayer = null;
let player1 = null;
let player2 = null;
let activeWinner = false;
let setupGame = null;
let tokenExplosion = null;
let tokenAnimation = null;
let board = null;

function initializeApp(){
    board = new Board();
    setupGame = new SetupGame();
    clickHandler();
    tokenExplosion = new TokenExplosion();
    tokenAnimation = new TokenAnimation();
    focusPlayer1();
}

function clickHandler(){
    $('.bestOfOptions').change(function(){
        setupGame.getBestOf();
    });
    $('.gameboard .tokenContainer').click(processMove);
    $(".gameboard .tokenContainer").hover((e) => tokenAnimation.checkShowFauxToken(e), (e) => tokenAnimation.toggleFauxToken(e, 'none'));
    $('.tokens>div').on('click', function(){
        setupGame.setPlayerTokenImg();
    });
    $('.resetBtn').on('click', function(){
        confirmReset();
    });
    $('.yesBtn').on('click', function() {
        processResetClick('yes')});
    $('.noBtn').on('click', function() {
        processResetClick('no')});
}

function confirmReset(){
    if($('.resetBtn').text() !== 'Home'){
        $('.resetBtn').toggleClass('disabled');
        $('.resetMessageContainer').css({display:'block'});  
    }
}

function processResetClick(value){
    $('.resetBtn').toggleClass('disabled');
    $('.resetMessageContainer').css({display:'none'});
    if(value === 'yes'){
        board.resetBoard();
        $('.winMsg').css('display','none');
    }
}

function processMove(){
    var classes = $(event.currentTarget.firstElementChild).attr('class');
    var column = classes.charAt(6);
    var row = classes.charAt(11);
    var currentPlayer = board.playerTurn;
    if(currentPlayer === player1.playerNumber){
        activePlayer = player1;
    }
    else{
        activePlayer = player2;
    }
    activePlayer.status = 'active';
    if (activeWinner){
        return;
    }
    var placementRow = board.updateBoardArray(row, column, activePlayer.playerNumber);
    tokenAnimation.createToken(column, activePlayer.playerNumber, activePlayer.tokenNumber);
    //tokenAnimation is processing logic after token drop. e.g.
    // player switching and win checking
    tokenAnimation.moveToken(placementRow, column, activePlayer.playerNumber, activePlayer.tokenNumber);
}
function focusPlayer1(){
    $("#playerName1").focus();
}

class Player{
    constructor(name, playerNumber, tokenNumber){
        this.name = name || 'Player 1';
        this.playerNumber = playerNumber;
        this.tokenNumber = tokenNumber;
        this.gameWon = 0;
        $('.player' + this.playerNumber ).text(this.name);
        this.status = 'inactive';
        $('.player' + playerNumber).css('background-image', 'url(assets/token' + tokenNumber + '.png)')
    }
}

function resultScreen(result) {
    let seriesLength = parseInt($('.playToNumber').text());
    if (result === 'tie') {
        let winBox = $("<div>").addClass('winBox').text('Tie Game...');
        $('.winMsg').css('display', 'flex');
        $('.winMsg').append(winBox);
    }
    else {
        let winText, winBox;
        if (activePlayer.playerNumber === 1) {
            player1.gameWon++;
            if(player1.gameWon < seriesLength/2.0){
                winBox = $("<div>").addClass('winBox').text(player1.name + ' won the game!');
            } else {
                winBox = $("<div>").addClass('winBox');
                winBox.text(player1.name + ' won this series!');
                setupGame.buttonChange();
            }
            $('.playerDisplay1').text(player1.gameWon);
        }
        else if (activePlayer.playerNumber === 2) {
            player2.gameWon++;
            if(player2.gameWon < seriesLength/2.0){
                winBox = $("<div>").addClass('winBox').text(player2.name + ' won the game!');
            } else {
                winBox = $("<div>").addClass('winBox');
                winBox.text(player2.name + ' won this series!');
                setupGame.buttonChange();
            }
            $('.playerDisplay2').text(player2.gameWon);
        }
        $('.winMsg').append(winBox);
        $(".winMsg").css('display', 'flex');
    }
}
