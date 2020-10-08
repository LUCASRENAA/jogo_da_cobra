//espaco2.jpg Imagem de <a href="https://pixabay.com/pt/users/tombud-1908037/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=2907434">Thomas Budach</a> por <a href="https://pixabay.com/pt/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=2907434">Pixabay</a>


let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let a = 0;
const velocidadeInicial = 150;

let box = 32;
let velocidadeAtual = velocidadeInicial;
let direcao = "right";

let cobrinha = [];
cobrinha[0] = {
  x: 8 * box,
  y: 8 * box
}

function geraNumeroAleatorio() {
  return Math.floor(Math.random() * 15 + 1) * box;
}

let frutinha = {
  x: geraNumeroAleatorio(),
  y: geraNumeroAleatorio()
}

function mantemLoopDaCobrinha() {
  if (cobrinha[0].x > 15 * box && direcao == "right") {
    cobrinha[0].x = 0;
  }

  if (cobrinha[0].x < 0 && direcao == "left") {
    cobrinha[0].x = 16 * box;
  }

  if (cobrinha[0].y < 0 && direcao == "up") {
    cobrinha[0].y = 16 * box;
  }

  if (cobrinha[0].y > 15 * box && direcao == "down") {
    cobrinha[0].y = 0;
  }
}

function verificaSeCobrinhaSeChoca() {
  for (i = 1; i < cobrinha.length; i++) {
    if (cobrinha[0].x === cobrinha[i].x
      && cobrinha[0].y === cobrinha[i].y) {
      clearInterval(jogo);
      alert("Game over!");
      restart = document.getElementById('restart');
      restart.style.display = 'inherit';

    }
  }
}

function criarBG() {
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, 16 * box, 16 * box);


}

function criarCobrinha() {
  for (i = 0; i < cobrinha.length; i++) {

    context.fillStyle = "#0000ff";

    context.fillRect(cobrinha[i].x, cobrinha[i].y, box, box);
  }
}

function desenharFrutinha() {
  context.fillStyle = "#000000";
  context.lineWidth = 2;
  context.strokeStyle = "#FF0000";
  context.fillRect(frutinha.x, frutinha.y, box, box);
}

function comportamentoDaCobrinha() {
  let cobrinhaPosicaoX = cobrinha[0].x;
  let cobrinhaPosicaoY = cobrinha[0].y;

  if (direcao == "right") cobrinhaPosicaoX += box;
  if (direcao == "left") cobrinhaPosicaoX -= box;
  if (direcao == "up") cobrinhaPosicaoY -= box;
  if (direcao == "down") cobrinhaPosicaoY += box;

  if (cobrinhaPosicaoX == frutinha.x && cobrinhaPosicaoY == frutinha.y) {
    frutinha.x = geraNumeroAleatorio();
    frutinha.y = geraNumeroAleatorio();
    velocidadeAtual += 10;
    console.log(velocidadeAtual);
    //aqui comer










  } else {
    cobrinha.pop();

  }

  let newHead = {
    x: cobrinhaPosicaoX,
    y: cobrinhaPosicaoY

  }
  cobrinha.unshift(newHead);
  document.querySelector("#pontuacao").innerHTML ="Pontuação: " + cobrinha.length*1000;
  document.getElementById("#body").style.backgroundColor = "blue";
  a = cobrinha.length;
  console.log(a)








}

document.addEventListener('keydown', atualizarEventoSetas);
function atualizarEventoSetas(event) {
  if (event.keyCode == 37 && direcao !== "right") direcao = "left";
  if (event.keyCode == 38 && direcao !== "down") direcao = "up";
  if (event.keyCode == 39 && direcao !== "left") direcao = "right";
  if (event.keyCode == 40 && direcao !== "up") direcao = "down";
}

function iniciarJogo() {
  verificaSeCobrinhaSeChoca();
  mantemLoopDaCobrinha();
  criarBG();
  criarCobrinha();
  desenharFrutinha();
  comportamentoDaCobrinha();
}

let jogo = setInterval(iniciarJogo, velocidadeAtual);

