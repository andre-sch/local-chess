const FakeMovement = {
  capturedPiece: {
    teamSide: null,
    role: null,
    index: null
  },
  coordinates: {
    from: null,
    to: null
  },
  execute(fromCoordinates, toCoordinates) {
    this.coordinates.from = fromCoordinates
    this.coordinates.to = toCoordinates

    this.move(this.coordinates.from, this.coordinates.to)

    TeamPossibleMovements.list('black')
    TeamPossibleMovements.list('white')
    
    const kingInCheck = Check.ownKing(this.coordinates.to)
    
    this.revertMovement(this.coordinates.from, this.coordinates.to)

    return kingInCheck
  },
  move() {
    const [hasPieceIn,] = hasPieceInChessSquare(this.coordinates.to)
    if (hasPieceIn) {
      const toSquareTeamSide = getPieceIterator(this.coordinates.to, 'teamSide')
      const toSquareRole = getPieceIterator(this.coordinates.to, 'role')
      const toSquareIndex = getPieceIterator(this.coordinates.to, 'index')

      if (toSquareIndex) {
        PiecesCoordinates
          .current[toSquareTeamSide][toSquareRole][toSquareIndex] = null
        this.capturedPiece.index = toSquareIndex
      } else {
        PiecesCoordinates.current[toSquareTeamSide][toSquareRole] = null
      }

      this.capturedPiece.teamSide = toSquareTeamSide
      this.capturedPiece.role = toSquareRole
    } else {
      this.capturedPiece.teamSide = null
      this.capturedPiece.role = null
      this.capturedPiece.index = null
    }

    MovePiece.updateCurrentCoordinates(
      this.coordinates.from,
      this.coordinates.to
    )
  },
  revertMovement() {
    MovePiece.updateCurrentCoordinates(
      this.coordinates.to,
      this.coordinates.from
    )

    if (this.capturedPiece.teamSide) {
      if (this.capturedPiece.index) {
        PiecesCoordinates.current
          [this.capturedPiece.teamSide]
          [this.capturedPiece.role]
          [this.capturedPiece.index] =
          PiecesCoordinates.convertToString(this.coordinates.to)
      } else {
        PiecesCoordinates.current
          [this.capturedPiece.teamSide]
          [this.capturedPiece.role] =
          PiecesCoordinates.convertToString(this.coordinates.to)
      }
    }
  },
  resetProps() {
    this.capturedPiece = {
      teamSide: null,
      role: null,
      index: null
    }
  }
}