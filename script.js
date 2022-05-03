import { updateGround, setupGround } from './ground.js'
import { updateDino, setupDino, getDinoRect, setDinoLose } from './dino.js'
import { updateCactus, setupCactus, getCactusRects } from './cactus.js'

const WORLD_WIDTH = 100
const WORLD_HEIGHT = 30
const SPEED_SCALE_INCREASE = 0.00001

const worldElem = document.querySelector('[data-world]')
const scoreElem = document.querySelector('[data-score]')
const startScreenElem = document.querySelector('[data-start-screen]')

let speedScale
let lastTime
let score

function update(time) {
  if (lastTime == null) {
    lastTime = time
    window.requestAnimationFrame(update)
    return
  }
  const delta = time - lastTime
  updateGround(delta, speedScale)

  updateSpeedScale(delta)

  updateScore(delta)

  updateDino(delta, speedScale)

  updateCactus(delta, speedScale)

  if (checkLose()) return handleLose()

  lastTime = time
  window.requestAnimationFrame(update)
}

function checkLose() {
  const dinoRect = getDinoRect()
  return getCactusRects().some(rect => isCollision(rect, dinoRect))
}

function isCollision(rect1, rect2) {
  return (rect1.left < rect2.right && rect1.top < rect2.bottom && 
  rect1.left > rect2.left && rect1.bottom > rect2.top)
}

function handleStart() {
  score = 0
  lastTime = null
  speedScale = 1
  startScreenElem.classList.add("hide")
  window.requestAnimationFrame(update)
  setupGround()
  setupDino()
  setupCactus()
}

function handleLose() {
  setDinoLose()
  setTimeout(() => {
    document.addEventListener('keydown', handleStart, { once: true})
    startScreenElem.classList.remove('hide')
  }, 100)
}

function updateScore(delta) {
  score += delta * 0.01
  scoreElem.textContent = Math.floor(score)
}

function updateSpeedScale(delta) {
  speedScale += delta * SPEED_SCALE_INCREASE
}

function pixelWorldScale() {
  let worldScale
  if (window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT) 
  {
    worldScale = window.innerWidth / WORLD_WIDTH
  } else {
    worldScale = window.innerHeight / WORLD_HEIGHT
  }

  worldElem.style.width = `${WORLD_WIDTH * worldScale}px`
  worldElem.style.height = `${WORLD_HEIGHT * worldScale}px`
}

pixelWorldScale()
window.addEventListener('resize', pixelWorldScale)
document.addEventListener('keydown', handleStart, { once: true })