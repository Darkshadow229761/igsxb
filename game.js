```javascript
/* =========================================================
   THE LAST SHOW
   2D PIXEL HORROR ENGINE
========================================================= */

"use strict";

/* =========================================================
   CANVAS
========================================================= */

const canvas =
    document.getElementById("gameCanvas");

const ctx =
    canvas.getContext("2d");

ctx.imageSmoothingEnabled = false;


/* =========================================================
   GAME STATE
========================================================= */

let gameStarted = false;

let reelsCollected = 0;

let camera = {
    x: 0,
    y: 0
};

const keys = {};


/* =========================================================
   PLAYER
========================================================= */

const player = {

    x: 500,
    y: 650,

    speed: 1.7,

    width: 18,
    height: 25,

    direction: "down",

    moving: false,

    animation: 0,

    update() {

        if (!gameStarted || Dialogue.active)
            return;

        let dx = 0;
        let dy = 0;

        if (
            keys["w"] ||
            keys["arrowup"]
        ) {

            dy--;

            this.direction = "up";
        }

        if (
            keys["s"] ||
            keys["arrowdown"]
        ) {

            dy++;

            this.direction = "down";
        }

        if (
            keys["a"] ||
            keys["arrowleft"]
        ) {

            dx--;

            this.direction = "left";
        }

        if (
            keys["d"] ||
            keys["arrowright"]
        ) {

            dx++;

            this.direction = "right";
        }

        this.moving =
            dx !== 0 ||
            dy !== 0;

        if (this.moving) {

            const length =
                Math.hypot(dx, dy);

            dx /= length;
            dy /= length;

            const nextX =
                this.x +
                dx * this.speed;

            const nextY =
                this.y +
                dy * this.speed;

            if (!World.collides(nextX, nextY)) {

                this.x = nextX;
                this.y = nextY;
            }

            this.animation += .15;

        }

        this.x =
            Math.max(
                120,
                Math.min(
                    2020,
                    this.x
                )
            );

        this.y =
            Math.max(
                120,
                Math.min(
                    1250,
                    this.y
                )
            );
    },

    draw() {

        const x =
            Math.floor(this.x);

        const y =
            Math.floor(this.y);

        const bob =
            this.moving
                ? Math.sin(this.animation) * 1.5
                : 0;

        ctx.save();

        ctx.translate(
            x,
            Math.floor(y + bob)
        );

        /* shadow */

        ctx.fillStyle =
            "rgba(0,0,0,.35)";

        ctx.fillRect(
            -9,
            11,
            18,
            5
        );

        /* body */

        ctx.fillStyle =
            "#263c3c";

        ctx.fillRect(
            -7,
            2,
            14,
            13
        );

        /* outline */

        ctx.fillStyle =
            "#080706";

        ctx.fillRect(
            -8,
            2,
            2,
            14
        );

        ctx.fillRect(
            6,
            2,
            2,
            14
        );

        /* head */

        ctx.fillStyle =
            "#dfbd82";

        ctx.fillRect(
            -8,
            -10,
            16,
            14
        );

        /* hair */

        ctx.fillStyle =
            "#1a1511";

        ctx.fillRect(
            -8,
            -11,
            16,
            4
        );

        /* eyes */

        ctx.fillStyle =
            "#111";

        ctx.fillRect(
            -5,
            -5,
            2,
            3
        );

        ctx.fillRect(
            3,
            -5,
            2,
            3
        );

        ctx.restore();
    }
};


/* =========================================================
   WORLD
========================================================= */

const World = {

    width: 2200,
    height: 1400,

    walls: [

        {
            x: 90,
            y: 70,
            w: 2020,
            h: 55
        },

        {
            x: 90,
            y: 1275,
            w: 2020,
            h: 55
        },

        {
            x: 90,
            y: 70,
            w: 55,
            h: 1260
        },

        {
            x: 2055,
            y: 70,
            w: 55,
            h: 1260
        },

        /* furniture */

        {
            x: 680,
            y: 280,
            w: 250,
            h: 100
        },

        {
            x: 1300,
            y: 780,
            w: 260,
            h: 100
        }
    ],

    npcs: [

        {
            id: "milo",

            name: "MILO",

            x: 650,
            y: 550,

            color: "#6b3535",

            dialogue: [

                {
                    name: "MILO",

                    text:
                        "Oh! A visitor."
                },

                {
                    name: "MILO",

                    text:
                        "That's unusual."
                },

                {
                    name: "MILO",

                    text:
                        "The studio hasn't had visitors in years."
                },

                {
                    name: "MILO",

                    text:
                        "If you find a reel..."
                },

                {
                    name: "MILO",

                    text:
                        "Don't play it."
                }

            ]
        },

        {

            id: "edith",

            name: "EDITH",

            x: 1500,
            y: 420,

            color: "#39492f",

            dialogue: [

                {

                    name: "EDITH",

                    text:
                        "You're not supposed to be here."
                },

                {

                    name: "EDITH",

                    text:
                        "The studio closed a long time ago."
                },

                {

                    name: "EDITH",

                    text:
                        "So why is the projector running?"
                },

                {

                    name: "EDITH",

                    text:
                        "..."
                }

            ]
        },

        {

            id: "unknown",

            name: "???",

            x: 1830,
            y: 1030,

            color: "#38304c",

            dialogue: [

                {

                    name: "???",

                    text:
                        "..."
                },

                {

                    name: "???",

                    text:
                        "You shouldn't have come back."
                }

            ]
        }

    ],

    reels: [

        {
            x: 1050,
            y: 420,
            collected: false
        },

        {
            x: 1750,
            y: 650,
            collected: false
        },

        {
            x: 420,
            y: 1030,
            collected: false
        }

    ],

    draw() {

        /* background */

        ctx.fillStyle =
            "#17120e";

        ctx.fillRect(
            0,
            0,
            this.width,
            this.height
        );

        /* floor */

        ctx.fillStyle =
            "#69533b";

        ctx.fillRect(
            100,
            100,
            2000,
            1200
        );

        /* tiles */

        ctx.strokeStyle =
            "#594633";

        ctx.lineWidth = 1;

        for (
            let x = 100;
            x <= 2100;
            x += 32
        ) {

            ctx.beginPath();

            ctx.moveTo(x,100);
            ctx.lineTo(x,1300);

            ctx.stroke();
        }

        for (
            let y = 100;
            y <= 1300;
            y += 32
        ) {

            ctx.beginPath();

            ctx.moveTo(100,y);
            ctx.lineTo(2100,y);

            ctx.stroke();
        }

        /* walls */

        ctx.fillStyle =
            "#17120e";

        for (const wall of this.walls) {

            ctx.fillRect(
                wall.x,
                wall.y,
                wall.w,
                wall.h
            );
        }

        this.drawDecor();

        this.drawNPCs();

        this.drawReels();

        this.drawDoor();
    },

    drawDecor() {

        /* posters */

        this.poster(
            300,
            180,
            "THE",
            "LAST",
            "SHOW"
        );

        this.poster(
            1650,
            180,
            "SMILE!",
            "EVERYTHING",
            "IS FINE"
        );

        /* tables */

        this.table(
            680,
            280,
            250,
            100
        );

        this.table(
            1300,
            780,
            260,
            100
        );
    },

    poster(x,y,a,b,c) {

        ctx.fillStyle =
            "#d1b476";

        ctx.fillRect(
            x,
            y,
            140,
            175
        );

        ctx.strokeStyle =
            "#0a0806";

        ctx.lineWidth = 5;

        ctx.strokeRect(
            x,
            y,
            140,
            175
        );

        ctx.fillStyle =
            "#21180f";

        ctx.font =
            "bold 18px monospace";

        ctx.textAlign =
            "center";

        ctx.fillText(
            a,
            x + 70,
            y + 45
        );

        ctx.fillText(
            b,
            x + 70,
            y + 72
        );

        ctx.fillText(
            c,
            x + 70,
            y + 99
        );

        ctx.textAlign =
            "left";
    },

    table(x,y,w,h) {

        ctx.fillStyle =
            "#3b2416";

        ctx.fillRect(
            x,
            y,
            w,
            h
        );

        ctx.strokeStyle =
            "#110b08";

        ctx.lineWidth = 7;

        ctx.strokeRect(
            x,
            y,
            w,
            h
        );
    },

    drawNPCs() {

        for (const npc of this.npcs) {

            ctx.save();

            ctx.translate(
                Math.floor(npc.x),
                Math.floor(npc.y)
            );

            /* shadow */

            ctx.fillStyle =
                "rgba(0,0,0,.4)";

            ctx.fillRect(
                -13,
                15,
                26,
                6
            );

            /* body */

            ctx.fillStyle =
                npc.color;

            ctx.fillRect(
                -11,
                3,
                22,
                20
            );

            ctx.fillStyle =
                "#080706";

            ctx.fillRect(
                -13,
                3,
                3,
                21
            );

            ctx.fillRect(
                10,
                3,
                3,
                21
            );

            /* head */

            ctx.fillStyle =
                "#dfbd82";

            ctx.fillRect(
                -14,
                -17,
                28,
                23
            );

            /* hair */

            ctx.fillStyle =
                "#17120f";

            ctx.fillRect(
                -14,
                -18,
                28,
                6
            );

            /* eyes */

            ctx.fillStyle =
                "#111";

            ctx.fillRect(
                -8,
                -9,
                4,
                5
            );

            ctx.fillRect(
                4,
                -9,
                4,
                5
            );

            /* smile */

            ctx.fillRect(
                -5,
                -1,
                10,
                2
            );

            ctx.restore();
        }
    },

    drawReels() {

        for (const reel of this.reels) {

            if (reel.collected)
                continue;

            ctx.save();

            ctx.translate(
                Math.floor(reel.x),
                Math.floor(reel.y)
            );

            /* outer */

            ctx.fillStyle =
                "#090909";

            ctx.fillRect(
                -13,
                -13,
                26,
                26
            );

            /* inner */

            ctx.fillStyle =
                "#cdb47b";

            ctx.fillRect(
                -3,
                -3,
                6,
                6
            );

            ctx.fillRect(
                -10,
                -10,
                5,
                5
            );

            ctx.fillRect(
                5,
                5,
                5,
                5
            );

            ctx.restore();
        }
    },

    drawDoor() {

        ctx.fillStyle =
            "#21140e";

        ctx.fillRect(
            1020,
            105,
            120,
            15
        );

        ctx.fillStyle =
            "#0a0806";

        ctx.fillRect(
            1020,
            120,
            120,
            80
        );
    },

    collides(x,y) {

        const halfW =
            player.width / 2;

        const halfH =
            player.height / 2;

        for (const wall of this.walls) {

            if (
                x + halfW > wall.x &&
                x - halfW < wall.x + wall.w &&
                y + halfH > wall.y &&
                y - halfH < wall.y + wall.h
            ) {

                return true;
            }
        }

        return false;
    }
};


/* =========================================================
   DIALOGUE
========================================================= */

const Dialogue = {

    active: false,

    lines: [],

    index: 0,

    start(lines) {

        this.lines =
            lines;

        this.index = 0;

        this.active = true;

        this.show();
    },

    show() {

        const line =
            this.lines[this.index];

        document
            .getElementById("speaker")
            .textContent =
            line.name;

        document
            .getElementById("dialogueText")
            .textContent =
            line.text;

        document
            .getElementById("dialogue")
            .style.display =
            "block";
    },

    next() {

        this.index++;

        if (
            this.index >=
            this.lines.length
        ) {

            this.active = false;

            document
                .getElementById("dialogue")
                .style.display =
                "none";

            return;
        }

        this.show();
    }
};


/* =========================================================
   INPUT
========================================================= */

window.addEventListener(
    "keydown",
    event => {

        keys[
            event.key.toLowerCase()
        ] = true;

        if (
            event.key.toLowerCase()
            === "e"
        ) {

            if (Dialogue.active) {

                Dialogue.next();

            } else {

                interact();
            }
        }
    }
);

window.addEventListener(
    "keyup",
    event => {

        keys[
            event.key.toLowerCase()
        ] = false;
    }
);


/* =========================================================
   DISTANCE
========================================================= */

function distance(a,b) {

    return Math.hypot(
        a.x - b.x,
        a.y - b.y
    );
}


/* =========================================================
   INTERACTION
========================================================= */

let nearbyNPC = null;

let nearbyReel = null;

function findNearby() {

    nearbyNPC = null;

    nearbyReel = null;

    for (const npc of World.npcs) {

        if (
            distance(
                player,
                npc
            ) < 65
        ) {

            nearbyNPC =
                npc;

            break;
        }
    }

    if (!nearbyNPC) {

        for (
            const reel of World.reels
        ) {

            if (
                reel.collected
            )
                continue;

            if (
                distance(
                    player,
                    reel
                ) < 55
            ) {

                nearbyReel =
                    reel;

                break;
            }
        }
    }

    const interaction =
        document.getElementById(
            "interaction"
        );

    if (nearbyNPC) {

        interaction.textContent =
            "[E] TALK";

        interaction.style.opacity =
            "1";

        cursor.classList.add(
            "active"
        );

    }

    else if (nearbyReel) {

        interaction.textContent =
            "[E] TAKE REEL";

        interaction.style.opacity =
            "1";

        cursor.classList.add(
            "active"
        );

    }

    else {

        interaction.style.opacity =
            "0";

        cursor.classList.remove(
            "active"
        );
    }
}


function interact() {

    if (nearbyNPC) {

        Dialogue.start(
            nearbyNPC.dialogue
        );

        return;
    }

    if (nearbyReel) {

        nearbyReel.collected =
            true;

        reelsCollected++;

        document
            .getElementById(
                "reelCounter"
            )
            .textContent =
            `REELS: ${reelsCollected} / 3`;

        if (
            reelsCollected === 1
        ) {

            document
                .getElementById(
                    "objective"
                )
                .textContent =
                "FIND THE OTHER REELS";
        }

        if (
            reelsCollected === 3
        ) {

            document
                .getElementById(
                    "objective"
                )
                .textContent =
                "THE STUDIO ISN'T EMPTY...";

            setTimeout(
                horrorEvent,
                1000
            );
        }
    }
}


/* =========================================================
   HORROR EVENT
========================================================= */

function horrorEvent() {

    cursor.classList.add(
        "danger"
    );

    const film =
        document.getElementById(
            "filmNoise"
        );

    film.style.opacity =
        ".35";

    canvas.style.filter =
        "contrast(1.5) brightness(.7)";

    setTimeout(() => {

        film.style.opacity =
            ".04";

        canvas.style.filter =
            "none";

        cursor.classList.remove(
            "danger"
        );

    }, 850);
}


/* =========================================================
   CAMERA
========================================================= */

function updateCamera() {

    const targetX =
        player.x -
        canvas.width / 2;

    const targetY =
        player.y -
        canvas.height / 2;

    camera.x +=
        (targetX - camera.x) *
        .12;

    camera.y +=
        (targetY - camera.y) *
        .12;

    camera.x =
        Math.max(
            0,
            Math.min(
                World.width -
                canvas.width,
                camera.x
            )
        );

    camera.y =
        Math.max(
            0,
            Math.min(
                World.height -
                canvas.height,
                camera.y
            )
        );
}


/* =========================================================
   DRAW
========================================================= */

function draw() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    ctx.save();

    ctx.translate(
        -Math.floor(camera.x),
        -Math.floor(camera.y)
    );

    World.draw();

    player.draw();

    ctx.restore();
}


/* =========================================================
   CUSTOM CURSOR
========================================================= */

const cursor =
    document.getElementById(
        "cursor"
    );

window.addEventListener(
    "mousemove",
    event => {

        cursor.style.left =
            `${event.clientX}px`;

        cursor.style.top =
            `${event.clientY}px`;

        cursor.style.display =
            "block";
    }
);

window.addEventListener(
    "mouseleave",
    () => {

        cursor.style.display =
            "none";
    }
);

window.addEventListener(
    "mouseenter",
    () => {

        cursor.style.display =
            "block";
    }
);


/* =========================================================
   START
========================================================= */

document
    .getElementById(
        "startButton"
    )
    .addEventListener(
        "click",
        () => {

            gameStarted =
                true;

            document
                .getElementById(
                    "menu"
                )
                .style.display =
                "none";
        }
    );


/* =========================================================
   MAIN LOOP
========================================================= */

function gameLoop() {

    player.update();

    updateCamera();

    findNearby();

    draw();

    requestAnimationFrame(
        gameLoop
    );
}

gameLoop();
```
