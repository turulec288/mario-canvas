class Obstacle {
  constructor(ctx, gameWidth, playerPosY0, playerHeight) {

    this.ctx = ctx;
    this.width = 14;
    this.height = this.width * 5;

    this.posX = gameWidth;
    this.posY = playerPosY0 + playerHeight - this.height;

    this.velX = 10;
  }

  draw() {
    // .fillRect(posX, posY, w, h);
    this.ctx.fillRect(this.posX,  this.posY, this.width, this.height);
    // .move
    this.move();
  }

  move() {
     // Change this.posX (Move horizontally)
     this.posX -= this.velX
  }
}