class NonContinuousMovement {
  listPossibleMovements(targetPieceCoordinates) {
    const MIN_COORDINATE = 0
    const MAX_COORDINATE = 7
    const possibleMovements = []
    const [pieceCoordinateX, pieceCoordinateY] = targetPieceCoordinates

    for (const vector of this.movementVectors) {
      const [vectorX, vectorY] = vector

      const SumX = pieceCoordinateX + vectorX
      const SumY = pieceCoordinateY + vectorY

      // verify if the sum is out of chess board
      if (
        (SumX < MIN_COORDINATE || SumX > MAX_COORDINATE) ||
        (SumY < MIN_COORDINATE || SumY > MAX_COORDINATE)
      ) {
        continue
      }

      const [hasPieceIn, pieceInSquareTeamSide] =
        hasPieceInChessSquare([SumX, SumY])
      const targetPieceTeamSide =
        getPieceIterator(targetPieceCoordinates, 'teamSide')

      if (hasPieceIn) {
        if (pieceInSquareTeamSide != targetPieceTeamSide) {
          possibleMovements.push([SumX, SumY])
        }
      } else {
        possibleMovements.push([SumX, SumY])
      }
    }
    return possibleMovements
  }
}