```javascript
const canvas =
  document.getElementById("canvas");

const ctx =
  canvas.getContext("2d");

const keys = {};

let running = false;

let cameraX = 0;
let cameraY = 0;

let reels = 0;

let nearbyNPC = null;
let nearbyReel = null;

function resize() {

  canvas.width =
    window.innerWidth;

  canvas.height =
    window.innerHeight;
}

window.addEventListener(
  "resize",
  resize
);

resize();

/* keyboard */

window.addEventListener(
  "keydown",
  e => {

    keys[e.key.toLowerCase()] = true;

    if(e.key.toLowerCase() === "e") {

      if(Dialogue.active) {

        Dialogue.next();

      } else {

        interact();
      }
    }
  }
);

window.addEventListener(
  "keyup",
  e => {

    keys[e.key.toLowerCase()] = false;
  }
);

/* cursor */

const cursor =
  document.getElementById("cursor");

window.addEventListener(
  "mousemove",
  e => {

    cursor.style.left =
      e.clientX + "px";

    cursor.style.top =
      e.clientY + "px";
  }
);

/* start */

document
  .getElementById("startButton")
  .onclick = () => {

    running = true;

    document
      .getElementById("menu")
      .style.display = "none";
  };

/* interaction */

function interact() {

  if(nearbyNPC) {

    Dialogue.start(
      nearbyNPC.lines
    );

    return;
  }

  if(nearbyReel) {

    nearbyReel.collected = true;

    reels++;

    document
      .getElementById("inventory")
      .textContent =
      `REELS: ${reels} / 2`;

    document
      .getElementById("objective")
      .textContent =
      reels >= 2
      ? "SOMETHING HAS CHANGED..."
      : "FIND ANOTHER REEL";

    if(reels >= 2) {

      setTimeout(
        () => Horror.trigger(),
        900
      );
    }
  }
}

/* proximity */

function distance(a,b) {

  return Math.hypot(
    a.x-b.x,
    a.y-b.y
  );
}

function updateNearby() {

  nearbyNPC = null;
  nearbyReel = null;

  for(const npc of World.npcs) {

    if(
      distance(Player,npc) < 110
    ) {

      nearbyNPC = npc;

      break;
    }
  }

  if(!nearbyNPC) {

    for(const reel of World.reels) {

      if(
        reel.collected
      ) continue;

      if(
        distance(Player,reel) < 100
      ) {

        nearbyReel = reel;

        break;
      }
    }
  }

  const interaction =
    document.getElementById(
      "interaction"
    );

  if(nearbyNPC) {

    interaction.textContent =
      "[E] TALK";

    interaction.style.opacity = "1";

    cursor.classList.add("active");

  } else if(nearbyReel) {

    interaction.textContent =
      "[E] TAKE REEL";

    interaction.style.opacity = "1";

    cursor.classList.add("active");

  } else {

    interaction.style.opacity = "0";

    cursor.classList.remove("active");
  }
}

/* camera */

function draw() {

  ctx.clearRect(
    0,
    0,
    canvas.width,
    canvas.height
  );

  cameraX =
    Player.x -
    canvas.width / 2;

  cameraY =
    Player.y -
    canvas.height / 2;

  cameraX =
    Math.max(
      0,
      Math.min(
        2200-canvas.width,
        cameraX
      )
    );

  cameraY =
    Math.max(
      0,
      Math.min(
        1400-canvas.height,
        cameraY
      )
    );

  ctx.save();

  ctx.translate(
    -cameraX,
    -cameraY
  );

  World.draw(ctx);

  Player.draw(ctx);

  ctx.restore();
}

/* loop */

function loop() {

  if(running && !Dialogue.active) {

    Player.update(keys);
  }

  updateNearby();

  draw();

  requestAnimationFrame(loop);
}

loop();
```
