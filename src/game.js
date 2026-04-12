let gameLoop;
let isGameRunning = false;

const GAME_WIDTH = 600;
const GAME_HEIGHT = 600;

let car = { x: 300 - 20, y: 500, width: 40, height: 70, speed: 0, maxSpeed: 10, accel: 0.2, friction: 0.95 };
let obstacles = [];
let frameCount = 0;
let score = 0;
let speedMultiplier = 1;
let lastTime = 0;

let keys = { ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false };

const playerImg = new Image();
playerImg.src = 'src/assets/player_cyber_car.png';

const enemyImg = new Image();
enemyImg.src = 'src/assets/obstacles.png';

const bgMusic = new Audio('src/assets/music/American Patrol.mp3');
bgMusic.loop = true;
bgMusic.volume = 0.5;

function handleKeyDown(e) {
  if (keys.hasOwnProperty(e.code)) keys[e.code] = true;
}

function handleKeyUp(e) {
  if (keys.hasOwnProperty(e.code)) keys[e.code] = false;
}

// Touch control functions attached to window for inline HTML handlers
window.setGameKey = function(key, state) {
    keys[key] = state;
}

export function startGame() {
  if (isGameRunning) return;
  const canvas = document.getElementById('gameCanvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  
  // Reset state
  car = { x: GAME_WIDTH / 2 - 20, y: GAME_HEIGHT - 100, width: 40, height: 70, speed: 0, maxSpeed: 8, accel: 0.3, friction: 0.92, turnSpeed: 6 };
  obstacles = [];
  frameCount = 0;
  score = 0;
  speedMultiplier = 1;
  isGameRunning = true;

  window.addEventListener('keydown', handleKeyDown);
  window.addEventListener('keyup', handleKeyUp);

  bgMusic.currentTime = 0;
  bgMusic.play().catch(e => console.log('Audio play failed:', e));

  lastTime = performance.now();
  gameLoop = requestAnimationFrame((time) => update(time, ctx));
}

export function stopGame() {
  isGameRunning = false;
  bgMusic.pause();
  cancelAnimationFrame(gameLoop);
  window.removeEventListener('keydown', handleKeyDown);
  window.removeEventListener('keyup', handleKeyUp);
}

function update(time, ctx) {
  if (!isGameRunning) return;
  
  const deltaTime = (time - lastTime) / 1000;
  lastTime = time;

  // Car lateral movement
  if (keys.ArrowLeft) car.x -= car.turnSpeed;
  if (keys.ArrowRight) car.x += car.turnSpeed;

  // Car forward/backward (affects speed of obstacles coming down)
  if (keys.ArrowUp) {
      speedMultiplier = Math.min(speedMultiplier + car.accel, 2.5); // Max speed multiplier
  } else if (keys.ArrowDown) {
      speedMultiplier = Math.max(speedMultiplier - car.accel * 2, 0.5); // Brake
  } else {
      // Return to base speed
      if (speedMultiplier > 1) speedMultiplier -= 0.05;
      if (speedMultiplier < 1) speedMultiplier += 0.05;
  }

  // Boundaries
  if (car.x < 0) car.x = 0;
  if (car.x + car.width > GAME_WIDTH) car.x = GAME_WIDTH - car.width;

  const baseSpeed = 4 + (score / 500);

  // Spawn obstacles
  frameCount++;
  const spawnRate = Math.max(20, 60 - Math.floor(score / 100)); // Gets faster
  if (frameCount % spawnRate === 0) {
    const obWidth = 40 + Math.random() * 40;
    obstacles.push({
      x: Math.random() * (GAME_WIDTH - obWidth),
      y: -100,
      width: obWidth,
      height: 20 + Math.random() * 20,
      color: Math.random() > 0.5 ? '#ff4d4d' : '#ffa64d'
    });
  }

  // Update obstacles and score
  for (let i = obstacles.length - 1; i >= 0; i--) {
    let ob = obstacles[i];
    ob.y += baseSpeed * speedMultiplier;
    
    // Collision detection
    if (car.x < ob.x + ob.width &&
        car.x + car.width > ob.x &&
        car.y < ob.y + ob.height &&
        car.y + car.height > ob.y) {
      // Collision!
      isGameRunning = false;
      bgMusic.pause();
      drawGameOver(ctx);
      return;
    }

    if (ob.y > GAME_HEIGHT) {
      obstacles.splice(i, 1);
      score += 10;
    }
  }

  score += 1 * speedMultiplier;

  draw(ctx);
  
  if (isGameRunning) {
    gameLoop = requestAnimationFrame((time) => update(time, ctx));
  }
}

function draw(ctx) {
  // Clear and draw road
  ctx.fillStyle = '#222';
  ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  // Road markings
  ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
  for (let i = 0; i < GAME_HEIGHT; i += 40) {
      const yPos = (i + frameCount * speedMultiplier * 5) % GAME_HEIGHT;
      ctx.fillRect(GAME_WIDTH / 2 - 5, yPos, 10, 20);
  }

  // Draw obstacles
  obstacles.forEach(ob => {
    ctx.drawImage(enemyImg, ob.x, ob.y, ob.width, ob.height);
  });

  // Draw Car
  ctx.drawImage(playerImg, car.x, car.y, car.width, car.height);

  // HUD
  ctx.fillStyle = 'white';
  ctx.font = '20px Inter, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText(`Score: ${Math.floor(score)}`, 10, 30);
  ctx.fillText(`Speed: ${Math.floor(speedMultiplier * 100)}%`, 10, 60);
}

function drawGameOver(ctx) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    ctx.fillStyle = 'white';
    ctx.font = '30px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('CRASHED!', GAME_WIDTH / 2, GAME_HEIGHT / 2 - 20);
    ctx.font = '20px Inter, sans-serif';
    ctx.fillText(`Final Score: ${Math.floor(score)}`, GAME_WIDTH / 2, GAME_HEIGHT / 2 + 20);
    ctx.fillText('Tap or hit Space to Restart', GAME_WIDTH / 2, GAME_HEIGHT / 2 + 60);
    
    // Add restart listener just for game over
    const restartHandler = (e) => {
        if (e.type === 'touchstart' || (e.type === 'keydown' && e.code === 'Space')) {
            window.removeEventListener('keydown', restartHandler);
            window.removeEventListener('touchstart', restartHandler);
            startGame();
        }
    };
    window.addEventListener('keydown', restartHandler);
    // Assuming the canvas catches the touch
    document.getElementById('gameCanvas').addEventListener('touchstart', restartHandler, {once: true});
}
