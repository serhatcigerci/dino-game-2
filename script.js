import { updateGround, setupGround } from './ground.js'

const WORLD_WIDTH = 100
const WORLD_HEIGHT = 30
const SPEED_SCALE_INCREASE = 0.00001

const worldElem = document.querySelector('[data-world]')

let speedScale
let lastTime
let updateScore
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

  lastTime = time
  window.requestAnimationFrame(update)
}

function handleStart() {
  score = 0
  lastTime = null
  speedScale = 1
  setupGround()
  window.requestAnimationFrame(update)
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