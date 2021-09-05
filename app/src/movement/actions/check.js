const Check = {
  ownKing(coordinates) {
    const teamSide = getPieceIterator(coordinates, 'teamSide')
    const oppositeTeam = teamSide == 'black' ? 'white' : 'black'

    const enemyPossibleMovements = TeamPossibleMovements[oppositeTeam]
    if (!enemyPossibleMovements) return false

    const kingSquareId = PiecesCoordinates.current[teamSide].king

    for (const enemyPossibleMovement of enemyPossibleMovements) {
      const [, enemyPossibleSquareId] = enemyPossibleMovement.split('-')

      if (enemyPossibleSquareId == kingSquareId) {
        return true
      }
    }
    return false
  },
  enemyKing(coordinates) {
    const movingPieceRole = getPieceIterator(coordinates, 'role')
    const possibleMovements = PiecePossibleMovements.get(
      coordinates,
      movingPieceRole
    )

    const movingPieceTeamSide = getPieceIterator(coordinates, 'teamSide')
    const oppositeTeam = movingPieceTeamSide == 'black' ? 'white' : 'black'

    const kingSquareId = PiecesCoordinates.current[oppositeTeam].king
    for (const possibleMovement of possibleMovements) {
      const possibleSquareId = PiecesCoordinates.convertToString(possibleMovement)
      if (possibleSquareId == kingSquareId) {
        kingInCheck = oppositeTeam
        return true
      }
    }
    return false
  },
  revertMovement(fromCoordinates, toCoordinates, type) {
    const role = getPieceIterator(toCoordinates, 'role')
    const teamSide = getPieceIterator(toCoordinates, 'teamSide')

    if (role == 'rook') {
      const index = getPieceIterator(toCoordinates, 'index')
      Castling.involvedPiecesHaveMoved[teamSide].rook[index] = false
    }
    if (role == 'king') {
      Castling.involvedPiecesHaveMoved[teamSide].king = false
      if (type == 'castling') {
        Castling.revertRookMovement()
      }
    }

    revertRealMovement(fromCoordinates, toCoordinates, type)
  },
  display(coordinates) {
    const movingPieceTeamSide = getPieceIterator(coordinates, 'teamSide')
    const oppositeTeam = movingPieceTeamSide == 'black' ? 'white' : 'black'

    document.getElementById('king-check').innerHTML =
      ` | <em>${oppositeTeam} king is in check</em>`
  },
  hide() {
    if (kingInCheck) {
      if (kingInCheck == playerOfTurn) {
        document.getElementById('king-check').innerHTML = ''
      }
    }
  }
}