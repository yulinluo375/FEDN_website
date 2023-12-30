const w = 30,
  h = 30

function pixel() {
  for (var i = 0; i < h; i++) {
    for (var j = 0; j < w; j++) {
      const span = document.createElement('span')
      const random = Math.random() * 1
      const randomFiexd = random.toFixed(1)
      document.getElementById('pixel').appendChild(span)

      span.style.left = j * 50 + 'px'
      span.style.top = i * 50 + 'px'
      span.style.backgroundPositionX = -j * 10 + 'px'
      span.style.backgroundPositionY = -i * 0 + 'px, center'
      span.style.animationDelay = randomFiexd + 's'
    }
  }
}
pixel()