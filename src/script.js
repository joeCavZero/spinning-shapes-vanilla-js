const CANVAS_WIDTH = 720;
const CANVAS_HEIGHT = 720;
const TARGET_FPS = 60;


/** @type {HTMLCanvasElement} */
let canvas = document.getElementById("canvas");
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

let ctx = canvas.getContext("2d");

function clean() {
    ctx.fillStyle = "#000";
    ctx.fillRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function draw_point({x, y}) {
    const SIZE = 10;
    ctx.fillStyle = "#fff";
    ctx.fillRect(
        x - SIZE/2,
        y - SIZE/2,
        SIZE,
        SIZE,
    );
}

function draw_line(p1, p2, color) {
    ctx.strokeStyle = color || "#fff";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();

}

function to_canvas({x, y}) {
    return {
        x: (x + 1)/2 * canvas.width,
        y: (1 - (y + 1)/2) * canvas.height,
    }
}

function project({x, y, z}) {
    return {
        x: x/z,
        y: y/z,
    };
}

let cube1 = {
    color: "#ff5",
    angle_factor: 1,
    points: [
        {x: 0.5, y: 0.5, z: -0.5},
        {x: -0.5, y: 0.5, z: -0.5},
        {x: 0.5, y: -0.5, z: -0.5},
        {x: -0.5, y: -0.5, z: -0.5},

        {x: 0.5, y: 0.5, z: 0.5},
        {x: -0.5, y: 0.5, z: 0.5},
        {x: 0.5, y: -0.5, z: 0.5},
        {x: -0.5, y: -0.5, z: 0.5}
    ],
    lines: [
        [0,1],
        [1,3],
        [2,0],
        [2,3],

        [4,5],
        [5,7],
        [6,4],
        [6,7],

        [0,4],
        [1,5],
        [2,6],
        [3,7],
    ],
};

let cube2 = {
    color: "#f5f",
    angle_factor: -0.3,
    points: [
        {x: 0.25, y: 0.25, z: -0.25},
        {x: -0.25, y: 0.25, z: -0.25},
        {x: 0.25, y: -0.25, z: -0.25},
        {x: -0.25, y: -0.25, z: -0.25},

        {x: 0.25, y: 0.25, z: 0.25},
        {x: -0.25, y: 0.25, z: 0.25},
        {x: 0.25, y: -0.25, z: 0.25},
        {x: -0.25, y: -0.25, z: 0.25}
    ],
    lines: [
        [0,1],
        [1,3],
        [2,0],
        [2,3],

        [4,5],
        [5,7],
        [6,4],
        [6,7],

        [0,4],
        [1,5],
        [2,6],
        [3,7],
    ],
};

let pyramid1 = {
    color: "#55f",
    angle_factor: 0.7,
    points: [
        // base (quadrado)
        {x: 0.5,  y: 0.5,  z: -0.5},  // 0
        {x: -0.5, y: 0.5,  z: -0.5},  // 1
        {x: 0.5,  y: -0.5, z: -0.5},  // 2
        {x: -0.5, y: -0.5, z: -0.5},  // 3

        // ápice
        {x: 0.0,  y: 0.0,  z: 0.6},   // 4
    ],
    lines: [
        // borda da base
        [0,1],
        [1,3],
        [3,2],
        [2,0],

        // arestas até o ápice
        [0,4],
        [1,4],
        [2,4],
        [3,4],
    ],
};

let gridCube3 = {
    color: "#5f5",
    angle_factor: 0.45,

    points: [
        {x:-0.5, y:-0.5, z:-0.5}, // 0
        {x: 0.0, y:-0.5, z:-0.5}, // 1
        {x: 0.5, y:-0.5, z:-0.5}, // 2
        {x:-0.5, y: 0.0, z:-0.5}, // 3
        {x: 0.0, y: 0.0, z:-0.5}, // 4
        {x: 0.5, y: 0.0, z:-0.5}, // 5
        {x:-0.5, y: 0.5, z:-0.5}, // 6
        {x: 0.0, y: 0.5, z:-0.5}, // 7
        {x: 0.5, y: 0.5, z:-0.5}, // 8

        {x:-0.5, y:-0.5, z: 0.0}, // 9
        {x: 0.0, y:-0.5, z: 0.0}, // 10
        {x: 0.5, y:-0.5, z: 0.0}, // 11
        {x:-0.5, y: 0.0, z: 0.0}, // 12

        {x: 0.5, y: 0.0, z: 0.0}, // 13
        {x:-0.5, y: 0.5, z: 0.0}, // 14
        {x: 0.0, y: 0.5, z: 0.0}, // 15
        {x: 0.5, y: 0.5, z: 0.0}, // 16

        {x:-0.5, y:-0.5, z: 0.5}, // 17
        {x: 0.0, y:-0.5, z: 0.5}, // 18
        {x: 0.5, y:-0.5, z: 0.5}, // 19
        {x:-0.5, y: 0.0, z: 0.5}, // 20
        {x: 0.0, y: 0.0, z: 0.5}, // 21
        {x: 0.5, y: 0.0, z: 0.5}, // 22
        {x:-0.5, y: 0.5, z: 0.5}, // 23
        {x: 0.0, y: 0.5, z: 0.5}, // 24
        {x: 0.5, y: 0.5, z: 0.5}, // 25
    ],

    lines: [
        // ===== Face z = -0.5 (frente): horizontais =====
        [0,1],[1,2],
        [3,4],[4,5],
        [6,7],[7,8],
        // ===== Face z = -0.5 (frente): verticais =====
        [0,3],[3,6],
        [1,4],[4,7],
        [2,5],[5,8],

        // ===== Face z = +0.5 (trás): horizontais =====
        [17,18],[18,19],
        [20,21],[21,22],
        [23,24],[24,25],
        // ===== Face z = +0.5 (trás): verticais =====
        [17,20],[20,23],
        [18,21],[21,24],
        [19,22],[22,25],

        // ===== Conexões frente -> meio (z=-0.5 -> z=0) =====
        [0,9],[1,10],[2,11],
        [3,12],[5,13],
        [6,14],[7,15],[8,16],

        // ===== Conexões meio -> trás (z=0 -> z=+0.5) =====
        [9,17],[10,18],[11,19],
        [12,20],[13,22],
        [14,23],[15,24],[16,25],

        // ===== Camada z=0 (meio): “moldura” (sem o centro) =====
        // linha y=-0.5
        [9,10],[10,11],
        // coluna x=-0.5
        [9,12],[12,14],
        // linha y=+0.5
        [14,15],[15,16],
        // coluna x=+0.5
        [11,13],[13,16],

        // ===== Laterais: conectando o contorno da frente ao contorno de trás (bordas principais) =====
        // quatro cantos (já teria via camadas, mas reforça o wireframe)
        [0,17],[2,19],[6,23],[8,25],

        // ===== Laterais: “meias” (arestas com ponto do meio) =====
        // baixo: (-0.5,-0.5,-0.5)->(-0.5,-0.5,0)->(-0.5,-0.5,0.5) etc
        [9,10],[10,11], // já no meio, mas ok duplicar se quiser (pode remover)
        // borda frontal inferior para trás inferior via pontos do meio
        [1,10],[10,18],
        // borda frontal superior para trás superior via pontos do meio
        [7,15],[15,24],
        // borda frontal esquerda para trás esquerda via pontos do meio
        [3,12],[12,20],
        // borda frontal direita para trás direita via pontos do meio
        [5,13],[13,22],
    ],
};

let icosa1 = {
    color: "#f55",
    angle_factor: 0.9,
    points: [
        // (0, ±1, ±φ)
        {x: 0.0,       y: 0.309017,  z: 0.5},       // 0
        {x: 0.0,       y: 0.309017,  z: -0.5},      // 1
        {x: 0.0,       y: -0.309017, z: 0.5},       // 2
        {x: 0.0,       y: -0.309017, z: -0.5},      // 3

        // (±1, ±φ, 0)
        {x: 0.309017,  y: 0.5,       z: 0.0},       // 4
        {x: 0.309017,  y: -0.5,      z: 0.0},       // 5
        {x: -0.309017, y: 0.5,       z: 0.0},       // 6
        {x: -0.309017, y: -0.5,      z: 0.0},       // 7

        // (±φ, 0, ±1)
        {x: 0.5,       y: 0.0,       z: 0.309017},  // 8
        {x: 0.5,       y: 0.0,       z: -0.309017}, // 9
        {x: -0.5,      y: 0.0,       z: 0.309017},  // 10
        {x: -0.5,      y: 0.0,       z: -0.309017}, // 11
    ],
    lines: [
        [0,2],[0,4],[0,6],[0,8],[0,10],
        [1,3],[1,4],[1,6],[1,9],[1,11],
        [2,5],[2,7],[2,8],[2,10],
        [3,5],[3,7],[3,9],[3,11],
        [4,6],[4,8],[4,9],
        [5,7],[5,8],[5,9],
        [6,10],[6,11],
        [7,10],[7,11],
        [8,9],
        [10,11],
    ],
};


const shapes = [cube1, icosa1 ];

function translate({x, y, z}, dx, dy, dz) {
    return {
        x: x + dx,
        y: y + dy,
        z: z + dz,
    }
}

function rotate_xz({x, y, z}, angle) {
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    return {
        x: x*c - z*s,
        y: y,
        z: x*s + z*c,
    }
}

let angle = 0;

function game_loop() {
    clean();
    angle += 0.01;
    for (const sh of shapes) {

        for (const l of sh.lines) {
            const a = sh.points[l[0]];
            const b = sh.points[l[1]];
            draw_line( 
                to_canvas(project(translate(rotate_xz(a, angle*sh.angle_factor), 0, 0, 2)) ),
                to_canvas(project(translate(rotate_xz(b, angle*sh.angle_factor), 0, 0, 2)) ),
                sh.color,
            );
        }
    }

    setTimeout(game_loop, 1000/TARGET_FPS);
}

setTimeout(game_loop, 1000/TARGET_FPS);