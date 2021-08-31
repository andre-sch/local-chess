function hasPieceInChessSquare(coordinates) {
  const squareId = PiecesCoordinates.convertToString(coordinates)

  for (const teamSideKey in PiecesCoordinates.current) {
    const teamSideValue = PiecesCoordinates.current[teamSideKey]

    for (const pieceRoleKey in teamSideValue) {
      const pieceRoleValue = teamSideValue[pieceRoleKey]

      if (Array.isArray(pieceRoleValue)) {
        for (const piece of pieceRoleValue) {
          if (piece === squareId) {
            return [true, teamSideKey]
          }
        }
      } else {
        if (pieceRoleValue === squareId) {
          return [true, teamSideKey]
        }
      }
    }
  }
  return [false, null]
}