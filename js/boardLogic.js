//create our board
class Board {
    constructor() {
        this.tie = 'true';
        this.playerTurn = 1
        this.boardArray = [];
        this.columnMax = 7;
        this.rowMax = 6;
        this.createBoard();
        this.boardDomCreation(this.rowMax, this.columnMax);
    }

    boardDomCreation(rowIndex, columnIndex){
        let tokenHoverContainer = $('.tokenHoverContainer');
        let fauxArr = [];
        let gameBoard = $('.gameboard');
        let gameArr = [];
        for (let column = 0; column < columnIndex; column++) {
            let fauxColumn = $('<div>').addClass('column'+column);
            let fauxImg = $('<img>').addClass('faux');
            fauxColumn.append(fauxImg);
            fauxArr.push(fauxColumn);
            for (let row = 0; row < rowIndex; row++) {
                let tokenContainer = $('<div>').addClass('tokenContainer');
                let cell = $('<div>').addClass(`column${column} row${row}`);
                tokenContainer.append(cell);
                gameArr.push(tokenContainer);
            }
        }
        tokenHoverContainer.append(fauxArr);
        gameBoard.append(gameArr);
    }
    createBoard() {
        for (var row = 0; row < this.rowMax; row++) {
            var eachRow = [];
            for (var column = 0; column < this.columnMax; column++) {
                eachRow.push(0);
            }
            this.boardArray.unshift(eachRow);
        }
    }
    updateBoardArray(row, column, currentPlayer) {
        //go through each row in the column and check if there is a 0 there. if yes change to currentPlayer variable return
        for (var i = this.boardArray.length - 1; i >= 0; i--) {
            if (this.boardArray[i][column] === 0) {
                this.boardArray[i][column] = currentPlayer;
                return i;
            }
        }
        return -1;
    }
    checkWinCondition(tokenRow, tokenColumn, currentPlayer) {
        let playerWin = currentPlayer.toString() +
            currentPlayer +
            currentPlayer +
            currentPlayer;
        let testString = 'Row:';
        let verticalString = 'Vertical:';
        let diagStringUpward = ' UpwardDiagonal:';
        let diagStringDownward = ' DownwardDiagonal:';
        let upwardDiagonal = parseInt(tokenRow) + parseInt(tokenColumn);
        let downwardDiagonal = tokenRow - tokenColumn;
        this.tie = true;

        for (var row = 0; row < this.rowMax; row++) {
            for (var column = 0; column < this.columnMax; column++) {
                //add to upward diagonal
                if (row + column === upwardDiagonal) {
                    diagStringUpward += this.boardArray[row][column];
                }
                //add to downward diagonal
                if (row - column === downwardDiagonal) {
                    diagStringDownward += this.boardArray[row][column]
                }
                //check tie
                if (this.boardArray[row][column] === 0) {
                    this.tie = false;
                }
                // add horizontal to string
                if (row === tokenRow) {
                    testString += this.boardArray[tokenRow][column];
                }
                //add vertical to string
                if (column === parseInt(tokenColumn)) {
                    verticalString += this.boardArray[row][tokenColumn];
                }
            }
        }
        testString += verticalString + diagStringUpward + diagStringDownward;
        //CHANGE LOCATION OF CHANGE PLAYER
        if (this.tie) {
            return 'tie';
        }
        else if (testString.indexOf(playerWin) !== -1) {
            return 'win';
        }
    }
    disableColumn(column) {
        $('.column' + column).parent().addClass('disableClicks');
    }
    changePlayer(reset = false) {
        if (this.playerTurn === 2 || reset) {
            this.playerTurn = 1;
            $(".tokenHoverContainer img").attr('src', 'assets/token' + player1.tokenNumber + '.png');
            $(".player2").removeClass('activePlayer');
            $(".player1").addClass('activePlayer');
            
        } else{
            this.playerTurn = 2;
            $(".tokenHoverContainer img").attr('src', 'assets/token' + player2.tokenNumber + '.png');
            $(".player1").removeClass('activePlayer');
            $(".player2").addClass('activePlayer');
        }
    }
    resetBoard() {
        this.boardArray = [];
        this.createBoard();
        $('.tokenContainer > div').removeAttr('style');
        $('.gameContainer, .tokenContainer, .tokenHoverContainer').removeClass('disableClicks');
        $('.winMsg').text('');
        activeWinner = false;
        this.changePlayer(true);        
    }
};
