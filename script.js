// Configurações do jogo
const canvas = document.getElementById("gameCanvas");
const context = canvas.getContext("2d");
const box = 20;
let snake = [{ x: 10 * box, y: 10 * box }];
let direction = "";
let food = {
  x: Math.floor(Math.random() * 20) * box,
  y: Math.floor(Math.random() * 20) * box,
};
let score = 0;
const scoreElement = document.getElementById("score");
const timeElement = document.getElementById("time");

let startTime = Date.now();
let elapsedTime = 0;

// Função para calcular o tempo decorrido
function updateTime() {
  elapsedTime = Math.floor((Date.now() - startTime) / 1000); // Tempo em segundos
  timeElement.textContent = `Tempo: ${elapsedTime} segundos`;
}

// Função para desenhar elementos na tela
function draw() {
  context.fillStyle = "lightgreen";
  context.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < snake.length; i++) {
    context.fillStyle = "green";
    context.fillRect(snake[i].x, snake[i].y, box, box);
  }

  context.fillStyle = "red";
  context.fillRect(food.x, food.y, box, box);

  updateTime();
}

// Função para atualizar o estado do jogo
function update() {
  const snakeX = snake[0].x + (direction === "left" ? -box : direction === "right" ? box : 0);
  const snakeY = snake[0].y + (direction === "up" ? -box : direction === "down" ? box : 0);

  if (snakeX === food.x && snakeY === food.y) {
    score++;
    scoreElement.textContent = `Pontuação: ${score}`;
    food = {
      x: Math.floor(Math.random() * 20) * box,
      y: Math.floor(Math.random() * 20) * box,
    };
  } else {
    snake.pop();
  }

  const newHead = { x: snakeX, y: snakeY };
  snake.unshift(newHead);

  if (
    snakeX < 0 ||
    snakeX >= canvas.width ||
    snakeY < 0 ||
    snakeY >= canvas.height ||
    collision(newHead, snake)
  ) {
    clearInterval(game);
    gameOverMessage.style.display = "block";
  }
}

// Função para verificar colisões com o corpo da cobrinha
function collision(head, array) {
  for (let i = 1; i < array.length; i++) {
    if (head.x === array[i].x && head.y === array[i].y) {
      return true;
    }
  }
  return false;
}

// Função de loop principal
function gameLoop() {
  draw();
  update();
}

// Controle da cobrinha
document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
  const keyPressed = event.keyCode;
  if (keyPressed === 37 && direction !== "right") direction = "left";
  else if (keyPressed === 38 && direction !== "down") direction = "up";
  else if (keyPressed === 39 && direction !== "left") direction = "right";
  else if (keyPressed === 40 && direction !== "up") direction = "down";
}

// Iniciar o jogo
const game = setInterval(gameLoop, 100);
