import {COLORS, TEXTURE_SIZE} from './constants.js'
import {Player} from './entities/player.js'

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

// Loads the positions of the platforms in the platforms array
export function loadLevel(scene, platforms, levelKey) {
    let levelString = scene.cache.text.get(levelKey);
    let level = readLevelData(levelString);
    
    // B G R colours
    let itemTypes = {
        'platform':new Uint8Array([0,0,0]),
        'player':new Uint8Array([0,0,253]),
        }

	let i = 0;
	while (i < level.height) {
		let j = 0;
		while (j < level.width) {
			if (JSON.stringify(level.pixels[i][j]) == JSON.stringify(itemTypes.platform)) {
				platforms.create(positionToPx(j), positionToPx(i), 'platform');
            } else if (JSON.stringify(level.pixels[i][j]) == JSON.stringify(itemTypes.player)) {	
                // Create the player
                scene.player = new Player(scene, COLORS.red, 10, positionToPx(j), positionToPx(i));
            }
            
			j += 1;
		}
        
		i += 1;
	}
}

export function positionToPx(position) {
	return TEXTURE_SIZE/2 + position*TEXTURE_SIZE
}