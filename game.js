const Game = {
  canvas: undefined,
  ctx: undefined,
  width: undefined,
  height: undefined,
  FPS: 60,
  framesCounter: 0,
  background: undefined,
  player: undefined,
  obstacles: [],

  keys: {
    TOP: 38,
    right: 39,
    left:37,
    SPACE: 32
  },

  init() {
    this.setContext();
    this.setDimensions();
    this.start();
    //llama al reset, en el reset tenemos q tener la creacion del background
    //en el reset inicializo los obstaculos con un array vacio
  },
  setContext(){
    this.canvas = document.querySelector("#myCanvas");
    this.ctx = this.canvas.getContext("2d");
  },
  setDimensions() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.canvas.setAttribute('width', this.width);
    this.canvas.setAttribute('height', this.height);
  },

  start() {

    this.reset()

    this.interval = setInterval(() => {

      this.framesCounter++;
      if(this.framesCounter > 3000){
        this.framesCounter = 0;
      }

      // 1. Clear canvas
      this.clear()
      // 2. Draw elements
      this.drawAll()
      // 3. Generate obstacles
        this.generateObstacles()
      // 4. Clear obstacles array
      this.clearObstacles()
      // 5. Check if isCollision and invoke .gameOver
      if(this.isCollision()){
        this.gameOver();
      }

    }, 1000 / this.FPS)
  },



  reset() {
    // 1. Create background
    this.background= new Background(this.ctx, this.width, this.height);
    // 2. Create player
    this.player=new Player(this.ctx, this.width, this.height, this.keys)
    // 3. Create obstacles array
    this.obstacles = [];
  },

  drawAll() {
    // 1. Draw background
    this.background.draw();
    // 2. Draw player
    this.player.draw(this.framesCounter)
    // 3. Draw obstacles array
    this.obstacles.forEach((obs)=>{
      obs.draw()
    })
  },

  clear() {
    // .clearRect(posX, posY, w, h)
this.ctx.clearRect(0,0, this.width, this.height);
  },

  generateObstacles() {
    // Use framesCounter to generate new Obstacles
    if(this.framesCounter %100===0){
      this.obstacles.push(new Obstacle(this.ctx, this.width, this.player.posY0, this.player.height))
    }
  },

  clearObstacles() {
    // Clear obstacles array (.filter 👀)
    this.obstacles=this.obstacles.filter(function(obs){
      return obs.posX>=0
    })
  },

  isCollision() {
    return this.obstacles.some(obs => {
      return (
        this.player.posX + this.player.width >= obs.posX &&
        this.player.posY + this.player.height >= obs.posY &&
        this.player.posX <= obs.posX + obs.width
      )
    })
  },

  gameOver() {
    // .clearInterval
    clearInterval(this.interval); 

  }
}
