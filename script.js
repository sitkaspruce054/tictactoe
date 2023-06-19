

/** On a high level:  
 
the form's submit button will call a main function, where we'll
build two players, and a gameboard that records the number of moves made, as
well as checking if there exists a win condition.
 

**/

let startbtn = document.getElementById('startgame')

startbtn.addEventListener('click',()=>{
    main();
})

function makeGameBoard(){
    board = []
    for (let index = 0; index < 9; index++) {
        board.push(cell(index))
        
    }
    const getBoard = () => board;

    const placemarker = (loc,player) =>{
        if(board[loc].getValue() != 0){
            alert('cant place here')
            return
        }
        board[loc].updateValue(player)

    }
    return { getBoard, placemarker}
}

function cell(index){
    let val = ''
    const internal_id = index
    const get_id = () => internal_id
    const updateValue = (playerid) => {
        val = playerid
    }

    const getValue = () => val;
    return{
        updateValue,
        getValue,

        get_id
    }
}

function main(first_player,second_player){
    const board = makeGameBoard();
    const players = [
        {
            name: first_player,
            symbol: 'X'
        },{
            name: second_player,
            symbol:'O'

        }
    ]
    let cur_player = players[0]
    const getCurPlayer = () => cur_player;
    const switchplayer = () =>{
        cur_player = cur_player === players[0] ? players[1]:players[0]
    
    }
    const checkwin = () =>{
        let boar = board.getBoard();
        console.log(boar[0].getValue())
        if(boar[0].getValue() === boar[1].getValue() === boar[2].getValue()){
            if(boar[0] != ''){
                alert('sss')
            }
        }
        
        
    }
    const playRound = (index) => {
        
        board.placemarker(index,getCurPlayer().symbol);
        checkwin()
        
        
        switchplayer();

    }

    return {
        playRound,
        getCurPlayer,
        getBoard:board.getBoard
    }
}

function controldisplay(){
    const game = main('player1','player2')
    const player_turn = document.querySelector('.cur_play');
    const board_cont = document.querySelector('.board');

    const updateScreen = () => {

        board_cont.textContent = '';
        const board = game.getBoard();

        const cur_player = game.getCurPlayer();

        player_turn.textContent = `${cur_player.name} must play`

        // getting the cells

        board.forEach(Cell => {

            const cell_button = document.createElement('button')
            cell_button.classList.add('cell')

            cell_button.dataset.index = Cell.get_id();
            cell_button.textContent = Cell.getValue();
            board_cont.appendChild(cell_button)
        })
    }
    function inputHandler(e) {
        e.target.disabled = true;
        const selectedCell = e.target.dataset.index;
        if (!selectedCell) return;
        alert('detected')
        game.playRound(selectedCell);
        selectedCell.disabled = true;
        updateScreen();
    }
    board_cont.addEventListener("click",inputHandler);

    updateScreen();
}


controldisplay();

