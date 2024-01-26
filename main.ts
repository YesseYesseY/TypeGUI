const width = 1920; // Width of the canvas
const height = 1080; // Height of the canvas
const canvas_id = "gui"; // ID of the canvas element that will get drawn to

const gui = new Gui(width, height, canvas_id); // Creates a new gui object
var color = "#FF00FF"

setInterval(() => { // Main loop
    gui.reset_internal(); // Resets the internal canvas to white, you can also pass a color
    
    gui.text("Hello, World!", 100, 90, color); // Draws "Hello, World!" in our color
    if(gui.button(100, 100, 100, 100, color)) { // gui.button() returns true if the button is pressed, only returns true once per press
        var r = Math.floor(Math.random() * 255);
        var g = Math.floor(Math.random() * 255);
        var b = Math.floor(Math.random() * 255);
        color = `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
    }
    if (gui.is_button_pressed()) { // If you wanna keep doing something while the button is held down
        var time_pressed = gui.get_button_held_time(); // Returns the time in milliseconds that the button has been held down for
        console.log(`Button held for ${time_pressed / 1000} seconds`);
        gui.text("Button is pressed!", 100, 80, color); // Draws "Button is pressed!" in our color
    }
    gui.update_main(); // Draws the internal canvas to the main canvas
}, 1000/60); // 60 FPS