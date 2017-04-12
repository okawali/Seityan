export const haru_01 = {
    translate: { x: -0.4, y: -0.2 },
    data: {
        "type": "Live2D Model Setting",
        "name": "haru",
        "model": "assets/haru/haru_01.moc",
        "textures":
        [
            "assets/haru/haru_01.1024/texture_00.png",
            "assets/haru/haru_01.1024/texture_01.png",
            "assets/haru/haru_01.1024/texture_02.png"
        ],
        "physics": "assets/haru/haru.physics.json",
        "pose": "assets/haru/haru.pose.json",
        "expressions":
        [
            { "name": "f01", "file": "assets/haru/expressions/f01.exp.json" },
            { "name": "f02", "file": "assets/haru/expressions/f02.exp.json" },
            { "name": "f03", "file": "assets/haru/expressions/f03.exp.json" },
            { "name": "f04", "file": "assets/haru/expressions/f04.exp.json" }
        ],
        "layout":
        {
            "center_x": 0.5,
            "y": 1,
            "width": 2
        },
        "hit_areas":
        [
            { "name": "head", "id": "D_REF.HEAD" },
            { "name": "body", "id": "D_REF.BODY" }
        ],
        "motions":
        {
            "idle":
            [
                { "file": "assets/haru/motions/idle_00.mtn", "fade_in": 2000, "fade_out": 2000 },
                { "file": "assets/haru/motions/idle_01.mtn", "fade_in": 2000, "fade_out": 2000 },
                { "file": "assets/haru/motions/idle_02.mtn", "fade_in": 2000, "fade_out": 2000 }
            ],
            "tap_body":
            [
                { "file": "assets/haru/motions/tapBody_00.mtn", "sound": "assets/haru/sounds/tapBody_00.mp3" },
                { "file": "assets/haru/motions/tapBody_01.mtn", "sound": "assets/haru/sounds/tapBody_01.mp3" },
                { "file": "assets/haru/motions/tapBody_02.mtn", "sound": "assets/haru/sounds/tapBody_02.mp3" },
                { "file": "assets/haru/motions/tapBody_03.mtn" },
                { "file": "assets/haru/motions/tapBody_04.mtn" }
            ],
            "pinch_in":
            [
                { "file": "assets/haru/motions/pinchIn_00.mtn", "sound": "assets/haru/sounds/pinchIn_00.mp3" }
            ],
            "pinch_out":
            [
                { "file": "assets/haru/motions/pinchOut_00.mtn", "sound": "assets/haru/sounds/pinchOut_00.mp3" }
            ],
            "shake":
            [
                { "file": "assets/haru/motions/shake_00.mtn", "sound": "assets/haru/sounds/shake_00.mp3", "fade_in": 500 }
            ],
            "flick_head":
            [
                { "file": "assets/haru/motions/flickHead_00.mtn", "sound": "assets/haru/sounds/flickHead_00.mp3" }
            ]
        }
    }
}

export const blanc = {
    translate: { x: 0.05, y: -0.35 },
    data: {
        "version": "Sample 1.0.0",
        "model": "assets/blanc/blanc_classic.moc",
        "textures": [
            "assets/blanc/blanc_classic.1024/texture_00.png",
            "assets/blanc/blanc_classic.1024/texture_01.png",
            "assets/blanc/blanc_classic.1024/texture_02.png",
            "assets/blanc/blanc_classic.1024/texture_03.png"
        ],
        "physics": "assets/blanc/blanc_classic.physics.json",
        "layout": { "center_x": 0, "y": 1.2, "width": 2.9 },
        "hit_areas": [{ "name": "body", "id": "D_REF.PT_HEAD" }],
        "motions": {
            "idle": [
                { "file": "assets/blanc/motions/idle_00.mtn", "fade_in": 2000, "fade_out": 2000 },
                { "file": "assets/blanc/motions/idle_01.mtn", "fade_in": 2000, "fade_out": 2000 },
                { "file": "assets/blanc/motions/idle_02.mtn", "fade_in": 2000, "fade_out": 2000 }
            ],
            "tap_body": [
                { "file": "assets/blanc/motions/tapBody_00.mtn" },
                { "file": "assets/blanc/motions/tapBody_01.mtn" },
                { "file": "assets/blanc/motions/tapBody_02.mtn" },
                { "file": "assets/blanc/motions/tapBody_03.mtn" },
                { "file": "assets/blanc/motions/tapBody_04.mtn" },
                { "file": "assets/blanc/motions/tapBody_05.mtn" },
                { "file": "assets/blanc/motions/tapBody_06.mtn" },
                { "file": "assets/blanc/motions/tapBody_07.mtn" },
                { "file": "assets/blanc/motions/tapBody_08.mtn" },
                { "file": "assets/blanc/motions/tapBody_09.mtn" }
            ],
            "pinch_in": [{ "file": "assets/blanc/blank.mtn" }],
            "pinch_out": [{ "file": "assets/blanc/blank.mtn" }],
            "shake": [{ "file": "assets/blanc/blank.mtn" }],
            "flick_head": [{ "file": "assets/blanc/blank.mtn" }]
        }
    }
}