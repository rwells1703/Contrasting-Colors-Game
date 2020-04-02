export const SCENES = {
    LOADSCENE: "LoadScene",
    MENUSCENE: "MenuScene",
    HELPSCENE: "HelpScene",
    GAMESCENE: "GameScene"
};
/* Note on COLORS. The bits are as follows: XXRBY.
 * R is to specify whether they are in the red family (so red, green or white.) Similar for B and Y.
 * XX is to specify "class" - whether it is a primary, secondary, etc. color. 00 is for primary, 01 is for secondary.
 * Colors are considered contrasting (so do damage to each other), if they both share a family (e.g both are in R (even if only 1 is in B)) and are not in the same class.
*/
export const COLORS = {
    "red":      0b00100,
    "blue":     0b00010,
    "yellow":   0b00001,
    "green":    0b01100,
    "orange":   0b01010,
    "purple":   0b01001,
    "white":    0b10111,
    "black":    0b11000
};

export const TEXTURE_SIZE = 64;

export const DRAGCOEFF = 0.8;
export const FRICTCOEFF = 0.3;
export const LOCOMOTIVE = 500;
export const AIRCOEFF = 0.2;

export const XDROPOFF = 0.1;

export const GFS = 1500;
export const JUMPVEOLCITY = -700;

export const PBLOBLAUNCH = 1000;
export const BLOBBOUNCECOEFF = 0.7;
export const BLOBTIMEOUT = 500;
export const BLOBMINSPEED = 500;
export const BLOBMINYVEL = 100;
export const MAXBLOBBOUNCES = 3;


export const MAX_PLAYER_HEALTH = 1;
export const MAX_ENEMY_HEALTH = 1;
export const MAX_BOSS_HEALTH = 15;

export const TITLE_FONT = {font: "40px Impact"};
export const BUTTON_FONT = {font: "20px Impact"};
