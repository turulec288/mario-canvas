class Player {

  constructor(ctx, gameW, gameH, keys) {

    this.ctx = ctx;

    this.gameWidth = gameW;
    this.gameHeight = gameH;

    this.width = 100;
    this.height = 100;

    this.image = new Image();
    this.image.src = "./img/player.png";
    this.image.frames = 3;
    this.image.framesIndex = 0;

    this.posX = this.gameWidth/2;
    this.posY = this.gameHeight - this.height - 20;
    this.posY0 = this.posY;

    this.velY = 1;
    this.gravity = 0.4;

    this.keys = keys;

    this.bullets = [];

    this.setListeners();
  }

  draw(framesCounter) {

    this.ctx.drawImage(
      this.image,
      this.image.width / this.image.frames * this.image.framesIndex,
      0,
      this.image.width / this.image.frames,
      this.image.height,
      this.posX,
      this.posY,
      this.width,
      this.height
    )

    // 2. Animate player
    this.animate(framesCounter);
    // 3. Move player
    this.move()
    // 4. Draw bullets
    this.bullets.forEach((bullet)=>{bullet.draw()})
    // 5. Clear bullets
    this.bullets = this.bullets.filter((bullet)=>{
      return bullet
    })
  }

  animate(framesCounter) {
    if (framesCounter % 5 == 0) {
      this.image.framesIndex++;
    }

    if (this.image.framesIndex >= this.image.frames) {
      this.image.framesIndex = 0
    }
  }

  move() {
    if (this.posY < this.posY0) {   // Está saltando!
      this.posY += this.velY;
      this.velY += this.gravity;
    } else {
      this.posY = this.posY0;
      this.velY = 1;
    }
  }

  setListeners() {

    document.addEventListener("keydown", e => {
      switch (e.keyCode) {
        case this.keys.TOP:
          // Check if its on the floor 👀
          if(this.posY>= this.posY0){this.jump()}
          // .jump()
          break;
        case this.keys.SPACE:
          // .shoot
          this.shoot();
          break;
      }
    });
  }

  jump() {
    this.posY -= 40;
    this.velY -= 8;
  }

  shoot() {
    // Add new Bullet to the bullets array
    this.bullets.push(new Bullets(this.ctx, this.posX, this.posY, this.posY0, this.width,this.height))
  }

  clearBullets() {
    // Clear bullets (.filter 👀)
    this.bullets=this.bullets.frilter((bullet)=>{
      return bullet.posX <= this.gameHeight
    })
  }
}
