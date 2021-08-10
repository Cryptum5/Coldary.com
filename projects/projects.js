function ImageClickFunction(id) {
	window.open(id);
}
function CursorOver(state) {
	if (state == true) {
		document.body.style.cursor = "pointer";
	} else {
		document.body.style.cursor = "default";
	}
}

const snakegame = document.getElementById('snakegame');
const ctx = snakegame.getContext('2d');

let audioSource = document.getElementById('a');
let audioSource2 = document.getElementById('ab');

class SnakePart {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
}

const snakeParts = [];
let tailLength = 2;

const lines = new Image();
lines.src = '../resources/images/scanlines.png';

let speed = 7;

let render = true;

let tileCount = 20;
let tileSize = snakegame.width / tileCount - 2;

let headX = 10;
let headY = 10;

let appleX = 5;
let appleY = 5;

let xVelocity = 0;
let yVelocity = 0;

function startRender(e){
	render = true;
	alert('clicked');
}

snakegame.addEventListener('click', startRender,false);

function drawGame() {
	clearScreen();
	if(render == true){
		updateSnake();
		drawApple();
		drawSnake();
	}else{
		ctx.font = '48px serif';
		ctx.fillStyle = '#f39c12';  //<======= here
		ctx.textAlign = 'center';
		ctx.fillText('Play', snakegame.width / 2, snakegame.height / 2);
	}
	ctx.drawImage(lines,0,0,snakegame.width,snakegame.height);
	setTimeout(drawGame, 1000 / speed);
}

function drawApple() {
	ctx.fillStyle = 'red';
	ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
}

function drawSnake() {
	ctx.fillStyle = 'green';
	ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
	//body parts
	ctx.fillStyle = 'orange';
	for (let i = 0; i < snakeParts.length; i++) {
		let part = snakeParts[i];
		ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
	}

	snakeParts.push(new SnakePart(headX, headY));
	if (snakeParts.length > tailLength) {
		snakeParts.shift();
	}
}

window.addEventListener('load', effects,false);

function effects(){
	var glcanvas, texture, w, h, hw, hh, w75;
	try {
        glcanvas = fx.canvas();
		console.log("created canvas");
    } catch (e) {
		console.log("couldnt create canvas");
		return;
	}

	// This tells glfx what to use as a source image
    texture = glcanvas.texture(snakegame);
    
    // Just setting up some details to tweak the bulgePinch effect
    w = snakegame.width;
    h = snakegame.height;
    hw = w / 2;
    hh = h / 2;
    w75 = w * 0.75;

	// Hide the source 2D canvas and put the WebGL Canvas in its place
    snakegame.parentNode.insertBefore(glcanvas, snakegame);
    snakegame.style.display = 'none';
    glcanvas.className = snakegame.className;
    glcanvas.id = snakegame.id;
    snakegame.id = 'old_' + snakegame.id;

	    setInterval(function () {
        // Give the source scanlines
        ctx.drawImage(lines, 0, 0, w, h);
        
        // Load the latest source frame
        texture.loadContentsOf(snakegame);
        
        // Apply WebGL magic
        glcanvas.draw(texture)
            .bulgePinch(hw, hh, w75, 0.12)
            .vignette(0.25, 0.74)
            .update();
    }, Math.floor(1000 / 40));
}

function clearScreen() {
	ctx.fillStyle = 'black';
	ctx.fillRect(0, 0, snakegame.width, snakegame.height);

}

function updateSnake() {
	headX = headX + xVelocity;
	headY = headY + yVelocity;
	if (headX == appleX && headY == appleY) {
		appleX = Math.floor(Math.random() * tileCount);
		appleY = Math.floor(Math.random() * tileCount);
		tailLength++;
		audioSource.src = '../resources/sounds/levelup.wav';
		audioSource.volume = 0.2;
		audioSource.play();
	}
}

document.body.addEventListener('keydown', keyDown);

function keyDown(event) {
	//up
	if (event.keyCode == 87) {
		if (yVelocity != 1) {
			xVelocity = 0;
			yVelocity = -1;
		}
	}
	//down
	if (event.keyCode == 83) {
		if (yVelocity != -1) {
			xVelocity = 0;
			yVelocity = 1;
		}
	}

	//left
	if (event.keyCode == 65) {
		if (xVelocity != 1) {
			xVelocity = -1;
			yVelocity = 0;
		}
	}
	//right
	if (event.keyCode == 68) {
		if (xVelocity != -1) {
			xVelocity = 1;
			yVelocity = 0;
		}
	}
}

drawGame();