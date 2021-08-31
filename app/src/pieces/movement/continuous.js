class ContinuousMovement {
  listPossibleMovements(targetPieceCoordinates) {
    const MIN_COORDINATE = 0
    const MAX_COORDINATE = 7
    const possibleMovements = []
    const [pieceCoordinateX, pieceCoordinateY] = targetPieceCoordinates

    for (const direction of this.movementVectors) {
      for (const vector of direction) {
        const [vectorX, vectorY] = vector
        
        const SumX = pieceCoordinateX + vectorX
        const SumY = pieceCoordinateY + vectorY

        // verify if the sum is out of chess board
        if (
          (SumX < MIN_COORDINATE || SumX > MAX_COORDINATE) ||
          (SumY < MIN_COORDINATE || SumY > MAX_COORDINATE)
        ) {
          break
        }

        const [hasPieceIn, pieceInSquareTeamSide] =
          hasPieceInChessSquare([SumX, SumY])
        const targetPieceTeamSide =
          getPieceIterator(targetPieceCoordinates, 'teamSide')

        if (hasPieceIn) {
          if (pieceInSquareTeamSide != targetPieceTeamSide) {
            possibleMovements.push([SumX, SumY])
          }
          break
        }
        possibleMovements.push([SumX, SumY])
      }
    }
    return possibleMovements
  }
}