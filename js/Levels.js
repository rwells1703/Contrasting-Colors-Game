import * as CON from './Constants.js';
import {Player} from './entities/Player.js'
import * as Enemies from './entities/Enemy.js'
import {Platform} from './entities/Platform.js'
import {Fountain} from './entities/Fountain.js';

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

export function loadLevel(scene, levelKey) {
    let levelString = scene.cache.text.get(levelKey);
    let level = readLevelData(levelString);
    
    // B G R colours
    let itemTypes = {
        'platform':new Uint8Array([0,0,0]),
        'player': new Uint8Array([0,253, 0]), 
        'enemy':new Uint8Array([0,0,253]),
    }

	let i = 0;
	while (i < level.height) {
		let j = 0;
		while (j < level.width) {
            // Each Hex value relates to a pixel color and its corresponding game object
            switch((level.pixels[i][j][2]<<16)|(level.pixels[i][j][1]<<8)|(level.pixels[i][j][0])) {
                // Platforms.
                case(0x760c0c):scene.platformsArr.push(new Platform(scene.platforms, CON.COLORS.RED,  positionToPx(j), positionToPx(i)));break;
                case(0x000055):scene.platformsArr.push(new Platform(scene.platforms, CON.COLORS.BLUE,   positionToPx(j), positionToPx(i)));break;
                case(0x6f7700):scene.platformsArr.push(new Platform(scene.platforms, CON.COLORS.YELLOW, positionToPx(j), positionToPx(i)));break;
                case(0x005500):scene.platformsArr.push(new Platform(scene.platforms, CON.COLORS.GREEN,  positionToPx(j), positionToPx(i)));break;
                case(0x572900):scene.platformsArr.push(new Platform(scene.platforms, CON.COLORS.ORANGE, positionToPx(j), positionToPx(i)));break;
                case(0x39005f):scene.platformsArr.push(new Platform(scene.platforms, CON.COLORS.PURPLE, positionToPx(j), positionToPx(i)));break;
                case(0x000000):scene.platformsArr.push(new Platform(scene.platforms, CON.COLORS.BLACK,  positionToPx(j), positionToPx(i)));break;
                
                // Enemies.
                case(0xfd0000):scene.enemiesArr.push(new Enemies.Enemy(scene.enemies, scene.enemiesArr, CON.COLORS.RED, CON.MAX_ENEMY_HEALTH, positionToPx(j), positionToPx(i))); break;
                case(0x0000fd):scene.enemiesArr.push(new Enemies.Enemy(scene.enemies, scene.enemiesArr, CON.COLORS.BLUE, CON.MAX_ENEMY_HEALTH, positionToPx(j), positionToPx(i))); break;
                case(0xfdfd00):scene.enemiesArr.push(new Enemies.Enemy(scene.enemies, scene.enemiesArr, CON.COLORS.YELLOW, CON.MAX_ENEMY_HEALTH, positionToPx(j), positionToPx(i))); break;
                case(0x00fd00):scene.enemiesArr.push(new Enemies.Enemy(scene.enemies, scene.enemiesArr, CON.COLORS.GREEN, CON.MAX_ENEMY_HEALTH, positionToPx(j), positionToPx(i))); break;
                case(0xfd7700):scene.enemiesArr.push(new Enemies.Enemy(scene.enemies, scene.enemiesArr, CON.COLORS.ORANGE, CON.MAX_ENEMY_HEALTH, positionToPx(j), positionToPx(i))); break;
                case(0xfd00fd):scene.enemiesArr.push(new Enemies.Enemy(scene.enemies, scene.enemiesArr, CON.COLORS.PURPLE, CON.MAX_ENEMY_HEALTH, positionToPx(j), positionToPx(i))); break;
                case(0x7c6565):scene.enemiesArr.push(new Enemies.Enemy(scene.enemies, scene.enemiesArr, CON.COLORS.WHITE, CON.MAX_ENEMY_HEALTH, positionToPx(j), positionToPx(i))); break;
                
                // Fountains.
                case(0x6D2F38):scene.fountainsArr.push(new Fountain(scene.fountains, CON.COLORS.RED, positionToPx(j), positionToPx(i)));break;
                case(0x2F526D):scene.fountainsArr.push(new Fountain(scene.fountains, CON.COLORS.BLUE, positionToPx(j), positionToPx(i)));break;
                case(0x6B6739):scene.fountainsArr.push(new Fountain(scene.fountains, CON.COLORS.YELLOW, positionToPx(j), positionToPx(i)));break;
                case(0x317533):scene.fountainsArr.push(new Fountain(scene.fountains, CON.COLORS.GREEN, positionToPx(j), positionToPx(i)));break;
                case(0xFD5E31):scene.fountainsArr.push(new Fountain(scene.fountains, CON.COLORS.ORANGE, positionToPx(j), positionToPx(i)));break;
                case(0x6631FD):scene.fountainsArr.push(new Fountain(scene.fountains, CON.COLORS.PURPLE, positionToPx(j), positionToPx(i)));break;
                case(0x26363C):scene.fountainsArr.push(new Fountain(scene.fountains, CON.COLORS.WHITE, positionToPx(j), positionToPx(i)));break;
                
                // Players.
                case(0xfd46fd):scene.player = new Player(scene, CON.COLORS.RED, positionToPx(j), positionToPx(i));break;
                case(0x3dfdfd):scene.player = new Player(scene, CON.COLORS.BLUE, positionToPx(j), positionToPx(i));break;
                case(0xfdfd3a):scene.player = new Player(scene, CON.COLORS.YELLOW, positionToPx(j), positionToPx(i));break;
                case(0x1e6420):scene.player = new Player(scene, CON.COLORS.GREEN, positionToPx(j), positionToPx(i));break;
                case(0x64441e):scene.player = new Player(scene, CON.COLORS.ORANGE, positionToPx(j), positionToPx(i));break;
                case(0x641e58):scene.player = new Player(scene, CON.COLORS.PURPLE, positionToPx(j), positionToPx(i));break;
                case(0x41323e):scene.player = new Player(scene, CON.COLORS.WHITE, positionToPx(j), positionToPx(i));break;
                
                // Bucket.
                /*case(0x756754):console.log("Bucket");break;*/
            }
			j += 1;
		}
        
		i += 1;
    }
    
    return [level.width, level.height];
}

export function positionToPx(position) {
	return CON.TEXTURE_SIZE/2 + position*CON.TEXTURE_SIZE
}
