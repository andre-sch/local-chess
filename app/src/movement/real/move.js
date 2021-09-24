const MovePiece = {
  execute(fromCoordinates, toCoordinates) {
    PiecePossibleMovements.reset()
    const role = getPieceIterator(fromCoordinates, 'role')
  
    if (role == 'king' || role == 'rook') {
      Castling.changeMoveState(fromCoordinates)
    }

    this.removeOldButton(fromCoordinates)
    this.updateCurrentCoordinates(fromCoordinates, toCoordinates)
    this.createNewImage(toCoordinates)

    if (role == 'pawn') {
      const isDoubleStep = Pawn.movedTwoSteps(fromCoordinates, toCoordinates)
      if (isDoubleStep) {
        EnPassant.set(toCoordinates)
      }
    }

    PlayerActions.switchPlayer()
  },
  getMovementType(fromCoordinates, toCoordinates) {
    const [hasPieceIn,] = hasPieceInChessSquare(toCoordinates)
    const isEnPassant = EnPassant.verify(fromCoordinates, toCoordinates)
    const isCastling = Castling.verify(fromCoordinates, toCoordinates)

    var moveType
    if (hasPieceIn) {
      moveType = 'capture'
    } else if (isEnPassant) {
      moveType = 'en passant'
    } else if (isCastling) {
      Castling.moveRook()
      moveType = 'castling'
    } else {
      moveType = 'movement'
    }
    return moveType
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