```javascript
const World = {

  npcs: [

    {
      id: "milo",
      name: "MILO",
      x: 650,
      y: 550,

      lines: [

        {
          name: "MILO",
          text: "Oh! A visitor."
        },

        {
          name: "MILO",
          text: "That's unusual."
        },

        {
          name: "MILO",
          text: "The studio hasn't had visitors in years."
        },

        {
          name: "MILO",
          text: "If you find a reel... don't play it."
        }

      ]
    },

    {
      id: "edith",
      name: "EDITH",
      x: 1500,
      y: 420,

      lines: [

        {
          name: "EDITH",
          text: "You're not supposed to be here."
        },

        {
          name: "EDITH",
          text: "The studio closed a long time ago."
        },

        {
          name: "EDITH",
          text: "So why is the projector running?"
        }

      ]
    }

  ],

  reels: [

    {
      x: 1050,
      y: 400,
      collected: false
    },

    {
      x: 1750,
      y: 650,
      collected: false
    }

  ],

  draw(ctx) {

    /* floor */

    ctx.fillStyle = "#6a543c";

    ctx.fillRect(
      100,
      100,
      2000,
      1200
    );

    /* floor tiles */

    ctx.strokeStyle = "#594632";
    ctx.lineWidth = 2;

    for(let x = 100; x < 2100; x += 55) {

      ctx.beginPath();

      ctx.moveTo(x,100);
      ctx.lineTo(x,1300);

      ctx.stroke();
    }

    for(let y = 100; y < 1300; y += 55) {

      ctx.beginPath();

      ctx.moveTo(100,y);
      ctx.lineTo(2100,y);

      ctx.stroke();
    }

    /* walls */

    ctx.fillStyle = "#17130f";

    ctx.fillRect(90,70,2020,55);
    ctx.fillRect(90,1275,2020,55);
    ctx.fillRect(90,70,55,1260);
    ctx.fillRect(2055,70,55,1260);

    this.drawNPCs(ctx);
    this.drawReels(ctx);
  },

  drawNPCs(ctx) {

    for(const npc of this.npcs) {

      ctx.save();

      ctx.translate(
        npc.x,
        npc.y
      );

      /* body */

      ctx.fillStyle = "#482727";

      ctx.fillRect(
        -22,
        25,
        44,
        40
      );

      ctx.strokeStyle = "#080706";
      ctx.lineWidth = 6;

      ctx.strokeRect(
        -22,
        25,
        44,
        40
      );

      /* head */

      ctx.beginPath();

      ctx.arc(
        0,
        0,
        32,
        0,
        Math.PI * 2
      );

      ctx.fillStyle = "#dfbd82";

      ctx.fill();

      ctx.stroke();

      /* eyes */

      ctx.fillStyle = "#111";

      ctx.fillRect(-13,-9,7,11);
      ctx.fillRect(6,-9,7,11);

      /* smile */

      ctx.beginPath();

      ctx.arc(
        0,
        8,
        11,
        0,
        Math.PI
      );

      ctx.stroke();

      ctx.restore();
    }
  },

  drawReels(ctx) {

    for(const reel of this.reels) {

      if(reel.collected)
        continue;

      ctx.save();

      ctx.translate(
        reel.x,
        reel.y
      );

      ctx.beginPath();

      ctx.arc(
        0,
        0,
        25,
        0,
        Math.PI * 2
      );

      ctx.fillStyle = "#111";
      ctx.fill();

      ctx.strokeStyle = "#080706";
      ctx.lineWidth = 7;

      ctx.stroke();

      ctx.fillStyle = "#d6bb83";

      ctx.beginPath();
      ctx.arc(-8,-8,6,0,Math.PI*2);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(8,8,6,0,Math.PI*2);
      ctx.fill();

      ctx.restore();
    }
  }
};
```
