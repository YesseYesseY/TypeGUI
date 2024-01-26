class Gui {
    internalCanvas: OffscreenCanvas;
    gui: HTMLCanvasElement;

    current_mouse_x: number;
    current_mouse_y: number;
    mouse_down: boolean;

    constructor(width: number, height: number, canvas_id: string) {
        this.gui = document.getElementById(canvas_id) as HTMLCanvasElement;
        if (this.gui == null) {
            throw new Error("No Canvas");
        }
        
        this.gui.width = width;
        this.gui.height = height;
        this.gui.addEventListener("mousemove", (event) => {
            this.current_mouse_x = event.offsetX;
            this.current_mouse_y = event.offsetY;
        });
        this.gui.addEventListener("mousedown", () => {
            this.mouse_down = true;
        })
        this.gui.addEventListener("mouseup", () => {
            this.mouse_down = false;
        })

        this.internalCanvas = new OffscreenCanvas(width, height);
    }

    get_context() {
        const ctx = this.gui.getContext("2d");
        if (ctx == null) {
            throw new Error("No Context");
        }
        return ctx;
    }
    
    get_context_internal() {
        const ctx = this.internalCanvas.getContext("2d");
        if (ctx == null) {
            throw new Error("No Internal Context");
        }
        return ctx;
    }
    
    reset_internal(color: string = "#FFFFFF") {
        const ctx = this.get_context_internal();
        ctx.fillStyle = color;
        this.rect(0, 0, this.internalCanvas.width, this.internalCanvas.height, color);
    }

    update_main() {
        this.get_context().drawImage(this.internalCanvas, 0, 0);
    }

    get_mouse_pos() {
        return {x: this.current_mouse_x, y: this.current_mouse_y}
    }

    rect(x: number, y: number, width: number, height: number, color: string) {
        const ctx = this.get_context_internal(); 
        ctx.fillStyle = color;
        ctx.fillRect(x, y, width, height);
    }

    text(str: string, x: number, y: number, color: string) {
        const ctx = this.get_context_internal(); 
        ctx.fillStyle = color;
        ctx.fillText(str, x, y);
    }

    _button_pressed: boolean;
    _button_pressed_start: number;

    button(x: number, y: number, width: number, height: number, color: string) {
        this.rect(x, y, width, height, color);
        var mouse_pos = this.get_mouse_pos();
        var is_hovered = (mouse_pos.x > x) && (mouse_pos.x < x+width) && (mouse_pos.y > y) && (mouse_pos.y < y+height);
        if (!this._button_pressed) {
            if (is_hovered && this.mouse_down) {
                this._button_pressed = true;
                this._button_pressed_start = Date.now();
                return true;
            }
        } else {
            if (!this.mouse_down) {
                this._button_pressed = false;
            }
        }

        return false;
    }

    is_button_pressed() {
        return this._button_pressed;
    }

    get_button_held_time() {
        if (this._button_pressed) {
            return Date.now() - this._button_pressed_start;
        }
        return 0;
    }
}