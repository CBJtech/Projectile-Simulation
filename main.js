const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const g = 9.81; // acceleration due to gravity (m/s^2)
const dt = 0.1; // time step (s)
let t = 0; // initial time
let x = 0; // initial x position
let y = canvas.height; // initial y position (bottom of the canvas)
let v = 100; // initial velocity (m/s)
let theta = Math.PI / 4; // launch angle (radians)
let vx = v * Math.cos(theta); // initial x velocity
let vy = -v * Math.sin(theta); // initial y velocity
let interval = null; // interval for simulation
let startTime = null; // start time of the simulation
let endTime = null; // end time of the simulation

// Draw rocket function
function drawRocket(x, y) {
   
    ctx.fillStyle = 'red';
    ctx.fillRect(x, y, 20, 40); 
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, 2 * Math.PI);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.closePath();
}

function update() {
    if (startTime === null) {
        startTime = Date.now();
    }
    x += vx * dt;
    y += vy * dt;
    vy += g * dt;
    t += dt;
    if (y >= canvas.height) {
        // Rocket has hit the ground, stop the simulation
        endTime = Date.now();
        clearInterval(interval);
        const elapsedTime = (endTime - startTime) / 1000;
        document.getElementById('time').textContent = 'Simulation duration: ' + elapsedTime.toFixed(2) + ' seconds';
    }
}

function startSimulation() {
    v = parseFloat(document.getElementById('velocity').value);
    theta = parseFloat(document.getElementById('angle').value) * Math.PI / 180; // Convert degrees to radians
    vx = v * Math.cos(theta);
    vy = -v * Math.sin(theta);
    x = 0;
    y = canvas.height;
    t = 0;
    startTime = null;
    endTime = null;
    clearInterval(interval);
    interval = setInterval(loop, dt * 1000);
}

function loop() {
    update();
    draw();
}