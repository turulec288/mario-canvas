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
    SPACE: 32
  },

  init() {
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
      // 2. Draw elements
      // 3. Generate obstacles
      // 4. Clear obstacles array
      // 5. Check if isCollision and invoke .gameOver

    }, 1000 / this.FPS)
  },



  reset() {
    // 1. Create background
    // 2. Create player
    // 3. Create obstacles array
  },

  drawAll() {
    // 1. Draw background
    // 2. Draw player
    // 3. Draw obstacles array
  },

  clear() {
    // .clearRect(posX, posY, w, h)
  },

  generateObstacles() {
    // Use framesCounter to generate new Obstacles
  },

  clearObstacles() {
    // Clear obstacles array (.filter 👀)
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
  }
}
