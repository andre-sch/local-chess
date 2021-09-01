const MovePiece = {
  execute(fromCoordinates, toCoordinates) {
    PiecePossibleMovements.reset()

    this.removeOldButton(fromCoordinates)
    this.updateCurrentCoordinates(fromCoordinates, toCoordinates)
    this.createNewImage(toCoordinates)
  },
  removeOldButton(coordinates) {
    const squareId = PiecesCoordinates.convertToString(coordinates)
    const chessSquare = document.getElementById(`square-${squareId}`)

    for (const child of chessSquare.children) {
      if (child.tagName == 'BUTTON') {
        child.remove()
      }
    }
  },
  updateCurrentCoordinates(fromCoordinates, toCoordinates) {
    const role = getPieceIterator(fromCoordinates, 'role')
    const teamSide = getPieceIterator(fromCoordinates, 'teamSide')

    const pieceNextCoordinates = PiecesCoordinates.convertToString(toCoordinates)
    const PieceRoleValue = PiecesCoordinates.current[teamSide][role]
  
    if (Array.isArray(PieceRoleValue)) {
      const pieceIndex = getPieceIterator(fromCoordinates, 'index')
      PiecesCoordinates.current[teamSide][role][pieceIndex] = pieceNextCoordinates
    } else {
      PiecesCoordinates.current[teamSide][role] = pieceNextCoordinates
    }
  },
  createNewImage(coordinates) {
    const squareId = PiecesCoordinates.convertToString(coordinates)
    PiecesCoordinates.setPieceInSquare(squareId)
  }
}