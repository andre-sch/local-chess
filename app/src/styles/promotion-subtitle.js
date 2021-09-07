window.onresize = event => {
  const subtitle = document.querySelector('#promotion .text h2')

  const bigWidth = 'CHOOSE.A.PIECE'
  const smallWidth = 'CHOOSE<br>A.PIECE'
  const MEDIA_MAX_WIDTH = 230

  if (event.target.innerWidth <= MEDIA_MAX_WIDTH) {
    subtitle.innerHTML = smallWidth
  } else {
    subtitle.innerHTML = bigWidth
  }
}