import { updateGround } from './ground.js'

const WORLD_WIDTH = 100
const WORLD_HEIGHT = 30

const worldElem = document.querySelector('[data-world]')

let lastTime
function update(time) {
  if (lastTime == null) {
    lastTime = time
    window.requestAnimationFrame(update)
    return
  }
  const delta = time - lastTime
  updateGround(delta)
  lastTime = time
  window.requestAnimationFrame(update)
}

window.requestAnimationFrame(update)

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