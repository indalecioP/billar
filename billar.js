let mostrarAyuda = 0
let score = document.querySelector('#score')
let reseter = document.querySelector('#reseter')
let ayuda = document.querySelector('#ayuda')
let help = document.querySelector('#help')
let xBola = 100
let yBola = 100
let x = 350
let y = 350
let angulo = 180
let angSin = Math.sin(Math.PI / 180 * angulo) * 250
let angCos = Math.cos(Math.PI / 180 * angulo) * 250
let int;
let int2;
let tiro = 0;
let direccion = 0
function reset() {
  xBola = 100; yBola = 100; x = 350; y = 350; angulo = 180;
  angSin = Math.sin(Math.PI / 180 * angulo) * 250
  angCos = Math.cos(Math.PI / 180 * angulo) * 250
  tiro = 0
  direccion = 0
  setTimeout(() => {
    draw()
  }, 200);
}
reseter.addEventListener('click', reset)
ayuda.addEventListener('click', () => {
  mostrarAyuda == 0 ? mostrarAyuda++ : mostrarAyuda = 0
  mostrarAyuda == 0 ? help.style.display = 'none' : help.style.display = 'block'
})

canvas = document.querySelector('canvas')
ctx = canvas.getContext('2d')
function draw() {
  ctx.fillStyle = '#ddd'
  ctx.fillRect(0, 0, 400, 400)
  ctx.fillStyle = '#000'

  ctx.beginPath(); // bola fija
  ctx.fillStyle = '#f0f'
  ctx.arc(30, 30, 15, 0, 2 * Math.PI);
  ctx.fill()
  ctx.stroke();

  ctx.beginPath(); // bola 
  ctx.fillStyle = '#ff0'
  ctx.arc(xBola, yBola, 15, 0, 2 * Math.PI);
  ctx.fill()
  ctx.stroke();

  ctx.beginPath();  // bola a ser golpeado
  ctx.fillStyle = '#000'
  ctx.arc(x, y, 15, 0, 2 * Math.PI);
  ctx.fill()
  ctx.stroke();

  ctx.beginPath(); // arco interior
  ctx.arc(x, y, 8, 0, 2 * Math.PI);
  ctx.fillStyle = '#0ff'
  ctx.fill()
  ctx.stroke();

  ctx.beginPath()
  ctx.moveTo(100, 100)
  ctx.lineTo(x, y)
  ctx.stroke()

  ctx.beginPath(); // linea movil
  ctx.moveTo(x, y);
  ctx.lineTo(angSin + x, angCos + y);
  ctx.stroke()

  let dia = Math.sqrt(Math.pow(x - 100, 2) + Math.pow(y - 100, 2))
  if (dia <= 30 && tiro == 0) { tiro++; clearInterval(int); console.log(x); segBola() }
  if (y < 20) { clearInterval(int); score.textContent = 'haz errado' }
}

document.body.addEventListener('keydown', (e) => {
  if (e.key == 'ArrowLeft') {
    x--
    draw()
  }
  if (e.key == 'ArrowUp') {
    y--
    draw()
  }
  if (e.key == '.') {
    angulo++
    angSin = Math.sin(Math.PI / 180 * angulo) * 250
    angCos = Math.cos(Math.PI / 180 * angulo) * 250
    draw()
  }
  if (e.key == '-') {
    angulo--
    angSin = Math.sin(Math.PI / 180 * angulo) * 250
    angCos = Math.cos(Math.PI / 180 * angulo) * 250
    draw()
  }
  if (e.key == ',') {
    int = setInterval(() => {
      direccion % 2 == 0 ? x += 1 * angSin / 15 : x -= 1 * angSin / 15
      if (x < 15 || x > 385) { direccion++ }
      y += 1 * angCos / 15
      draw()
    }, 10);
  }
  if (e.key == 'm') { reset() }
})
function segBola() {
  int2 = setInterval(() => {
    xBola -= ((x - 100) / 30) * 10
    yBola += ((100 - y) / 30) * 10
    let dia2 = Math.sqrt(Math.pow(xBola - 30, 2) + Math.pow(yBola - 30, 2))
    if (dia2 <= 30) { clearInterval(int2); score.textContent = 'Bien hecho' }
    if (xBola <= 15 || yBola <= 15 || xBola >= 385) { clearInterval(int2); score.textContent = 'haz errado' }
    draw()
  }, 10);
}
draw()
