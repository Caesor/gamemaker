import Matter from 'matter-js'

// module aliases
var Engine = Matter.Engine,
    Events = Matter.Events,
    Detector = Matter.Detector,
    Render = Matter.Render,
    World = Matter.World,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    Bodies = Matter.Bodies;

// create an engine
var engine = Engine.create();

// create a renderer
var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: 800,
        height: 600,
        // showVelocity: true
    }
});

// create two boxes and a ground
for(let i = 0; i < 250; i++) {
    const boxA = Bodies.polygon(Math.random() * 800, Math.random() * 600, 8, 20);
    World.addBody(engine.world, boxA, { isStatic: true });
}

// var boxB = Bodies.polygon(450, 50, 8, 20);
var groundBottom = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });
var groundLeft = Bodies.rectangle(0, 300, 60, 800, { isStatic: true });
var groundRight = Bodies.rectangle(800, 300, 60, 800, { isStatic: true });
var groundTop = Bodies.rectangle(400, 0, 810, 60, { isStatic: true });

// add all of the bodies to the world
World.add(engine.world, [groundBottom, groundTop, groundLeft, groundRight]);

var mouse = Mouse.create(render.canvas),
mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
        stiffness: 0.2,
        render: {
            visible: false
        }
    }
});

World.add(engine.world, mouseConstraint);

    // keep the mouse in sync with rendering
    render.mouse = mouse;

var result = [];

// Engine.run(engine);
setInterval(function() {
    let start = Date.now();
    Engine.update(engine);
    // result.push(Date.now()-start);
    console.log(Date.now()-start);
}, 16.666)

// run the renderer
Render.run(render);
console.log(111)