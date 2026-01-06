<div align="center">
  <img src="readme/spinning.gif" width="300" />
</div>

# 3D SPINNING SHAPES – VANILLA JS

This project is a spinning shapes demo, implemented from scratch using html5 Canvas and vanilla javascript.

The goal is to study and experiment with fundamental computer graphics concepts, such as:

* 3D -> 2D projection
* coordinate systems
* geometric transformations
* spatial rotation
* data structures for shapes
* real-time rendering


The system renders multiple 3D shapes (cubes, pyramids, grids, Platonic solids, etc.) with:

* continuous rotation
* independent colors
* different rotation speeds
* simple perspective projection

All of this is rendered on a canvas centered on the screen.

---

## Implemented Concepts

### Perspective Projection

```js
function project({x, y, z}) {
    return {
        x: x / z,
        y: y / z,
    };
}
```

Transforms 3D coordinates into 2D using division by `z`.

---

### Rotation in the XZ Plane

```js
function rotate_xz({x, y, z}, angle) {
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    return {
        x: x*c - z*s,
        y: y,
        z: x*s + z*c,
    }
}
```

Simulates rotation around the Y axis.

---

### Shape System

Each shape follows a standardized format, making extensions easy:

```js
{
    color: "#ff5",
    angle_factor: 1,
    points: [{x, y, z}, ...],
    lines: [[a, b], ...]
}
```

#### Fields:

* color -> shape color
* angle_factor -> rotation speed/direction
* points -> 3D vertices
* lines -> connections between vertices (edges)

---

## Included Shapes

* Simple cube
* Inner cube (smaller scale)
* Square-based pyramid
* Subdivided cube (3×3×3)
* Icosahedron (Platonic solid)

Just add them to the array:

```js
const shapes = [cube1, icosa1];
```

---

## Loop

```js
function game_loop() {
    clean();
    angle += 0.01;

    for (const sh of shapes) {
        for (const l of sh.lines) {
            const a = sh.points[l[0]];
            const b = sh.points[l[1]];

            draw_line(
                to_canvas(project(translate(rotate_xz(a, angle*sh.angle_factor), 0, 0, 2))),
                to_canvas(project(translate(rotate_xz(b, angle*sh.angle_factor), 0, 0, 2))),
                sh.color
            );
        }
    }

    setTimeout(game_loop, 1000 / TARGET_FPS);
}
```

Responsible for:

* clearing the screen
* updating the angle
* applying transformations
* drawing all shapes

---

## How to Run

1. Clone or copy the files
2. Open `src/index.html` in any modern browser
3. Done 🎉
