const canvas = document.createElement('canvas')
canvas.height = 700
canvas.width = 1400
document.body.appendChild(canvas)
const ctx = canvas.getContext('2d')

// why not create a slider to set the size of the paint brush ? 🤔
const slider = document.createElement('input')
slider.type = 'range'
slider.min = '1'
slider.max = '100'
slider.value = '20'
document.body.appendChild(slider)
let paintBrushSize = 20
slider.addEventListener('change', () => {
  paintBrushSize = slider.value
})

// button to change the shape of the brush
const btnShape = document.createElement('button')
const iShape = document.createElement('i')
iShape.className = 'fas fa-brush fa-2x'
btnShape.appendChild(iShape)
// btnShape.textContent = 'square'
document.body.appendChild(btnShape)
let shape = 'round'
btnShape.addEventListener('click', () => {
  if (shape === 'round') {
    // btnShape.textContent = 'round'
    iShape.className = 'fas fa-pencil-alt fa-2x'
    shape = 'square'
  } else if (shape === 'square') {
    iShape.className = 'fas fa-brush fa-2x'
    // btnShape.textContent = 'square'
    shape = 'round'
  }
})

// why not create a colorpicker to set the color of brush ? 🤔
const picker = document.createElement('i')
picker.className = 'fas fa-palette fa-2x'
picker.style.cursor = 'pointer'
const color = document.createElement('input')
color.type = 'color'
color.value = '#000'
document.body.appendChild(picker)
document.body.appendChild(color)
color.style.display = 'none'
let display = false
let paintBrushColor = color.value
picker.addEventListener('click', () => {
  if (!display) {
    color.style.display = 'inline-block'
    display = true
  } else {
    color.style.display = 'none'
    display = false
  }
})
color.addEventListener('input', () => {
  paintBrushColor = color.value
  console.log(paintBrushColor)
  ctx.fillStyle = paintBrushColor
})

// bouton pour régler la couleur en blanc/noir

const btnDualColor = document.createElement('button')
const toggle = document.createElement('i')
toggle.className = 'fas fa-toggle-off fa-2x'
btnDualColor.appendChild(toggle)
document.body.appendChild(btnDualColor)
let change = true
btnDualColor.addEventListener('click', () => {
  if (change) {
    toggle.className = 'fas fa-toggle-on fa-2x'
    ctx.fillStyle = '#fff'
    change = false
  } else {
    toggle.className = 'fas fa-toggle-off fa-2x'
    ctx.fillStyle = '#000'
    change = true
  }
})

// button to fill the canvas with color
const btnFill = document.createElement('button')
const i = document.createElement('i')
i.className = 'fas fa-fill fa-2x'
i.style.color = 'red'
btnFill.appendChild(i)
// btnFill.textContent = 'Fill'
document.body.appendChild(btnFill)
let fill = false
btnFill.addEventListener('click', () => {
  if (!fill) {
    i.className = 'fas fa-paint-brush fa-2x'
    // btnFill.textContent = 'Draw'
    fill = true
  } else {
    i.className = 'fas fa-fill fa-2x'
    // btnFill.textContent = 'Fill'
    fill = false
  }
})
if (fill) {
  canvas.style.cursor = 'pointer'
}

// Bouton gomme

const btnErase = document.createElement('button')
const eraser = document.createElement('i')
eraser.className = 'fas fa-eraser fa-2x'
btnErase.appendChild(eraser)
document.body.appendChild(btnErase)
let erase = false
btnErase.addEventListener('click', () => {
  if(!erase) {
    erase = true
    paintBrushColor = '#fff'
    paintBrushSize = slider.value
    ctx.fillStyle = paintBrushColor
    drawLines = false
    ruler.className = 'fas fa-ruler fa-2x'
  } else {
    paintBrushColor = color.value
    ctx.fillStyle = paintBrushColor
    erase = false
  }
  console.log(erase)
})

// Mode traçage de lignes
const btnLine = document.createElement('button')
const ruler = document.createElement('i')
ruler.className = 'fas fa-ruler fa-2x'
btnLine.appendChild(ruler)
// btnLine.textContent = 'T'
document.body.appendChild(btnLine)
let drawLines = false

btnLine.addEventListener('click', () => {
  if (drawLines) {
    drawLines = false
    ruler.className = 'fas fa-ruler fa-2x'
    // btnLine.textContent = 'T'
  } else {
    drawLines = true
    ruler.className = 'fas fa-pen fa-2x'
    // btnLine.textContent = 'D'
  }
  console.log(drawLines)

})
/*------------------------------------------------*/
let isMouseClickPressed = false

canvas.addEventListener('mousedown', (e) => {
  if (drawLines && !fill) {
    const x = e.offsetX
    const y = e.offsetY
    ctx.beginPath()
    ctx.moveTo(x, y)
  } else {
  isMouseClickPressed = true
  if (isMouseClickPressed) { // equivalent of isMouseClickPressed === true
    const x = e.offsetX
    const y = e.offsetY
    if (!fill || erase) {
      if (shape === 'square') {
        ctx.fillRect(x - paintBrushSize / 2, y - paintBrushSize / 2, paintBrushSize, paintBrushSize)
      } else if (shape === 'round') {
        ctx.beginPath()
        ctx.arc(x, y, paintBrushSize / 2, 0, Math.PI * 2)
        ctx.fill()
        ctx.closePath()
      }
    } else {
        ctx.fillRect(0, 0, canvas.width, canvas.height)
    }
  }
}
})

canvas.addEventListener('mouseup', (e) => {
  if(drawLines){
    const x = e.offsetX
    const y = e.offsetY
    ctx.lineTo(x, y)
    ctx.lineWidth = paintBrushSize
    ctx.strokeStyle = paintBrushColor
    ctx.lineCap = 'round'
    ctx.stroke()
  } else {
    isMouseClickPressed = false
  }
})

canvas.addEventListener('mousemove', e => {
  if (isMouseClickPressed) { // equivalent of isMouseClickPressed === true
    const x = e.offsetX
    const y = e.offsetY
    if (!fill || erase) {
      if (shape === 'square') {
        ctx.fillRect(x - paintBrushSize / 2, y - paintBrushSize / 2, paintBrushSize, paintBrushSize)
      } else if (shape === 'round') {
        ctx.beginPath()
        ctx.arc(x, y, paintBrushSize / 2, 0, Math.PI * 2)
        ctx.fill()
        ctx.closePath()
      }
    } else {
        ctx.fillRect(0, 0, canvas.width, canvas.height)
    }
  }
})