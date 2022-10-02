const dino = document.querySelector('.dino');
const background = document.querySelector('.background');

let isJumping = false;
let isGameOver = false;
let position = 0;

var isRunning = false;

function handleKeyUp(event) {
  let texto = document.querySelector('.texto')
  if (event.keyCode === 32 || event.keyCode === 38) {
    if (texto.textContent.slice(-1) == 'a'){
      texto.textContent = '';
    }
    if (!isJumping) {
      jump();
    }
  }
  if (!isRunning){
    isRunning = true;
    background.style.animationPlayState = "running";
  }
  createCactus();
}


function jump() {
  isJumping = true;

  let upInterval = setInterval(() => {
    if (position >= 150) {
      // Descendo
      clearInterval(upInterval);

      let downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          position -= 15;
          dino.style.bottom = position + 'px';
        }
      }, 20);
    } else {
      // Subindo
      position += 15;
      dino.style.bottom = position + 'px';
    }
  }, 20);
}

function createCactus() {
  const cactus = document.createElement('div');
  let cactusPosition = 1000;
  let randomTime = Math.random() * 6000;

  if (isGameOver || !isRunning) return;
  
  cactus.classList.add('cactus');
  background.appendChild(cactus);
  cactus.style.left = cactusPosition + 'px';

  let leftTimer = setInterval(() => {
    if (cactusPosition < -60) {
      // Saiu da tela
      clearInterval(leftTimer);
      background.removeChild(cactus);
    } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
      // Game over
      clearInterval(leftTimer);
      isGameOver = true;
      document.body.innerHTML = '<h1 class="game-over">Fim de jogo</h1>';
      document.querySelector('.game-over').setAttribute('style','font-family: myArcadeFont; position: absolute; display: flex; align-items: center; justify-content: center; width: 100%; height: 100%;');
    } else {
      cactusPosition -= 04;
      cactus.style.left = cactusPosition + 'px';
    }
  }, 20);

  setTimeout(createCactus, randomTime);
}

document.addEventListener('keydown', handleKeyUp);
