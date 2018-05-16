class TokenAnimation{
    constructor(){
        this.stopHover ='no';
    }
    changeToFaux(row, col, playerNumber, playerToken){
        var targetSquare = $('.column' + col + '.row' + row);
        var tokenImage = $('<img>',{
            'class':'fauxToken',
            src:'assets/token' + playerToken + '.png'
        });
        targetSquare.css({
            'background-image':
            'url(assets/token' + playerToken + '.png)' ,
            'background-size':'contain'});
    }
    createToken(column, playerNumber, playerToken){
        this.stopHover = 'yes';
        this.customHideFauxToken(column);
        var startSquare = $('.tokenHoverContainer .column' + column);
        var activeToken = $('<img>',{
            'id':'tokenActive',
            src:'assets/token' + playerToken + '.png',
        });
        startSquare.prepend(activeToken);
    }
    moveToken(row, col, playerNumber, playerToken) {
        var token = $('#tokenActive');
        var duration = 300 + 100*row;
        var target = $('.column' + col + '.row' + row);
        var rowPosition = target.position().top - $('#tokenActive').position().top;
        setTimeout(() => {tokenExplosion.explode(row, col, duration-500)});
        $('div.gameContainer').addClass('disableClicks');
        token.animate({top: rowPosition}, duration, 'easeOutBounce', () =>{
                $('div.gameContainer').addClass('disableClicks');
                this.changeToFaux(row, col, playerNumber, playerToken);
                token.css('display','none');
                token.remove();
                this.stopHover = 'no';
                if(row === 0){
                    board.disableColumn(col);
                }
                var result = board.checkWinCondition(row, col, playerNumber);
                if(result === 'win'){
                    resultScreen(playerNumber);
                    activeWinner = true;
                }
                else if(result === 'tie'){
                    resultScreen('tie');
                    activeWinner = true;
                }
                else{
                    board.changePlayer();
                    if(player2.name === 'AI' && activePlayer.playerNumber === 1){
                        moveAi();
                    }
                    else{
                        $('div.gameContainer').removeClass('disableClicks');
                    }
                }
            });
    }
    checkShowFauxToken(){
        if(this.stopHover ==='no'){
            this.toggleFauxToken(event, 'inline-block');
        }
    }
    customHideFauxToken(column){
            $('.column' + column + ' img.faux').css('display','none');
    }
    toggleFauxToken(e, displayProperty){
        let currentHoveredClass = $(e.currentTarget.firstElementChild).attr('class');
        let currentColumn = currentHoveredClass.substr(0,7);
        let hoverSelector = "." + currentColumn + " img.faux";
        $(hoverSelector).css('display', displayProperty);
    }
};
