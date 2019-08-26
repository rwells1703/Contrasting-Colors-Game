import {PaintBlob} from "./paintBlob.js"

export function hurlBlob(scene,group,color,originx,originy,targetx,targety,maxSpeed){
	let xvec = targetx - originx;
	let yvec = targety - originy;
	let magnitude = Math.sqrt(xvec**2 + yvec**2);

	xvec = xvec/magnitude * maxSpeed;
	yvec = yvec/magnitude * maxSpeed;

	return new PaintBlob(scene,group,color,originx,originy,xvec,yvec);
}

export function doesColourDoDamage(c1,c2){
    return (((c1&c2&0b111)!=0)&((c1&0b11000)!=(c2&0b11000)));
}

export function destroyEntity(entity,arr){
	entity.destroy();
	arr.splice(arr.indexOf(entity),1);
}

