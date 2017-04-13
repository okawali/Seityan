export const blanc = {
    translate: { x: 0.05, y: -0.35 },
    data: {
        "version": "Sample 1.0.0",
        "model": "assets/live2d/blanc/blanc_classic.moc",
        "textures": [
            "assets/live2d/blanc/blanc_classic.1024/texture_00.png",
            "assets/live2d/blanc/blanc_classic.1024/texture_01.png",
            "assets/live2d/blanc/blanc_classic.1024/texture_02.png",
            "assets/live2d/blanc/blanc_classic.1024/texture_03.png"
        ],
        "physics": "assets/live2d/blanc/blanc_classic.physics.json",
        "layout": { "center_x": 0, "y": 1.2, "width": 2.9 },
        "hit_areas": [{ "name": "body", "id": "D_REF.PT_HEAD" }],
        "motions": {
            "idle": [
                { "file": "assets/live2d/blanc/motions/idle_00.mtn", "fade_in": 2000, "fade_out": 2000 },
                { "file": "assets/live2d/blanc/motions/idle_01.mtn", "fade_in": 2000, "fade_out": 2000 },
                { "file": "assets/live2d/blanc/motions/idle_02.mtn", "fade_in": 2000, "fade_out": 2000 }
            ],
            "tap_body": [
                { "file": "assets/live2d/blanc/motions/tapBody_00.mtn" },
                { "file": "assets/live2d/blanc/motions/tapBody_01.mtn" },
                { "file": "assets/live2d/blanc/motions/tapBody_02.mtn" },
                { "file": "assets/live2d/blanc/motions/tapBody_03.mtn" },
                { "file": "assets/live2d/blanc/motions/tapBody_04.mtn" },
                { "file": "assets/live2d/blanc/motions/tapBody_05.mtn" },
                { "file": "assets/live2d/blanc/motions/tapBody_06.mtn" },
                { "file": "assets/live2d/blanc/motions/tapBody_07.mtn" },
                { "file": "assets/live2d/blanc/motions/tapBody_08.mtn" },
                { "file": "assets/live2d/blanc/motions/tapBody_09.mtn" }
            ],
            "pinch_in": [{ "file": "assets/live2d/blanc/blank.mtn" }],
            "pinch_out": [{ "file": "assets/live2d/blanc/blank.mtn" }],
            "shake": [{ "file": "assets/live2d/blanc/blank.mtn" }],
            "flick_head": [{ "file": "assets/live2d/blanc/blank.mtn" }]
        }
    }
}