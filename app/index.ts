"use strict";

import * as PIXI from "pixi.js";
import "pixi-live2d";
import * as path from "path";
import * as models from "./utils/models";
import ModelLoader from "./utils/modelLoader";
import { WindowDragger } from "./uiElements/windowDragger";
import XfBase from "./xunfei/xfBase"
import { ipcRenderer } from "electron";

const initSize = { width: 300, height: 400 }
const renderer = new PIXI.WebGLRenderer(initSize.width, initSize.height, { transparent: true, autoResize: true });
const element = document.getElementById('app')
const dragger = new WindowDragger(element);
element!.appendChild(renderer.view);
const stage = new PIXI.Container();

var live2dSprite: PIXI.Live2DSprite | null = null;

var resizable = false;

function createModel() {
    var model = ModelLoader.loadModel(models.blanc);

    live2dSprite = new PIXI.Live2DSprite(model!, {
        lipSyncWithSound: true,
        debugLog: false,
        modelBasePath: models.blanc.basePath,
        ignoreLayout: true
    });

    live2dSprite!.on("removed", obj => {
        var Live2DSprite = live2dSprite;
        live2dSprite!.removeAllListeners("click");
        live2dSprite!.removeAllListeners("mousemove");
        live2dSprite!.removeAllListeners("add");
        live2dSprite!.removeAllListeners("removed");
        live2dSprite!.destroy();
    })

    live2dSprite!.on("added", obj => {
        var Live2DSprite = live2dSprite;

        resizable = true;
        live2dSprite!.on('click', (event: PIXI.interaction.InteractionEvent) => {
            const point: PIXI.Point = event.data.global;
            if (live2dSprite!.hitTest('body', point.x, point.y)) {
                live2dSprite!.startRandomMotionOnce('tap_body');
            }
        });

        live2dSprite!.on('mousemove', (event: PIXI.interaction.InteractionEvent) => {
            const point: PIXI.Point = event.data.global;
            live2dSprite!.setViewPoint(point.x, point.y);
        });
    });

    stage.addChild(live2dSprite!);

    live2dSprite!.startRandomMotion('idle');
}

renderer.view.addEventListener('mousewheel', event => {
    var currentSize = { width: renderer.width, height: renderer.height }
    var scale = 1
    if (event.wheelDelta < 0) {
        scale -= 0.05;
    } else if (event.wheelDelta > 0) {
        scale += 0.05;
    }

    if (scale != 1 && resizable) {
        var newSize = { width: currentSize.width * scale, height: currentSize.height * scale }
        renderer.resize(newSize.width, newSize.height);
        live2dSprite!.resize(newSize.width, newSize.height);
        ipcRenderer.send("resize", newSize);
    }
});

createModel();

function animate() {
    requestAnimationFrame(animate);
    renderer.render(stage);
}

animate();
live2dSprite!.setLipSync(0.5);

(function () {
    var test = new XfBase(live2dSprite!.playSound.bind(live2dSprite!));
    console.log("试问，汝是吾的Master吗？")
    test.tts("试问，汝是吾的Master吗？")
    test.iatBegin();
})();