import { COLORS, ENEMY_MAX_HEALTH, TEXTURE_SIZE } from '../Constants.js';
import { Player } from '../entities/Player.js';
import { Enemy, MovingEnemy } from '../entities/Enemy.js';
import { Platform } from '../entities/Platform.js';
import { Fountain } from '../entities/Fountain.js';
import { Artwork } from '../entities/Artwork.js';

// Loads a 24-bit bitmap image for the level
export function loadLevelBmp(scene) {
    scene.load.text('level' + scene.levelNum, 'assets/levels/level' + scene.levelNum + '.bmp');
}

function stringToArrayBuffer(string) {
    var buffer = new ArrayBuffer(string.length);
    var bufferView = new Uint8Array(buffer);

    let i = 0;
    while (i < string.length) {
        bufferView[i] = string.charCodeAt(i);
        i += 1;
    }

    return buffer;
}   

function readLevelData(levelString) {
    let bufferArray = stringToArrayBuffer(levelString);

    let level = {}
    let datav = new DataView(bufferArray);

    level.width = datav.getUint32(18, true);
    level.height = datav.getUint32(22, true);

    let pixelStart = datav.getUint32(10, true);
    let uintArray = new Uint8Array(bufferArray, pixelStart);

    level.pixels = [];

    let c = 0;
    let i = -1;
    while (c < uintArray.length) {
        // At the start of each row, append a new row to the end
        if (c % level.width * 3 == 0) {
            level.pixels.push([]);
            i += 1;
        }

        // Add the array of 3 RGB values that represents a pixel
        level.pixels[i].push(uintArray.slice(c,c+3))
        
        c += 3;
    }

    // Prevents levels from being drawn upside down
    // This is because the bitmap is read from the bottom left corner, going left
    // However phaser draws from the top left corner, going left
    level.pixels = level.pixels.reverse();

    return level;
}

function positionToPx(position) {
	return TEXTURE_SIZE/2 + position*TEXTURE_SIZE
}

export function loadLevel(scene, levelKey) {
    let levelString = scene.cache.text.get(levelKey);
    let level = readLevelData(levelString);

    scene.add.tileSprite(0, 0, 2*level.width*TEXTURE_SIZE, 2*level.height*TEXTURE_SIZE, 'Background');

	let i = 0;
	while (i < level.height) {
		let j = 0;
		while (j < level.width) {
            // Each Hex value relates to a pixel color and its corresponding game object
            switch((level.pixels[i][j][2]<<16)|(level.pixels[i][j][1]<<8)|(level.pixels[i][j][0])) {
                // Platforms
                case(0x760c0c):scene.platformsArr.push(new Platform(scene.platforms, COLORS.RED,  positionToPx(j), positionToPx(i)));break;
                case(0x000055):scene.platformsArr.push(new Platform(scene.platforms, COLORS.BLUE,   positionToPx(j), positionToPx(i)));break;
                case(0x6f7700):scene.platformsArr.push(new Platform(scene.platforms, COLORS.YELLOW, positionToPx(j), positionToPx(i)));break;
                case(0x005500):scene.platformsArr.push(new Platform(scene.platforms, COLORS.GREEN,  positionToPx(j), positionToPx(i)));break;
                case(0x572900):scene.platformsArr.push(new Platform(scene.platforms, COLORS.ORANGE, positionToPx(j), positionToPx(i)));break;
                case(0x39005f):scene.platformsArr.push(new Platform(scene.platforms, COLORS.PURPLE, positionToPx(j), positionToPx(i)));break;
                case(0x000000):scene.platformsArr.push(new Platform(scene.platforms, COLORS.BLACK,  positionToPx(j), positionToPx(i)));break;
                
                // Enemies
                case(0xfd0000):scene.enemiesArr.push(new MovingEnemy(scene.enemies, scene.enemiesArr, COLORS.RED, ENEMY_MAX_HEALTH, positionToPx(j), positionToPx(i))); break;
                case(0x0000fd):scene.enemiesArr.push(new MovingEnemy(scene.enemies, scene.enemiesArr, COLORS.BLUE, ENEMY_MAX_HEALTH, positionToPx(j), positionToPx(i))); break;
                case(0xfdfd00):scene.enemiesArr.push(new MovingEnemy(scene.enemies, scene.enemiesArr, COLORS.YELLOW, ENEMY_MAX_HEALTH, positionToPx(j), positionToPx(i))); break;
                case(0x00fd00):scene.enemiesArr.push(new MovingEnemy(scene.enemies, scene.enemiesArr, COLORS.GREEN, ENEMY_MAX_HEALTH, positionToPx(j), positionToPx(i))); break;
                case(0xfd7700):scene.enemiesArr.push(new MovingEnemy(scene.enemies, scene.enemiesArr, COLORS.ORANGE, ENEMY_MAX_HEALTH, positionToPx(j), positionToPx(i))); break;
                case(0xfd00fd):scene.enemiesArr.push(new MovingEnemy(scene.enemies, scene.enemiesArr, COLORS.PURPLE, ENEMY_MAX_HEALTH, positionToPx(j), positionToPx(i))); break;
                case(0x7c6565):scene.enemiesArr.push(new MovingEnemy(scene.enemies, scene.enemiesArr, COLORS.WHITE, ENEMY_MAX_HEALTH, positionToPx(j), positionToPx(i))); break;
                
                // Stationary enemies
                case(0x404040):scene.enemiesArr.push(new Enemy(scene.enemies, scene.enemiesArr, COLORS.RED, ENEMY_MAX_HEALTH, positionToPx(j), positionToPx(i))); break;

                // Fountains
                case(0x6D2F38):scene.fountainsArr.push(new Fountain(scene.fountains, COLORS.RED, positionToPx(j), positionToPx(i)));break;
                case(0x2F526D):scene.fountainsArr.push(new Fountain(scene.fountains, COLORS.BLUE, positionToPx(j), positionToPx(i)));break;
                case(0x6B6739):scene.fountainsArr.push(new Fountain(scene.fountains, COLORS.YELLOW, positionToPx(j), positionToPx(i)));break;
                case(0x317533):scene.fountainsArr.push(new Fountain(scene.fountains, COLORS.GREEN, positionToPx(j), positionToPx(i)));break;
                case(0xFD5E31):scene.fountainsArr.push(new Fountain(scene.fountains, COLORS.ORANGE, positionToPx(j), positionToPx(i)));break;
                case(0x6631FD):scene.fountainsArr.push(new Fountain(scene.fountains, COLORS.PURPLE, positionToPx(j), positionToPx(i)));break;
                case(0x26363C):scene.fountainsArr.push(new Fountain(scene.fountains, COLORS.WHITE, positionToPx(j), positionToPx(i)));break;
                
                // Players
                case(0xfd46fd):scene.player = new Player(scene, COLORS.RED, positionToPx(j), positionToPx(i));break;
                case(0x3dfdfd):scene.player = new Player(scene, COLORS.BLUE, positionToPx(j), positionToPx(i));break;
                case(0xfdfd3a):scene.player = new Player(scene, COLORS.YELLOW, positionToPx(j), positionToPx(i));break;
                case(0x1e6420):scene.player = new Player(scene, COLORS.GREEN, positionToPx(j), positionToPx(i));break;
                case(0x64441e):scene.player = new Player(scene, COLORS.ORANGE, positionToPx(j), positionToPx(i));break;
                case(0x641e58):scene.player = new Player(scene, COLORS.PURPLE, positionToPx(j), positionToPx(i));break;
                case(0x41323e):scene.player = new Player(scene, COLORS.WHITE, positionToPx(j), positionToPx(i));break;

                // Artwork
                case(0x7A2C00):scene.artworksArr.push(new Artwork(scene.artworks, scene.artworksArr, positionToPx(j), positionToPx(i)));break;
            }
            
			j += 1;
		}
        
		i += 1;
    }
    
    return [level.width, level.height];
}