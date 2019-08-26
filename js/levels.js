import {COLORS, TEXTURE_SIZE,MAX_PLAYER_HEALTH,MAX_BOSS_HEALTH,MAX_ENEMY_HEALTH} from './constants.js'
import {Player} from './entities/player.js'
import * as Enemies from './entities/enemy.js'
import {Platform} from './entities/platform.js'

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
            switch((level.pixels[i][j][2]<<16)|(level.pixels[i][j][1]<<8)|(level.pixels[i][j][0])){
                //Platforms.
                case(0x000000):scene.platformsArr.push(new Platform(scene.platforms, COLORS.black,  positionToPx(j), positionToPx(i)));break;
                case(0x760c0c):scene.platformsArr.push(new Platform(scene.platforms, COLORS.red,    positionToPx(j), positionToPx(i)));break;
                case(0x000055):scene.platformsArr.push(new Platform(scene.platforms, COLORS.blue,   positionToPx(j), positionToPx(i)));break;
                case(0x6f7700):scene.platformsArr.push(new Platform(scene.platforms, COLORS.yellow, positionToPx(j), positionToPx(i)));break;
                case(0x005500):scene.platformsArr.push(new Platform(scene.platforms, COLORS.green,  positionToPx(j), positionToPx(i)));break;
                case(0x572900):scene.platformsArr.push(new Platform(scene.platforms, COLORS.orange, positionToPx(j), positionToPx(i)));break;
                case(0x39005f):scene.platformsArr.push(new Platform(scene.platforms, COLORS.purple, positionToPx(j), positionToPx(i)));break;
                //Enemies.
                case(0xfd0000):scene.enemiesArr.push(new Enemies.Enemy(scene.enemies,scene.enemiesArr, COLORS.red, MAX_ENEMY_HEALTH, positionToPx(j), positionToPx(i))); break;
                case(0x0000fd):scene.enemiesArr.push(new Enemies.Enemy(scene.enemies,scene.enemiesArr, COLORS.blue, MAX_ENEMY_HEALTH, positionToPx(j), positionToPx(i))); break;
                case(0xfdfd00):scene.enemiesArr.push(new Enemies.Enemy(scene.enemies,scene.enemiesArr, COLORS.yellow, MAX_ENEMY_HEALTH, positionToPx(j), positionToPx(i))); break;
                case(0x00fd00):scene.enemiesArr.push(new Enemies.Enemy(scene.enemies,scene.enemiesArr, COLORS.green, MAX_ENEMY_HEALTH, positionToPx(j), positionToPx(i))); break;
                case(0xfd7700):scene.enemiesArr.push(new Enemies.Enemy(scene.enemies,scene.enemiesArr, COLORS.orange, MAX_ENEMY_HEALTH, positionToPx(j), positionToPx(i))); break;
                case(0xfd00fd):scene.enemiesArr.push(new Enemies.Enemy(scene.enemies,scene.enemiesArr, COLORS.purple, MAX_ENEMY_HEALTH, positionToPx(j), positionToPx(i))); break;
                case(0x7c6565):scene.enemiesArr.push(new Enemies.Enemy(scene.enemies,scene.enemiesArr, COLORS.white, MAX_ENEMY_HEALTH, positionToPx(j), positionToPx(i))); break;
                //Fountains.
                case(0x6D2F38):console.log("Fountain red.");break;
                case(0x2F526D):console.log("Fountain blue.");break;
                case(0x6B6739):console.log("Fountain yellow.");break;
                case(0x317533):console.log("Fountain green.");break;
                case(0xFD5E31):console.log("Fountain orange.");break;
                case(0x6631FD):console.log("Fountain purple.");break;
                case(0x26363C):console.log("Fountain white.");break;
                //Players.
                case(0xfd46fd):scene.player = new Player(scene, COLORS.red, MAX_PLAYER_HEALTH, positionToPx(j), positionToPx(i));break;
                case(0x3dfdfd):scene.player = new Player(scene, COLORS.blue, MAX_PLAYER_HEALTH, positionToPx(j), positionToPx(i));break;
                case(0xfdfd3a):scene.player = new Player(scene, COLORS.yellow, MAX_PLAYER_HEALTH, positionToPx(j), positionToPx(i));break;
                case(0x1e6420):scene.player = new Player(scene, COLORS.green, MAX_PLAYER_HEALTH, positionToPx(j), positionToPx(i));break;
                case(0x64441e):scene.player = new Player(scene, COLORS.orange, MAX_PLAYER_HEALTH, positionToPx(j), positionToPx(i));break;
                case(0x641e58):scene.player = new Player(scene, COLORS.purple, MAX_PLAYER_HEALTH, positionToPx(j), positionToPx(i));break;
                case(0x41323e):scene.player = new Player(scene, COLORS.white, MAX_PLAYER_HEALTH, positionToPx(j), positionToPx(i));break;
                //Bucket.
                case(0x756754):console.log("Bucket");break;
            }
			j += 1;
		}
        
		i += 1;
    }
    
    return [level.width, level.height];
}

export function positionToPx(position) {
	return TEXTURE_SIZE/2 + position*TEXTURE_SIZE
}
