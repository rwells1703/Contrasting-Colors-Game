export const SCENES = {
    MENU_SCENE: "MenuScene",
    HELP_SCENE: "HelpScene",
    GAME_SCENE: "GameScene"
};

/* Note on COLORS. The bits are as follows: XXRBY.
 * R is to specify whether they are in the red family (so red, green or white.) Similar for B and Y.
 * XX is to specify "class" - whether it is a primary, secondary, etc. color. 00 is for primary, 01 is for secondary.
 * Colors are considered contrasting (so do damage to each other), if they both share a family (e.g both are in R (even if only 1 is in B)) and are not in the same class.
*/
export const COLORS = {
    RED:      0b00100,
    BLUE:     0b00010,
    YELLOW:   0b00001,
    GREEN:    0b01100,
    ORANGE:   0b01010,
    PURPLE:   0b01001,
    WHITE:    0b10111,
    BLACK:    0b11000
};

export const TEXTURE_SIZE = 64;

export const WINDOW_WIDTH = TEXTURE_SIZE * 16;
export const WINDOW_HEIGHT = TEXTURE_SIZE * 9;

export const DRAG_COEFFICIENT = 0.8;
export const FRICTION_COEFFICIENT = 0.3;
export const LOCOMOTIVE = 450;
export const AIR_COEFFICIENT = 0.2;

export const X_DROP_OFF = 0.1;

export const GRAVITY = 1500;
export const JUMP_VEOLCITY = -650;

export const BLOB_LAUNCH_SPEED = 1000;
export const BLOB_BOUNCE_COEFFICIENT = 0.5;
export const BLOB_TIMEOUT = 500;
export const BLOB_MAX_BOUNCES = 3;

export const PLAYER_MAX_HEALTH = 10;
export const ENEMY_MAX_HEALTH = 4;

export const TITLE_FONT = {font: "50px Impact"};
export const BUTTON_FONT = {font: "30px Impact"};

export const DEBUG = true;