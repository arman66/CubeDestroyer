// array of obstables
const myObstacles= [];
// array of invincible powerup
const myObstacles2= [];
//array of more obstacles
const myObstacles3= [];
//array of destroy power ups
const myObstacles4= [];

// timer variale
let timmerBlack;
// timer variale
let timmerYellow;

let objectCreate = 25;

let difficulty = setInterval(() => {
   
    console.log("object create: " +objectCreate);
       if(objectCreate>3){
           objectCreate= objectCreate-1
       }else{
          clearInterval(difficulty)
       }
   }, 1500);


//canvas area created and functions 
const myGameArea = {
    canvas: document.createElement('canvas'),
    frames: 0,
    start: function () {
      this.canvas.width = 800;
      this.canvas.height = 500;
      this.context = this.canvas.getContext('2d');
      document.body.insertBefore(this.canvas, document.body.childNodes[0]);
      // call updateGameArea() every 20 milliseconds
      this.interval = setInterval(updateGameArea, 20);
      this.over === false;
        
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      },
      stop: function (){

          clearInterval(this.interval)
      },
      game_over: function () {
          console.log("game over function fired");
          this.over= true
          
      },
      reset_game: function () {
              this.over=false
              console.log("reset function called ");
              location.reload()
          
      },
      score: function () {
        const points = Math.floor(this.frames / 10);
        //console.log("these are the frames: "+this.frames);
        this.context.font = '18px serif';
        this.context.fillStyle = 'black';
        this.context.fillText(`Score: ${points}`, 350, 50);
      },
  };
  

// constructor of objects created and drawn to the canvas
  class Player {
    constructor(width, height, color, x, y) {
      this.width = width;
      this.height = height;
      this.color = color;
      this.x = x;
      this.y = y;
      this.isInvincible = false;
      this.destroyCube= false
    }

    moveUp() {
        this.y -= 25;
      }
      moveDown() {
        this.y += 25;
      }
      moveLeft() {
        this.x -= 25;
      }
      moveRight() {
        this.x += 25;
      }
      left() {
        return this.x;
      }
      right() {
        return this.x + this.width;
      }
      top() {
        return this.y;
      }
      bottom() {
        return this.y + this.height;
      }
    
      crashWith(obstacle){
        return !(this.bottom() < obstacle.top() || this.top() > obstacle.bottom() || this.right() < obstacle.left() || this.left() > obstacle.right());
  }
    invincible5(){
        player.color= 'orange';
        player.width= 25;
        player.height=25;
        return this.isInvincible = true;
    }
    notInvincible(){
        player.color= 'red';
        player.width= 20;
        player.height=20;
        return this.isInvincible = false;
    }
    destroy5(){
        player.color= 'blue';
        player.width= 25;
        player.height=25;
        return this.destroyCube = true;
    }
    notDestroy(){
        player.color= 'red';
        player.width= 20;
        player.height=20;
        return this.destroyCube = false;
    }
      
   
    update() {
      const ctx = myGameArea.context;
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }
  // constructor of objects created and drawn to the canvas
  class Enemy {
    constructor(width, height, color, x, y) {
      this.width = width;
      this.height = height;
      this.color = color;
      this.x = x;
      this.y = y;
    }

    left() {
        return this.x;
      }
      right() {
        return this.x + this.width;
      }
      top() {
        return this.y;
      }
      bottom() {
        return this.y + this.height;
      }

      update() {
        const ctx = myGameArea.context;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
      }
    
  }


  //creates player

  const player = new Player(15, 15, 'red', 400, 250);
 
//function updates game area and any event in it
  const updateGameArea=()=> {
    
    myGameArea.clear();
    player.update();
    updateObstacles();
    checkGameOver();
    myGameArea.score()
    checkEatCube()
    checkInvincibility()
    checkDestroy()
   

    
  }

//starts game
  myGameArea.start();
//keydown events for movement
  document.addEventListener('keydown', e => {
    switch (e.keyCode) {
      case 38: player.moveUp(); 
       break;
      case 40: player.moveDown();  break;
      case 37: player.moveLeft();  break;
      case 39: player.moveRight();  break;
      case 32: myGameArea.reset_game();
    }
    
  })

 
//loops over arrays and updates to the canvas

  const updateObstacles =()=>{

    for(i=0; i<myObstacles.length; i++){
        myObstacles[i].y +=1;
        myObstacles[i].update();

    }
    for(i=0; i<myObstacles2.length; i++){
        myObstacles2[i].x +=1;
        myObstacles2[i].update();

    }
    for(i=0; i<myObstacles3.length; i++){
        myObstacles3[i].y -= 1;
        myObstacles3[i].update();
        

    }
    for(i=0; i<myObstacles4.length; i++){
        myObstacles4[i].x -= 1;
        myObstacles4[i].update();
        

    }

    myGameArea.frames+=1;

    //creates the objects for the array depending on framerate
    if(myGameArea.frames% objectCreate ===0){
        let minX = 0;
        let maxX= 800;
        let x = Math.floor(Math.random()*(maxX- minX +1)+ minX);
        let y= 0
        
        myObstacles.push(new Enemy(15, 15, 'green',x,y ))
       
    }
    if(myGameArea.frames% 500===0){
       
        let x = 0;
        let minY= 0;
        let maxY= 500;
        let y = Math.floor(Math.random()*(maxY- minY +1)+ minY);

        myObstacles2.push(new Enemy(5, 5, 'black',x,y ))
    }

    if(myGameArea.frames % 350===0){
        
        let minX= 0;
        let maxX= 800;
        let x = Math.floor(Math.random()*(maxX- minX +1)+ minX);
        let y = 500;

        myObstacles3.push(new Enemy(8, 8, 'Orange',x,y ))
    }
    if(myGameArea.frames % 500===0){
        
        let minY= 0;
        let maxY= 500;
        let x = 800;
        let y = Math.floor(Math.random()*(maxY- minY +1)+ minY);

        myObstacles4.push(new Enemy(8, 8, 'blue',x,y ))
    }

   
  
  }


  //funcitons for in game events 

  function checkGameOver() {

    // crashed function return true if there is a collition with green
    const crashed = myObstacles.some(function (obstacle) {
      return player.crashWith(obstacle);
    });
      
   //checks if collided invincible is false and destroy is false
    if (crashed=== true && player.isInvincible=== false && player.destroyCube === false) {
     myGameArea.stop()
     myGameArea.game_over()
    }
    // if destroy is true splice array with any crash with green
    else if(player.destroyCube === true){
        for(let i=0; i< myObstacles.length; i ++){
            if(player.crashWith(myObstacles[i])){
                myObstacles.splice(i,1)
            }
        }
    }
  }

  function checkEatCube() {

            for(let i=0; i<myObstacles2.length; i ++){
                if(player.crashWith(myObstacles2[i])){
                    myObstacles2.splice(i,1);
                    myObstacles.length= 0
                }
            }
}

function checkDestroy() {


    for(let i=0; i<myObstacles4.length; i ++){
        
        if(player.crashWith(myObstacles4[i])){
            myObstacles4.splice(i,1)
            player.destroy5();
            clearTimeout(timmerBlack)
            timmerBlack = setTimeout(() => {
                player.notDestroy();
            }, 3000);
            
            
        }
        
        

    }
}
  function checkInvincibility() {

            for(let i=0; i<myObstacles3.length; i ++){
                if(player.crashWith(myObstacles3[i])){
                    myObstacles3.splice(i,1);
                    player.invincible5();
                    clearTimeout(timmerYellow)
                    timmerYellow = setTimeout(() => {
                    player.notInvincible();
                    }, 3000);
            
                    
                }
            }
}




