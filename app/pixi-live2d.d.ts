import * as PIXI from "pixi.js"
declare module "pixi.js" {
    interface Live2DSpriteOptions {
        /**
         * default true
         */
        eyeBlink?: boolean;

        /**
         * default true;
         */
        lipSyncWithSound?: boolean;

        /**
         * default false
         */
        debugLog?: boolean;

        /**
         * default false
         */
        debugMouseLog?: boolean;

        /**
         * default true
         */
        randomMotion?: boolean;

        /**
         * default idle
         */
        defaultMotionGroup?: string;

        /**
         * default 1
         */
        priorityDefault?: number;

        /**
         * default 3
         */
        priorityForce?: number;

        audioPlayer?: (filename: string, rootPath: string) => any;
    }

    class Live2DSprite extends PIXI.DisplayObject {
        constructor(modelDefine: object, options?: Live2DSpriteOptions);
        /**
         * 
         * @param cx center for scale, between 0-1.
         * @param cy center for scale, between 0-1.
         * @param scale ratio for scale.
         */
        adjustScale(cx: number, cy: number, scale: number): void;

        /**
         * 
         * @param shiftX between 0-1.
         * @param shiftY between 0-1.
         */
        adjustTranslate(shiftX: number, shiftY: number): void;

        setLipSync(value: boolean | null): void;

        setRandomExpression(): void;

        startRandomMotion(name: string, priority?: number): void;

        startRandomMotionOnce(name: string, priority?: number): void;

        stopRandomMotion(): void;

        startMotion(name: string, no: number, priority?: number): void;

        playSound(filename: string, host?: string): void;

        hitTest(id: string, x: number, y: number): boolean;

        setViewPoint(x: number, y: number);

        getParamFloat(key: string): number;

        setParamFloat(key: string, value: number, weight: number): void;

        addToParamFloat(key: string, value: number, weight: number): void;

        multParamFloat(key: string, value: number, weight: number): void
    }
}