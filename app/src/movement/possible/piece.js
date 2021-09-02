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