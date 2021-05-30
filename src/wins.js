
const fetchDomElements = (element) => {
    return document.querySelectorAll(element);
}
 
const pointsIncrement = 5;

const checkHorizontalWin = () => {
    let squares = fetchDomElements('.square');

    for (let i =0 ; i<grid.length; i++){
        let row = grid[i];
                for (let j=0; j<row.length; j++){
                    if(j<=1){
                        if(squares[grid[i][j]].classList.contains('spins') && 
                           squares[grid[i][j + 1]].classList.contains('spins')&&
                        squares[grid[i][j + 2]].classList.contains('spins')){
                        game.points += pointsIncrement;
                    }
                    }
                   
                }
          
    }
}
const checkVerticalWin = () => {

    let squares = fetchDomElements('.square');
    for(let i =  0; i< grid.length; i++ ){
        let row = grid[i];
        for(let j = 0; j<row.length; j++){
            if(i<=1){
                if(squares[grid[i][j]].classList.contains('spins') &&
               squares[grid[i + 1][j]].classList.contains('spins') &&
               squares[grid[i + 2][j]].classList.contains('spins')){
                game.points += pointsIncrement;
            }
         }
            
        }
    }
       
    }
   

const checkWin = () => {
    checkHorizontalWin();
    checkVerticalWin();
}
