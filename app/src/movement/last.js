const LastMovement = {
  fromCoordinates: null,
  toCoordinates: null,
  set(fromCoordinates, toCoordinates) {
    this.hide()

    this.fromCoordinates = fromCoordinates
    this.toCoordinates = toCoordinates

    this.show()
  },
  show() {
    const fromSquareId = PiecesCoordinates.convertToString(this.fromCoordinates)
    const toSquareId = PiecesCoordinates.convertToString(this.toCoordinates)

    const fromSquare = document.getElementById(`square-${fromSquareId}`)
    const toSquare = document.getElementById(`square-${toSquareId}`)

    const overlay = document.createElement('div')
    overlay.className = 'overlay last-movement'

    fromSquare.appendChild(overlay.cloneNode())
    toSquare.appendChild(overlay.cloneNode())
  },
  hide() {
    const lastMovementOverlays = document.querySelectorAll('.last-movement')
    if (lastMovementOverlays.length != 0) {
      for (const lastMovementOverlay of lastMovementOverlays) {
        lastMovementOverlay.remove()
      }
    }
  },
  reset() {
    this.hide()
    this.fromCoordinates = null
    this.toCoordinates = null
  }
}