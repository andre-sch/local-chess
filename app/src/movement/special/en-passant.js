const EnPassant = {
  lastDoubleStepPawn: {
    coordinates: null,
    teamSide: null
  },
  captureCoordinates: null,
  set(coordinates) {
    const teamSide = getPieceIterator(coordinates, 'teamSide')
    const [coordinateX, coordinateY] = coordinates

    const relativeY = {
      white: -1,
      black: 1
    }

    this.lastDoubleStepPawn = {
      coordinates,
      teamSide: teamSide
    }
    this.captureCoordinates = [coordinateX, coordinateY + relativeY[teamSide]]
  },
  verify(movingFromCoordinates, movingToCoordinates) {
    const role = getPieceIterator(movingFromCoordinates, 'role')
    if (role != 'pawn') return false

    const toSquareId = PiecesCoordinates.convertToString(movingToCoordinates)
    if (this.captureCoordinates) {
      const capturedSquareId = PiecesCoordinates.convertToString(
        this.captureCoordinates
      )
      return toSquareId == capturedSquareId
    }
    return false
  },
  disableStale() {
    if (this.lastDoubleStepPawn.teamSide != playerOfTurn) {
      this.lastDoubleStepPawn = {
        coordinates: null,
        teamSide: null
      }
      this.captureCoordinates = null
    }
  },
  resetProps() {
    this.lastDoubleStepPawn = {
      coordinates: null,
      teamSide: null
    }
    this.captureCoordinates = null
  }
}