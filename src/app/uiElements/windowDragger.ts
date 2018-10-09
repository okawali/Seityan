import { remote } from "electron";

export class WindowDragger {
    private _element: HTMLElement | null;
    private _dragging!: boolean;
    private _wX: number;
    private _wY: number;
    private _boundaryWindowMouseMove: (event: MouseEvent) => void;
    private _boundaryWindowMouseUp: (event: MouseEvent) => void;


    constructor(element: HTMLElement | null) {
        this._element = element;
        this._element!.addEventListener("mousedown", this.onMouseDown.bind(this), true);
        this._boundaryWindowMouseMove = this.onWindowMouseMove.bind(this);
        this._boundaryWindowMouseUp = this.onWindowMouseUp.bind(this);
        this._dragging = false;
        this._wX = 0;
        this._wY = 0;
    }

    private onMouseDown(event: MouseEvent): void {
        this._dragging = true;
        this._wX = event.pageX;
        this._wY = event.pageY;
        window.addEventListener("mousemove", this._boundaryWindowMouseMove);
        window.addEventListener("mouseup", this._boundaryWindowMouseUp);
    }

    private onWindowMouseMove(event: MouseEvent): void {
        if (this._dragging) {
            event.stopPropagation();
            event.preventDefault();
            let xLoc = event.screenX - this._wX;
            let yLoc = event.screenY - this._wY;

            try {
                remote.BrowserWindow.getFocusedWindow()!.setPosition(xLoc, yLoc);
            } catch (err) {
                console.log(err);
            }

        }
    }

    private onWindowMouseUp(event: MouseEvent): void {
        this._dragging = false;
        window.removeEventListener("mousemove", this._boundaryWindowMouseMove);
        window.removeEventListener("mouseup", this._boundaryWindowMouseUp);
    }

    get dragging(): boolean {
        return this._dragging;
    }
}