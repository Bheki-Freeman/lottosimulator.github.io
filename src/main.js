
//I will have 16 squares 
const grid = [
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [8, 9, 10, 11],
    [12, 13, 14, 15],
]; //Will be using a two dimensional array
//My game will have sound, so I need to create a sound class
class Sound {
    constructor(src, is_playing) {
        this.is_playing = is_playing;

            this.sound = document.createElement("audio");
            this.sound.src = src;
                this.sound.setAttribute("preload", "auto");
                this.sound.setAttribute("controls", "none");
            this.sound.style.display = "none";
            document.body.appendChild(this.sound);
                    this.play = function () {
                        this.is_playing = true;
                        this.sound.play();
                    };
        this.stop = function () {
            this.is_playing = false;
            this.sound.pause();
        };
    }
}

const game = {
    isEnded : false,
    gameIndex : 0,
    points : 0, 
    divOne : 'div',
    documentGrid : document.querySelector('.grid'), 
    play_sound : new Sound("./src/sounds/end_screen.mp3"),
    zombies : 1, 
    zom_value : document.querySelector('.zom_value'), 
    win_or_loose : document.querySelector('.win_or_loose'),
    zombi_counter : 0,
}



let currentColor = 'red';

//create the div in the container
const creatGrid = () => {
    let division = ''; 

    for(let i = 0; i<grid.length; i++){
        let row = grid[i];
        for(let j = 0; j<row.length; j++){
            let square =  grid[i][j];
                const square_color = square &&  square.color || 'gray';
                division += "<div class='square'  ></div>";
        }
    }
    game.documentGrid.innerHTML = division;
    
    if(!game.play_sound.is_playing)
    document.addEventListener('click', () => game.play_sound.play());
    
}



let randomRange = (min, max) =>{
    return Math.round(Math.random() * (max - min) + min);
}
const gameOverScreen = () => {
    const gameover = document.querySelector('.gameover');
    const container = document.querySelector('.container');
    const total_points = document.querySelector('#points');
    const total_games = document.querySelector('#total_games');



    if(game.gameIndex === 0) {
        const rejections_sound = new Sound("./src/sounds/reject_action.mp3");
        rejections_sound.play();
        gameover.style.position = 'absolute';
        gameover.style.display = 'flex';

        game.win_or_loose.innerHTML = "You must atleast spin once <br> before you collect!";
        
    } else{
   
    container.style.display = 'none';
    gameover.style.display = 'flex';

    //Set points and game numbers
    
    total_points.innerHTML = game.points;
    total_games.innerHTML = game.gameIndex;

    //Add sound 
    let mySound = new Sound("./src/sounds/end_screen.mp3");
    const game_over_screen_sound = new Sound("./src/sounds/game_over_sound.mp3");
    const sounds = [mySound, game_over_screen_sound];
    game_over_screen_sound.play();
    for (let i of sounds){
        if(!game.play_sound.is_playing)
        i.play();
        }
    }
    
}




function checkGameOverScore() {
    
    let win_text = '';

    if(game.gameIndex >= 99){
        console.log("Now game should be over!");        
        game.isEnded = true;
        if(game.points >= game.gameIndex){
            game.win_or_loose.classList.add('win');
            win_text = "You Won!";
            let winSound = new Sound("./src/sounds/applause_win.mp3");
            winSound.play();
        }else if (game.points < game.gameIndex){
            game.win_or_loose.classList.add('loose');
            win_text = "You Lost!";
        }
    }
    if(game.gameIndex < 99){
        win_text = `Game not Finished <br><br> your score is  <br> ${game.points} in  ${game.gameIndex}<br> Spins`;
        
    }
    game.win_or_loose.innerHTML = win_text;
}



let spinObjects = () => {
    let squares = document.querySelectorAll('.square');
    const spin_sound = new Sound("./src/sounds/spin_sound.mp3");
    spin_sound.play();
    squares.forEach(square => {
        //The following algorithm needs to be changed with filter / map
        if(square.classList.contains('spins') || square.classList.contains('red_rose') || square.classList.contains('pink') || square.classList.contains('gold_ring')){
            square.classList.remove('spins');
            square.classList.remove('red_rose');
            square.classList.remove('pink');
            square.classList.remove('gold_ring');
        }
        square
    });
 

        for(let i =0; i<grid.length; i++){
            
            let row = grid[i];          
                  for(let j =0; j<randomRange(0, row.length); j++){
                    const claslists = ['red_rose', 'pink', 'gold_ring'];
                    const random_class = Math.floor(Math.random() * claslists.length);
                      const square = squares[randomRange(0, 15)];
                      square.classList.add('spins');
                      square.classList.add('spinning');
                      square.classList.add(claslists[random_class]);                  
                      
                  }  
                 
        } 
        checkWin(); 
        
}



let populate = () => {
    if(game.isEnded){
        gameOverScreen();
    }else{
        
        game.gameIndex++;
        checkGameOverScore();
        game.zombi_counter++;
        if(game.zombi_counter === 5){
            game.zombies++;
            if(game.zombies >= 3){
                game.zom_value.classList.add('danger_text');
            }
            if(game.zombies === 4){
                game.points -= 50;
                game.zom_value.classList.remove('danger_text');
                console.log("Now subtract user Score!");
                game.zombies = 0;
            }
            game.zom_value.innerHTML = game.zombies;
            game.zombi_counter = 0;
        }
        showProgress();

        //Spin squares
        let timerId = setTimeout(spinObjects, 80);
        
        
        }    
}

let showProgress = () => {
    let currentGame = game.gameIndex;
    let element  = document.querySelector ('#progress');
    element.innerHTML =  `Points : ${game.points} <br> Game number ${currentGame}`
  }

let runButton = (id, func) => {
    let button = document.querySelector('#'+ id);
    button.onclick = () => {
      func.call();      
    }
  }

const new_game = () =>{
    location.reload();
}

const addPreSpinClasses = () => {
    let squares = document.querySelectorAll('.square');
    let start = randomRange(0, squares.length);
    let end = randomRange(4, squares.length);
    if(start > end){
        start = end;
        end = start;
    } 
    if(start === end)start = 0;
    for(let i = start; i< end; i++){
        squares[i].classList.add('spins');
    }
}

const start = () => {        
        game.zom_value.innerHTML = game.zombies;
        creatGrid();
        addPreSpinClasses();
        runButton('play', populate);
        runButton('collect', gameOverScreen);
        runButton('new_game', new_game);
}

start ();
