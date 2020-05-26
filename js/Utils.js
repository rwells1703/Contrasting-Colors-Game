import { Blob } from './entities/Blob.js'

export function hurlBlob(scene, originEntity, targetx, targety, maxSpeed) {
    let xvec = targetx - originEntity.sprite.x;
    let yvec = targety - originEntity.sprite.y;
    let magnitude = Math.sqrt(xvec**2 + yvec**2);
    
    xvec = xvec/magnitude * maxSpeed;
    yvec = yvec/magnitude * maxSpeed;

    let blob = new Blob(scene.blobs, scene.blobsArr, originEntity, xvec, yvec);
    scene.blobsArr.push(blob);

    // Add new colliders between the blob and any platforms that are not the same color as it
    let solidPlatforms = scene.platformsArr.filter(platformObj => platformObj.color != blob.color);
    for (let platform of solidPlatforms) {
        scene.blobPlatformColliders.push(scene.physics.add.collider(blob.sprite, platform.sprite, (blobSprite, platformSprite)=>{
            if (doesColourDoDamage(platform.color, blob.color)){
                blob.destroy();
            } else {
                blob.addBounce();
            }
        }));
    }
}

export function doesColourDoDamage(c1, c2) {
    return (((c1 & c2 & 0b00111) != 0) & ((c1 & 0b11000) != (c2 & 0b11000)));
}

// Updates colliders berween the player and platform objects (e.g. after a color change)
export function updatePlayerPlatformColliders(scene) {
    // Delete all colliders between the player and the platform
    for (let collider of scene.playerPlatformColliders) {
        scene.physics.world.removeCollider(collider);
    }
    scene.scene.playerPlatformColliders = [];

    // Add new colliders between the player and any platforms that are not the same color as it
    let solidPlatforms = scene.platformsArr.filter(platformObj => platformObj.color != scene.player.color);
    for (let platform of solidPlatforms) {
        scene.playerPlatformColliders.push(scene.physics.add.collider(scene.player.sprite, platform.sprite));
    }
}

export function getRandomColor() {
    return 'hsl(' + Math.floor(Math.random()*360) + ', 100%, 50%)';
}