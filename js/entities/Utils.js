import {PaintBlob} from "./PaintBlob.js"

export function hurlBlob(scene, group, color, originx, originy, targetx, targety, maxSpeed) {
    let xvec = targetx - originx;
    let yvec = targety - originy;
    let magnitude = Math.sqrt(xvec**2 + yvec**2);

    xvec = xvec/magnitude * maxSpeed;
    yvec = yvec/magnitude * maxSpeed;

    return new PaintBlob(scene, group, color, originx, originy, xvec, yvec);
}

export function doesColourDoDamage(c1, c2) {
    return (((c1 & c2 & 0b00111) != 0) & ((c1 & 0b11000) != (c2 & 0b11000)));
}

export function destroyEntity(entity,arr) {
    entity.destroy();
    arr.splice(arr.indexOf(entity), 1);
}

// Updates colliders berween the player and platform objects (e.g. after a color change)
export function updatePlayerPlatformColliders(scene) {
    // Delete all colliders between the player and the platform
    for (let collider of scene.playerPlatformColliders) {
        scene.physics.world.removeCollider(collider);
    }
    scene.playerPlatformColliders = [];

    // Add new colliders between the player and any platforms that are not the same color as it
    let solidPlatforms = scene.platformsArr.filter(platformObj => platformObj.color != scene.player.color);
    for (let platform of solidPlatforms) {
        scene.playerPlatformColliders.push(scene.physics.add.collider(scene.player.sprite, platform.sprite));
    }
}