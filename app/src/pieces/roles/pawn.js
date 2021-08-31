class Pawn {
  constructor() {
    this.movementVectors = {
      white: {
        initialY: 1,
        straight: [[0, 1], [0, 2]],
        diagonal: [[-1, 1], [1, 1]]
      },
      black: {
        initialY: 6,
        straight: [[0, -1], [0, -2]],
        diagonal: [[-1, -1], [1, -1]]
      }
    }
    this.pieceCoordinates = null
    this.targetPieceProps = null
    this.MIN_COORDINATE = 0
    this.MAX_COORDINATE = 7
  }
  listPossibleMovements(targetPieceCoordinates) {
    this.pieceCoordinates = targetPieceCoordinates
    const targetPieceTeamSide = getPieceIterator(
      targetPieceCoordinates,
      'teamSide'
    )
    this.targetPieceProps = this.movementVectors[targetPieceTeamSide]

    let possibleMovements = this.continuousMovement()
    possibleMovements = this.nonContinuousMovement(possibleMovements)
    return possibleMovements
  }
  continuousMovement() {
    const [pieceCoordinateX, pieceCoordinateY] = this.pieceCoordinates
    const possibleMovements = []

    for (const vector of this.targetPieceProps.straight) {
      const [vectorX, vectorY] = vector

      const SumX = pieceCoordinateX + vectorX
      const SumY = pieceCoordinateY + vectorY

      // verify if the sum is out of chess board
      if (SumY < this.MIN_COORDINATE || SumY > this.MAX_COORDINATE) {
        break
      }

      const [hasPieceIn,] = hasPieceInChessSquare([SumX, SumY])

      if (hasPieceIn) {
        break
      }
      possibleMovements.push([SumX, SumY])

      if (pieceCoordinateY != this.targetPieceProps.initialY) {
        break
      }
    }
    return possibleMovements
  }
  nonContinuousMovement(possibleMovements) {
    const [pieceCoordinateX, pieceCoordinateY] = this.pieceCoordinates
    const targetPieceTeamSide = getPieceIterator(
      this.pieceCoordinates,
      'teamSide'
    )

    for (const vector of this.targetPieceProps.diagonal) {
      const [vectorX, vectorY] = vector

      const SumX = pieceCoordinateX + vectorX
      const SumY = pieceCoordinateY + vectorY

      // verify if the sum is out of chess board
      if (SumX < this.MIN_COORDINATE || SumX > this.MAX_COORDINATE) {
        continue
      }

      const [hasPieceIn, pieceInSquareTeamSide] =
        hasPieceInChessSquare([SumX, SumY])

      if (hasPieceIn && pieceInSquareTeamSide != targetPieceTeamSide) {
        possibleMovements.push([SumX, SumY])
      }
    }
    return possibleMovements
  }
}