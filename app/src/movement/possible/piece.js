const PiecePossibleMovements = {
  show(squareId) {
    this.reset()

    const previousCoordinates = PiecesCoordinates.convertToArray(squareId)
    const targetPieceRole = getPieceIterator(previousCoordinates, 'role')
    const possibleMovements = this.get(previousCoordinates, targetPieceRole)
    
    for (const nextCoordinates of possibleMovements) {
      const squareId = PiecesCoordinates.convertToString(nextCoordinates)
      const possibleSquare = document.getElementById(`square-${squareId}`)
      this.setSquare(possibleSquare, previousCoordinates, nextCoordinates)
    }

    // avoid color mixing
    const lastMovementOverlays = document.getElementsByClassName('last-movement')
    overlayIteration:
    for (const lastMovementOverlay of lastMovementOverlays) {
      const square = lastMovementOverlay.parentElement
      for (const child of square.children) {
        if (child.className.includes('possible-movement')) {
          lastMovementOverlay.style.display = 'none'
          continue overlayIteration
        }
      }
    }

    const bodyOverlay = document.getElementById('body-overlay')
    bodyOverlay.style.display = 'block'
    bodyOverlay.onclick = () => this.reset()
  },
  setSquare(square, fromCoordinates, toCoordinates) {
    square.onclick = () => MovePiece.execute(fromCoordinates, toCoordinates)

    square.ondragenter = event => DesktopDrag.squareDragEnter(event)
    square.ondragleave = event => DesktopDrag.squareDragLeave(event)
  
    square.ondragover = event => DesktopDrag.allowDrop(event)
    square.ondrop = event => DesktopDrag.dropPiece(event)
    
    const overlay = document.createElement('div')
    overlay.className = 'overlay possible-movement'
    
    square.appendChild(overlay)
  },
  reset() {
    const previousOverlays =
      document.querySelectorAll('.overlay.possible-movement')
    
    previousOverlays.forEach(previousOverlay => {
      const previousPossibleMovement = previousOverlay.parentElement

      previousPossibleMovement.onclick = null
      previousPossibleMovement.ondragenter = null
      previousPossibleMovement.ondragleave = null
      previousPossibleMovement.ondragover = null
      previousPossibleMovement.ondrop = null

      previousPossibleMovement.removeChild(previousOverlay)
    })
    
    const lastMovementOverlays = document.getElementsByClassName('last-movement')
    for (const lastMovementOverlay of lastMovementOverlays) {
      lastMovementOverlay.style.display = 'block'
    }
    
    const bodyOverlay = document.getElementById('body-overlay')
    bodyOverlay.style.display = 'none'
    bodyOverlay.onclick = null
  },
  get(coordinates, role) {
    const roles = {
      bishop: new Bishop(),
      knight: new Knight(),
      king: new King(),
      pawn: new Pawn(),
      queen: new Queen(),
      rook: new Rook()
    }
    
    const roleInstance = roles[role]

    return roleInstance.listPossibleMovements(coordinates)
  }
}