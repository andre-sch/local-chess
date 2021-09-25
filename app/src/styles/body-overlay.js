const BodyOverlayInModals = {
  display(clickCallback) {
    const bodyOverlay = document.getElementById('body-overlay')

    bodyOverlay.style.display = 'block'
    bodyOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'
    bodyOverlay.style.zIndex = 4  
    bodyOverlay.onclick = () => clickCallback()
  },
  hide() {
    const bodyOverlay = document.getElementById('body-overlay')

    bodyOverlay.style.display = 'none'
    bodyOverlay.style.backgroundColor = 'transparent'
    bodyOverlay.style.zIndex = 1
    bodyOverlay.onclick = () => null
  }
}