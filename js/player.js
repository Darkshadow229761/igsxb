```javascript
const Player = {

  x: 500,
  y: 650,

  speed: 4,

  width: 40,
  height: 55,

  update(keys) {

    let dx = 0;
    let dy = 0;

    if (keys["w"] || keys["arrowup"])
      dy--;

    if (keys["s"] || keys["arrowdown"])
      dy++;

    if (keys["a"] || keys["arrowleft"])
      dx--;

    if (keys["d"] || keys["arrowright"])
      dx++;

    if (dx !== 0 || dy !== 0) {

      const length =
        Math.sqrt(dx * dx + dy * dy);

      dx /= length;
      dy /= length;

      this.x += dx * this.speed;
      this.y += dy * this.speed;
    }

    this.x =
      Math.max(120, Math.min(2080, this.x));

    this.y =
      Math.max(120, Math.min(1280, this.y));
  },

  draw(ctx) {

    ctx.save();

    ctx.translate(this.x, this.y);

    ctx.imageSmoothingEnabled = false;

    /* body */

    ctx.fillStyle = "#263c3c";

    ctx.fillRect(
      -18,
      15,
      36,
      38
    );

    /* outline */

    ctx.strokeStyle = "#080706";
    ctx.lineWidth = 6;

    ctx.strokeRect(
      -18,
      15,
      36,
      38
    );

    /* head */

    ctx.beginPath();

    ctx.arc(
      0,
      0,
      25,
      0,
      Math.PI * 2
    );

    ctx.fillStyle = "#dfbd82";

    ctx.fill();

    ctx.stroke();

    /* eyes */

    ctx.fillStyle = "#111";

    ctx.fillRect(-10, -7, 6, 9);
    ctx.fillRect(4, -7, 6, 9);

    ctx.restore();
  }
};
```
