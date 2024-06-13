var rows = 5;
var colums = 5;
var currTile;
var otherTile;
var pieces = [];
var piecesCorrect = [];
var tile;
var rightSound = new Audio("right_feedback.wav");
rightSound.volume = 0.5



window.onload = function(){
   
    
    for (let i = 1; i <= rows *colums; i++){
        pieces.push(`witch_kitchen/${i}.png`);
    }

    for (let i = 0; i < rows *colums; i++){
        piecesCorrect.push(`witch_kitchen/${i+1}.png`);
        //alert(piecesCorrect[i])
    }

    // Embaralhando as peças
    for (let i = pieces.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pieces[i], pieces[j]] = [pieces[j], pieces[i]];
    }


    for (let i = 0; i < pieces.length; i++){
        tile = document.createElement("img");
        tile.src =  pieces[i]; 
       
       
      // DRAG 
        tile.addEventListener("dragstart", dragStart); // clica na imagem para arrastar
        tile.addEventListener("dragover", dragOver); //quando arrasta a imagem em outra
        tile.addEventListener("dragenter", dragEnter); //quando joga uma imagem em outra
        tile.addEventListener("dragleave", dragLeave); //quando tira uma imagem do  tabuleiro
        tile.addEventListener("drop", dragDrop); //solta a imagem em outra
        tile.addEventListener("dragend", dragEnd); //após soltar a imagem
        document.getElementById("board").append(tile); 
        
    }  
}


function dragStart() {
    currTile = this; 

}

function dragOver(e){
  
    e.preventDefault();
}

function dragEnter(e){
    
    e.preventDefault();
}

function dragLeave(){
       
}

function dragEnd()
{
    let currImg = currTile.src;
    let otherImg = otherTile.src;
    currTile.src = otherImg;
    otherTile.src = currImg;

    updatePiecesList()

    
    for (let i = 0; i < rows *colums; i++){
        var originalString = pieces[i];
        var letter = 'w'; // replace 'W' with the desired letter

        var index = originalString.indexOf(letter);
        if (index!== -1) {
        var cutString = originalString.substring(index);
        }
        
     if (piecesCorrect[i] !== cutString)
        {
            return;
           
        }  
   
    }
   gameOver();

}


function dragDrop() {
otherTile = this;
     
}

function updatePiecesList() {
    var boardImages = document.getElementById("board").getElementsByTagName("img");
    pieces = [];
    for (let i = 0; i < boardImages.length; i++) {
        pieces.push(boardImages[i].src);
    }
   
}

function gameOver() {
    rightSound.play();
    var board = document.getElementById('board');
    board.innerHTML = "";
    tile = document.createElement("img");
    tile.src = "witch_kitchen.png";
    tile.id = "end_game_image";
    document.getElementById("board").append(tile); 
    tile.classList.remove("board");
    tile.id = "gameOverImage";
    var gameOverElement = document.getElementById("game_over");
    gameOverElement.innerHTML = "Congratulations! You won the game!";
}