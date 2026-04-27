let gameLoop;
let isGameRunning = false;
let isGameOver = false;

const GAME_WIDTH = 600;
const GAME_HEIGHT = 600;

let car = { x: 300 - 20, y: 500, width: 40, height: 70, speed: 0, turnSpeed: 7 };
let entities = []; // Obstacles and Goodies
let frameCount = 0;
let score = 0;
const CONSTANT_SPEED = 5;

let keys = { ArrowLeft: false, ArrowRight: false };

const BASE = typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env.BASE_URL : '/';

const assets = {
    player: { img: new Image(), src: `${BASE}assets/player_cyber_car.png` },
    obstacle: { img: new Image(), src: `${BASE}assets/obstacles.png` },
    battery: { img: new Image(), src: `${BASE}assets/Battery_cell.png` },
    chip: { img: new Image(), src: `${BASE}assets/chip.png` },
    victory: { img: new Image(), src: `${BASE}assets/Victory_cargame.png` }
};

// Load images
Object.values(assets).forEach(asset => {
    asset.img.src = asset.src;
});

const bgMusic = new Audio(`${BASE}assets/music/American Patrol.mp3`);
bgMusic.loop = true;
bgMusic.volume = 0.5;

const batterySound = new Audio(`${BASE}assets/sound/BatterySound.wav`);
batterySound.volume = 0.3;
const chipSound = new Audio(`${BASE}assets/sound/Chip.wav`);
chipSound.volume = 0.3;
const victorySound = new Audio(`${BASE}assets/sound/Victory.wav`);
victorySound.volume = 0.5;

function handleKeyDown(e) {
  if (keys.hasOwnProperty(e.code)) keys[e.code] = true;
}

function handleKeyUp(e) {
  if (keys.hasOwnProperty(e.code)) keys[e.code] = false;
}

window.setGameKey = function(key, state) {
    if (keys.hasOwnProperty(key)) keys[key] = state;
}

export function startGame() {
  if (isGameRunning) return;
  const canvas = document.getElementById('gameCanvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  
  car = { x: GAME_WIDTH / 2 - 20, y: GAME_HEIGHT - 100, width: 40, height: 70, turnSpeed: 8 };
  entities = [];
  frameCount = 0;
  score = 0;
  isGameRunning = true;
  isGameOver = false;

  window.addEventListener('keydown', handleKeyDown);
  window.addEventListener('keyup', handleKeyUp);

  bgMusic.currentTime = 0;
  bgMusic.play().catch(e => console.log('Audio play failed:', e));

  requestAnimationFrame((time) => update(time, ctx));
}

export function stopGame() {
  isGameRunning = false;
  bgMusic.pause();
  window.removeEventListener('keydown', handleKeyDown);
  window.removeEventListener('keyup', handleKeyUp);
}

function update(time, ctx) {
  if (!isGameRunning) return;
  
  if (keys.ArrowLeft) car.x -= car.turnSpeed;
  if (keys.ArrowRight) car.x += car.turnSpeed;

  if (car.x < 0) car.x = 0;
  if (car.x + car.width > GAME_WIDTH) car.x = GAME_WIDTH - car.width;

  frameCount++;
  
  // Spawning logic
  if (frameCount % 40 === 0) {
      const typeRand = Math.random();
      let type, baseWidth, value;
      
      if (typeRand < 0.6) {
          type = 'obstacle';
          baseWidth = 50 + Math.random() * 30;
          value = 0;
      } else if (typeRand < 0.85) {
          type = 'battery';
          baseWidth = 35;
          value = 1;
      } else {
          type = 'chip';
          baseWidth = 45;
          value = 2;
      }

      // Calculate height based on original proportion if image is loaded
      const img = assets[type].img;
      let height;
      if (img.naturalWidth) {
          height = baseWidth * (img.naturalHeight / img.naturalWidth);
      } else {
          height = baseWidth; // fallback
      }

      entities.push({
          x: Math.random() * (GAME_WIDTH - baseWidth),
          y: -100,
          width: baseWidth,
          height: height,
          type,
          value
      });
  }

  for (let i = entities.length - 1; i >= 0; i--) {
    let en = entities[i];
    en.y += CONSTANT_SPEED;
    
    // Collision
    if (car.x < en.x + en.width &&
        car.x + car.width > en.x &&
        car.y < en.y + en.height &&
        car.y + car.height > en.y) {
      
      if (en.type === 'obstacle') {
          isGameRunning = false;
          isGameOver = true;
          bgMusic.pause();
          drawGameOver(ctx, false);
          return;
      } else {
          if (en.type === 'battery') {
              batterySound.currentTime = 0;
              batterySound.play().catch(() => {});
          } else if (en.type === 'chip') {
              chipSound.currentTime = 0;
              chipSound.play().catch(() => {});
          }

          score += en.value;
          entities.splice(i, 1);
          
          if (score >= 50) {
              isGameRunning = false;
              isGameOver = true;
              bgMusic.pause();
              victorySound.play().catch(() => {});
              drawGameOver(ctx, true);
              return;
          }
          continue;
      }
    }

    if (en.y > GAME_HEIGHT) {
      entities.splice(i, 1);
    }
  }

  draw(ctx);
  requestAnimationFrame((time) => update(time, ctx));
}

function draw(ctx) {
  ctx.fillStyle = '#111';
  ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  // Road lines
  ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
  for (let i = 0; i < GAME_HEIGHT; i += 60) {
      const yOffset = (frameCount * CONSTANT_SPEED) % 60;
      ctx.fillRect(GAME_WIDTH / 2 - 2, i + yOffset, 4, 30);
  }

  entities.forEach(en => {
    ctx.drawImage(assets[en.type].img, en.x, en.y, en.width, en.height);
  });

  ctx.drawImage(assets.player.img, car.x, car.y, car.width, car.height);

  ctx.fillStyle = 'white';
  ctx.font = 'bold 24px Inter, sans-serif';
  ctx.fillText(`Energy: ${score}/50`, 20, 40);
}

function drawGameOver(ctx, win) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    
    if (win) {
        const img = assets.victory.img;
        let vWidth = 400;
        let vHeight = 300;
        if (img.naturalWidth) {
            vHeight = vWidth * (img.naturalHeight / img.naturalWidth);
        }
        
        ctx.drawImage(img, GAME_WIDTH/2 - vWidth/2, GAME_HEIGHT/2 - vHeight/2 - 50, vWidth, vHeight);
        
        ctx.fillStyle = 'var(--yellow)';
        ctx.font = 'bold 40px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('MISSION COMPLETE!', GAME_WIDTH / 2, GAME_HEIGHT / 2 + 120);
        ctx.font = '20px Inter, sans-serif';
        ctx.fillStyle = 'white';
        ctx.fillText('Full Power Attained!', GAME_WIDTH / 2, GAME_HEIGHT / 2 + 160);
    } else {
        ctx.fillStyle = '#ff4d4d';
        ctx.font = 'bold 40px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('SYSTEM FAILURE', GAME_WIDTH / 2, GAME_HEIGHT / 2 - 20);
        ctx.font = '20px Inter, sans-serif';
        ctx.fillStyle = 'white';
        ctx.fillText(`Energy Collected: ${score}`, GAME_WIDTH / 2, GAME_HEIGHT / 2 + 30);
    }
    
    ctx.font = '18px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Tap or hit Space to Restart', GAME_WIDTH / 2, GAME_HEIGHT / 2 + 210);
    
    const restartHandler = (e) => {
        if (e.type === 'touchstart' || (e.type === 'keydown' && (e.code === 'Space' || e.code === 'Enter'))) {
            window.removeEventListener('keydown', restartHandler);
            window.removeEventListener('touchstart', restartHandler);
            startGame();
        }
    };
    window.addEventListener('keydown', restartHandler);
    document.getElementById('gameCanvas').addEventListener('touchstart', restartHandler, {once: true});
}
