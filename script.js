const canvas = document.createElement('canvas')
canvas.height = 680
canvas.width = 1400
document.body.appendChild(canvas)
const ctx = canvas.getContext('2d')

const controls = document.createElement('section')
controls.className = 'controls'
document.body.appendChild(controls)

// why not create a slider to set the size of the paint brush ? 🤔
const slider = document.createElement('input')
slider.style.cursor = 'pointer'
slider.type = 'range'
slider.min = '1'
slider.max = '100'
slider.value = '20'
slider.title = 'Choose the size of the brush'
controls.appendChild(slider)
let paintBrushSize = 20
slider.addEventListener('change', () => {
  paintBrushSize = slider.value
})

// button to change the shape of the brush
const btnShape = document.createElement('button')
btnShape.style.cursor = 'pointer'
btnShape.title = 'To brush'
const iShape = document.createElement('i')
iShape.className = 'fas fa-brush fa-2x'
btnShape.appendChild(iShape)
// btnShape.textContent = 'square'
controls.appendChild(btnShape)
let shape = 'round'
btnShape.addEventListener('click', () => {
  if (shape === 'round') {
    // btnShape.textContent = 'round'
    iShape.className = 'fas fa-pencil-alt fa-2x'
    btnShape.title = 'To pencil'
    shape = 'square'
  } else if (shape === 'square') {
    iShape.className = 'fas fa-brush fa-2x'
    btnShape.title = 'To brush'
    // btnShape.textContent = 'square'
    shape = 'round'
  }
})

// why not create a colorpicker to set the color of brush ? 🤔
const picker = document.createElement('i')
picker.className = 'fas fa-palette fa-2x'
picker.style.cursor = 'pointer'
picker.title = 'Pick your color'
const btnColor = document.createElement('button')
const color = document.createElement('input')
color.className = 'color'
btnColor.appendChild(color)
btnColor.className = 'btnColor'
btnColor.style.cursor = 'pointer'
color.style.cursor = 'pointer'
color.type = 'color'
color.value = '#000'
controls.appendChild(picker)
controls.appendChild(btnColor)
btnColor.style.display = 'none'
let display = false
let paintBrushColor = color.value
picker.addEventListener('click', () => {
  if (!display) {
    btnColor.style.display = 'inline-block'
    display = true
  } else {
    btnColor.style.display = 'none'
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
btnDualColor.style.cursor = 'pointer'
const toggle = document.createElement('i')
toggle.className = 'fas fa-toggle-off fa-2x'
toggle.title = 'to white'
btnDualColor.appendChild(toggle)
controls.appendChild(btnDualColor)
let change = true
btnDualColor.addEventListener('click', () => {
  if (change) {
    toggle.className = 'fas fa-toggle-on fa-2x'
    toggle.title = 'to black'
    paintBrushColor = '#fff'
    ctx.fillStyle = paintBrushColor
    change = false
  } else {
    toggle.className = 'fas fa-toggle-off fa-2x'
    toggle.title = 'to white'
    paintBrushColor = '#000'
    ctx.fillStyle = paintBrushColor
    change = true
  }
})

// button to fill the canvas with color
const btnFill = document.createElement('button')
btnFill.style.cursor = 'pointer'
btnFill.title = 'To fill mode'
const i = document.createElement('i')
i.className = 'fas fa-fill fa-2x'
btnFill.appendChild(i)
// btnFill.textContent = 'Fill'
controls.appendChild(btnFill)
let fill = false
btnFill.addEventListener('click', () => {
  if (!fill) {
    i.className = 'fas fa-paint-brush fa-2x'
    btnFill.title = 'To draw mode'
    // btnFill.textContent = 'Draw'
    fill = true
  } else {
    i.className = 'fas fa-fill fa-2x'
    btnFill.title = 'To fill mode'
    // btnFill.textContent = 'Fill'
    fill = false
  }
})
if (fill) {
  canvas.style.cursor = 'pointer'
}

// Bouton gomme

const btnErase = document.createElement('button')
btnErase.style.cursor = 'pointer'
btnErase.title = 'Click to erase'
const eraser = document.createElement('i')
eraser.className = 'fas fa-eraser fa-2x'
btnErase.appendChild(eraser)
controls.appendChild(btnErase)
let erase = false
btnErase.addEventListener('click', () => {
  if(!erase) {
    erase = true
    eraser.style.color = 'red'
    paintBrushColor = '#fff'
    paintBrushSize = slider.value
    ctx.fillStyle = paintBrushColor
    drawLines = false
    ruler.className = 'fas fa-ruler fa-2x'
  } else {
    eraser.style.color = '#000'
    paintBrushColor = color.value
    ctx.fillStyle = paintBrushColor
    erase = false
  }
  console.log(erase)
})

// Mode traçage de lignes
const btnLine = document.createElement('button')
btnLine.style.cursor = 'pointer'
btnLine.title = 'Click to draw lines => click and drop to make a line appear'
const ruler = document.createElement('i')
ruler.className = 'fas fa-ruler fa-2x'
btnLine.appendChild(ruler)
// btnLine.textContent = 'T'
controls.appendChild(btnLine)
let drawLines = false

btnLine.addEventListener('click', () => {
  if (drawLines) {
    drawLines = false
    ruler.className = 'fas fa-ruler fa-2x'
    btnLine.title = 'Click to draw lines => click and drop to make a line appear'

    // btnLine.textContent = 'T'
  } else {
    drawLines = true
    ruler.className = 'fas fa-pen fa-2x'
    btnLine.title = 'Click to draw normally'

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