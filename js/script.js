const myObstacles= [];
const myGameArea = {
    canvas: document.createElement('canvas'),
    frames: 0,
    start: function () {
      this.canvas.width = 480;
      this.canvas.height = 270;
      this.context = this.canvas.getContext('2d');
      document.body.insertBefore(this.canvas, document.body.childNodes[0]);
      // call updateGameArea() every 20 milliseconds
      this.interval = setInterval(updateGameArea, 20);
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      },
  };
  


  class Enemy{
      constructor(width, height,color, x, y){
        this.width = width;
        this.height = height;
        this.color = color;
        this.x = x;
        this.y = y;
      }
      update() {
        const ctx = myGameArea.context;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
      }
  }

  class Player {
    constructor(width, height, color, x, y) {
      this.width = width;
      this.height = height;
      this.color = color;
      this.x = x;
      this.y = y;
   
     
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

   
    update() {
      const ctx = myGameArea.context;
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }


  const player = new Player(25, 25, 'red', 0, 110);
  const enemy = new Enemy(15,15, 'blue', 125, 75);

  const updateGameArea=()=> {
    myGameArea.clear();
    player.update();
    enemy.update();
    updateObstacles();
  }


  myGameArea.start();

  document.addEventListener('keydown', e => {
    switch (e.keyCode) {
      case 38: player.moveUp();    console.log('up',    player); break;
      case 40: player.moveDown();  console.log('down',  player); break;
      case 37: player.moveLeft();  console.log('left',  player); break;
      case 39: player.moveRight(); console.log('right', player); break;
    }
    
  })

  const updateObstacles =()=>{

    for(i=0; i<myObstacles.length; i++){
        //myObstacles[i].x +=1;
        myObstacles[i].update();

    }

    myGameArea.frames+=1;
    if(myGameArea.frames% 120===0){
        let minX = 0;
        let maxX= 675;
        let x = Math.floor(Math.random()*(maxX- minX +1)+ minX);
        let minY= 0;
        let maxY= 475;
        let y = Math.floor(Math.random()*(maxY- minY +1)+ minY);

        myObstacles.push(new Enemy(15, 15, 'green',x,y ))
    }

  }