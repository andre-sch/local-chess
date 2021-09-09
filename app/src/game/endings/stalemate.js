const Stalemate = {
  verify() {
    if (kingInCheck) return false

    TeamPossibleMovements.list(playerOfTurn)
    const possibleMovements = TeamPossibleMovements[playerOfTurn]

    if (possibleMovements.length == 0) {
      return true
    }

    for (const possibleMovement of possibleMovements) {
      const [pieceId, possibleSquareId] = possibleMovement.split('-')
      const pieceCoordinates = PiecesCoordinates.convertToArray(pieceId)
      const possibleCoordinates = PiecesCoordinates.convertToArray(
        possibleSquareId
      )
      
      const kingInCheck = FakeMovement.execute(
        pieceCoordinates,
        possibleCoordinates
      )
      if (!kingInCheck) return false
    }
    return true
  }
}