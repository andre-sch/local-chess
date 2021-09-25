const TeamPossibleMovements = {
  black: null,
  white: null,
  list(teamSide) {
    let teamSidePossibleMovements = []
  
    for (const pieceRoleKey in PiecesCoordinates.current[teamSide]) {
      const pieceRoleValue = PiecesCoordinates.current[teamSide][pieceRoleKey]
  
      if (Array.isArray(pieceRoleValue)) {
        for (const piece of pieceRoleValue) {
          teamSidePossibleMovements =
            this.getPiecePossibleMovements(piece, teamSidePossibleMovements)
        }
      } else {
        teamSidePossibleMovements =
          this.getPiecePossibleMovements(pieceRoleValue, teamSidePossibleMovements)
      }
    }
    
    this[teamSide] = teamSidePossibleMovements
  },
  getPiecePossibleMovements(pieceId, teamSidePossibleMovements) {
    if (!pieceId) return teamSidePossibleMovements
  
    const coordinates = PiecesCoordinates.convertToArray(pieceId)
    
    const role = getPieceIterator(coordinates, 'role')
    const possibleMovements = PiecePossibleMovements.get(coordinates, role)
    
    if (possibleMovements.length != 0) {
      for (const possibleMovement of possibleMovements) {
        const possibleMovementId =
          PiecesCoordinates.convertToString(possibleMovement)
        teamSidePossibleMovements.push(pieceId + '-' + possibleMovementId)
      }
    }
    return teamSidePossibleMovements
  }
}