const MovePiece = {
  execute(fromCoordinates, toCoordinates) {
    PiecePossibleMovements.reset()
    const role = getPieceIterator(fromCoordinates, 'role')
  
    if (role == 'king' || role == 'rook') {
      Castling.changeMoveState(fromCoordinates)
    }

    var moveType = this.getMovementType(fromCoordinates, toCoordinates)

    this.removeOldButton(fromCoordinates)
    this.updateCurrentCoordinates(fromCoordinates, toCoordinates)
    this.createNewImage(toCoordinates)

    TeamPossibleMovements.list('black')
    TeamPossibleMovements.list('white')
    
    if (this.isCheckingYourself(fromCoordinates, toCoordinates, moveType)) return
    
    if (role == 'pawn') {
      const isDoubleStep = Pawn.movedTwoSteps(fromCoordinates, toCoordinates)
      if (isDoubleStep) {
        EnPassant.set(toCoordinates)
      }
    }

    const enemyKingInCheck = Check.enemyKing(toCoordinates)

    if (enemyKingInCheck) {
      Check.display(toCoordinates)
    }

    LastMovement.set(fromCoordinates, toCoordinates)
    PlayerActions.switchPlayer()
  },
  getMovementType(fromCoordinates, toCoordinates) {
    const [hasPieceIn,] = hasPieceInChessSquare(toCoordinates)
    const isEnPassant = EnPassant.verify(fromCoordinates, toCoordinates)
    const isCastling = Castling.verify(fromCoordinates, toCoordinates)

    var moveType
    if (hasPieceIn) {
      CapturePiece.execute(toCoordinates)
      moveType = 'capture'
    } else if (isEnPassant) {
      CapturePiece.execute(EnPassant.lastDoubleStepPawn.coordinates)
      moveType = 'en passant'
    } else if (isCastling) {
      Castling.moveRook()
      moveType = 'castling'
    } else {
      moveType = 'movement'
    }
    return moveType
  },
  isCheckingYourself(fromCoordinates, toCoordinates, moveType) {
    const teamSide = getPieceIterator(toCoordinates, 'teamSide')
    const role = getPieceIterator(toCoordinates, 'role')

    const ownKingInCheck = Check.ownKing(toCoordinates)
    if (ownKingInCheck) {
      Check.revertMovement(fromCoordinates, toCoordinates, moveType)
      if (role == 'king') {
        DeniedMovementAnimation.removeDiv(toCoordinates, teamSide)
      }
      DeniedMovementAnimation.execute(teamSide)
      return true
    }
    if (role == 'king') {
      DeniedMovementAnimation.removeDiv(fromCoordinates, teamSide)
    }
    return false
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