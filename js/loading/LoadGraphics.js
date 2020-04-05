import { COLORS } from "../Constants.js";

export function loadImages(scene) {
    scene.load.image('HealthBar', 'assets/sprites/ui/health_bar/health_bar.png');
    scene.load.image('HealthBarOutline', 'assets/sprites/ui/health_bar/health_bar_outline.png');

    scene.load.spritesheet('Enemy', 'assets/sprites/entities/enemy.png', {frameWidth: 32, frameHeight: 64});
    scene.load.spritesheet('Fountain', 'assets/sprites/entities/fountain.png', {frameWidth: 64, frameHeight: 64});
    scene.load.spritesheet('Blob', 'assets/sprites/entities/blob.png', {frameWidth: 15, frameHeight: 15});
    scene.load.spritesheet('Platform', 'assets/sprites/entities/platform.png', {frameWidth: 64, frameHeight: 64})
    scene.load.spritesheet('Player', 'assets/sprites/entities/player.png', {frameWidth: 48, frameHeight: 64});
}

export function parseSpriteSheets(scene) {
    parseSpriteSheet(scene, 'Enemy', COLORS.WHITE, 4, 4, true);
    parseSpriteSheet(scene, 'Fountain', COLORS.WHITE, 2, 1, false);
    parseSpriteSheet(scene, 'Blob', COLORS.WHITE, 1, 1, false);
    parseSpriteSheet(scene, 'Platform', COLORS.BLACK, 1, 1, false);
    parseSpriteSheet(scene, 'Player', COLORS.WHITE, 1, 1, true);
}

function parseSpriteSheet(scene, spritesheetKey, extraColor, framesPerColor, frameRate, directional) {
    let colors = [COLORS.RED, COLORS.BLUE, COLORS.YELLOW, COLORS.GREEN, COLORS.ORANGE, COLORS.PURPLE, extraColor];
    let offset = 0;

    for (let i = 0; i < colors.length; i++) {
        if (directional) {
            var animationKeyExtensions = ["R", "L"];
        } else {
            var animationKeyExtensions = [""];
        }

        for (let animationKeyExtension of animationKeyExtensions) {    
            scene.anims.create({
                key: spritesheetKey + colors[i] + animationKeyExtension,
                frames: scene.anims.generateFrameNumbers(spritesheetKey, {start: offset, end: offset + framesPerColor - 1}),
                frameRate: frameRate,
                repeat: -1
            });

            offset += framesPerColor;
        }
    }
}