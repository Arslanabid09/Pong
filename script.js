let Over = document.querySelector('p');
let board = document.getElementById("canvas");
let score = document.getElementById("score");
// canvas
let boardWidth = 470;
let boardHeight = 470;
// players
 let PlayerWidth = 10; 
let PlayerHeight = 50;
let playerScore = 0;
VelocityY = 0;
let Player1 = {
    x: 10,
    y: 200,
    width: PlayerWidth,
    height: PlayerHeight,
    color: "#fff",
    velocity1: VelocityY
    
}

let Player2 = {
    x: boardWidth - PlayerWidth - 10,
    y: 200,
    width: PlayerWidth,
    height: PlayerHeight,
    color: "#fff",
    velocity2: VelocityY
    
}
let ballWidth = 20;
let ballHeight = 20;

let gameLoop;
let ball ={
    x: boardWidth/2,
    y: boardHeight/2,
    width: ballWidth,
    height: ballHeight,
    color: "blue",
    velocityX: 2,
    velocityY: 1
}
let context = board.getContext("2d");
window.onload = ()=>{
    board.width = boardWidth;
    board.height = boardHeight;
    // Player1 
    context.fillStyle = Player1.color;
    context.fillRect(Player1.x,Player1.y , Player1.width, Player1.height);
    // Player2
    context.fillStyle = Player2.color;
    context.fillRect(Player2.x,Player2.y,Player2.width,Player2.height)
    
    
    requestAnimationFrame(Move);
    document.addEventListener("keyup",movePlayer);
    board.addEventListener('click',restart)
    }
    function movePlayer(e){
        if(e.code == "KeyU"){
            Player1.velocity1 = -3
        }
        else if(e.code == "KeyD"){
            Player1.velocity1 = 3
        }
        // player2
        if(e.code =="ArrowUp"){
            Player2.velocity2 = -3
        }
        else if(e.code == "ArrowDown"){
            Player2.velocity2 = 3
        }
        
    }
    function Move(){
        gameLoop = requestAnimationFrame(Move)
        // Player1
        let board = document.getElementById("canvas");
        let context  = board.getContext("2d");
        context.clearRect(0,0 , board.width, board.height)
        context.fillStyle = Player1.color;
        context.fillRect(Player1.x,Player1.y , Player1.width, Player1.height);
        let nextPlayer1 = Player1.y + Player1.velocity1
        if(!outBoundary(nextPlayer1)){
            Player1.y  =  nextPlayer1
        }
        // Player2
        context.fillStyle = Player2.color;
        context.fillRect(Player2.x,Player2.y,Player2.width,Player2.height)
        let nextPlayer2 = Player2.y + Player2.velocity2;
        if(!outBoundary(nextPlayer2)){
            Player2.y = nextPlayer2
        }
        // Ball
        if(onCollision(ball,Player1)){
            ball.velocityX = -ball.velocityX
            let newScore = ++playerScore
            score.innerHTML = 'Score:'+newScore
            
            
        }
        if(onCollision(ball,Player2)){
            ball.velocityX = -ball.velocityX
            let newSore = ++playerScore
            score.innerHTML = 'Score:'+newSore
        }
        drawBall()
        gameOver()
    }
    function drawBall() {
        context.fillStyle = ball.color;
        context.fillRect(ball.x, ball.y, ball.width, ball.height);
        ball.x += ball.velocityX;
        ball.y += ball.velocityY;
        
        if (ball.y <= 0 || ball.y + ball.height >= boardHeight) {
            ball.velocityY = -ball.velocityY;
        }
        
        }
function outBoundary(positionY){
    return (positionY < 0 || ++positionY + PlayerHeight > boardHeight)
}
function onCollision(a,b){ 
    return a.x < b.x + b.width && a.x +a.width> b.x && a.y < b.y + b.height && a.y + a.height > b.y 
}
        function gameOver() {
    if (ball.x +ball.width > boardWidth || ball.x < 0) {
    Over.style.display = 'block';        
        // Stop the game loop
        cancelAnimationFrame(gameLoop);
    }
}
function restart() {
    ball.x = boardWidth / 2;  
    ball.y = boardHeight / 2; 
    ball.velocityX = 2;       
    ball.velocityY = 1; 
    Over.style.display = 'none'
    playerScore = 0;  // Reset the playerScore variable
    score.innerHTML = 'Score: 0';
    requestAnimationFrame(Move)
}

