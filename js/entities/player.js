import * as CON from "../constants.js";
import {ColorEntity} from './colorEntity.js'

export class Player extends ColorEntity {
    constructor (scene, color, health, x, y) {
        super(color);
        this.health = health;
        this.sprite = scene.physics.add.sprite(x, y, 'player');
        this.sprite.setBounce(0.2);
        this.cursors = scene.input.keyboard.createCursorKeys();
        this.sprite.data = this;
    }

    update(){

    	let direction;
    	let velta;

    	if (this.cursors.left.isDown)
    	{
        	direction = -1;
    	}
    	else if (this.cursors.right.isDown)
    	{
        	direction = 1;
    	}
    	else
    	{
        	direction = 0
    	}

    	if (this.cursors.up.isDown && this.sprite.body.touching.down)
    	{
        	this.sprite.setVelocityY(CON.JUMPFORCE);
    	}

    	let xvel = this.sprite.body.velocity.x;

    	velta = CON.LOCOMOTIVE


    	if(!this.sprite.body.touching.down){
        	    velta = velta*CON.AIRCOEFF
    	}
    	
    	xvel = xvel + velta*direction;

    	//xvel = this.applyResistances(xvel);

    	this.sprite.setVelocityX(xvel)
    }

	applyResistances(xvel){
    let direction = 1;
    if(xvel<0){
        direction = -1
    }

    xvel = xvel - (xvel*xvel*direction*CON.DRAGCOEFF)

    if(this.sprite.body.touching.down){
        xvel = xvel - (xvel*xvel*direction*CON.FRICTCOEFF)

    }

    if(Math.abs(xvel)<CON.XDROPOFF){
        xvel = 0
    }
    return xvel;
    }
}
