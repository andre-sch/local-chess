function getPieceIterator(coordinates, desiredIterator) {
  const squareId = PiecesCoordinates.convertToString(coordinates)

  for (const teamSideKey in PiecesCoordinates.current) {
    const teamSideValue = PiecesCoordinates.current[teamSideKey]
  
    for (const pieceRoleKey in teamSideValue) {
      const pieceRoleValue = teamSideValue[pieceRoleKey]
  
      if (Array.isArray(pieceRoleValue)) {
        for (const pieceKey in pieceRoleValue) {
          const pieceValue = pieceRoleValue[pieceKey]

          if (pieceValue == squareId) {
            const pieceIterators = {
              'teamSide': teamSideKey,
              'role': pieceRoleKey,
              'index': pieceKey
            }
            return pieceIterators[desiredIterator]
          }
        }
      } else {
        if (pieceRoleValue == squareId) {
          const pieceIterators = {
            'teamSide': teamSideKey,
            'role': pieceRoleKey
          }
          return pieceIterators[desiredIterator]
        }
      }
    }
  }
  throw new Error('Target piece does not exist!')
}