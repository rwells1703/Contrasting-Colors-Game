import {PaintBlob} from "./paintBlob.js"

export function hurlBlob(scene,group,color,originx,originy,targetx,targety,maxSpeed){
	let xvec = targetx - originx;
	let yvec = targety - originy;
	let magnitude = Math.sqrt(xvec**2 + yvec**2);

	xvec = xvec/magnitude * maxSpeed;
	yvec = yvec/magnitude * maxSpeed;

	let paintBlob = new PaintBlob(scene,group,color,originx,originy,xvec,yvec);
}

export function checkPaintballCollision(obj1, obj2){

}