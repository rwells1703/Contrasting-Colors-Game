import {PaintBlob} from "./paintBlob.js"

export function hurlBlob(scene,group,color,originx,originy,targetx,targety,maxSpeed,offsetCoeff){
	let xoffsetdir;
	let yoffsetdir;
	let xvec = targetx - originx;
	let yvec = targety - originy;
	let magnitude = Math.sqrt(xvec**2 + yvec**2);

	xvec = xvec/magnitude * maxSpeed;
	yvec = yvec/magnitude * maxSpeed;

	/*if(xvec>0){
		xoffsetdir = 1
	}else if(xvec<0){
		xoffsetdir = -1
	}else{
		xoffsetdir = 0
	}

	if(yvec>0){
		yoffsetdir = 1
	}else if(yvec<0){
		yoffsetdir = -1
	}else{
		yoffsetdir = 0;
	}*/



	let paintBlob = new PaintBlob(scene,group,color,originx/*+offsetCoeff*xoffsetdir*/,originy/*+offsetCoeff*yoffsetdir*/,xvec,yvec);

}

