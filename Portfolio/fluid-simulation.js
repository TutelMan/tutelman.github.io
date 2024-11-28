// fluid-simulation.js
import { initWebGLFluid } from '.C:\Users\owenj\Documents\GitHub\tutelman.github.io\Portfolio\script.js'; // Adjust path if needed

const canvas = document.getElementById('fluid-simulation');
const gl = canvas.getContext('webgl');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas(); // Set initial size

// Initialize the WebGL Fluid Simulation
initWebGLFluid(gl, canvas);
let isDrawing = false;

canvas.addEventListener('mousedown', () => (isDrawing = true));
canvas.addEventListener('mouseup', () => (isDrawing = false));
canvas.addEventListener('mousemove', (e) => {
    if (isDrawing) {
        // Pass interaction to the fluid simulation
        const x = e.clientX / canvas.width;
        const y = 1 - e.clientY / canvas.height;
        addFluidEffect(x, y); // Function depends on the simulation library
    }
});

// Handle touch for mobile
canvas.addEventListener('touchmove', (e) => {
    const touch = e.touches[0];
    const x = touch.clientX / canvas.width;
    const y = 1 - touch.clientY / canvas.height;
    addFluidEffect(x, y);
});
