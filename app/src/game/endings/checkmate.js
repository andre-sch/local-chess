const Checkmate = {
  verify(attackCoordinates) { 
    const attackTeamSide = getPieceIterator(attackCoordinates, 'teamSide')
    const defenseTeamSide = attackTeamSide == 'black' ? 'white' : 'black'
    
    const defenseKingId = PiecesCoordinates.current[defenseTeamSide].king
    const defenseKingCoordinates = PiecesCoordinates.convertToArray(defenseKingId)

    const defenseKing = new King()
    const defenseKingPossibleMovements = defenseKing
      .listPossibleMovements(defenseKingCoordinates)

    for (const defenseKingPossibleMovement of defenseKingPossibleMovements) {
      const defenseKingInCheck = FakeMovement.execute(
        defenseKingCoordinates,
        defenseKingPossibleMovement
      )
      if (!defenseKingInCheck) return false
    }

    const attackPieceId = PiecesCoordinates.convertToString(attackCoordinates)
    const attackRole = getPieceIterator(attackCoordinates, 'role')
    
    TeamPossibleMovements.list(attackTeamSide)
    TeamPossibleMovements.list(defenseTeamSide)

    for (
      const defensePossibleMovement of TeamPossibleMovements[defenseTeamSide]
    ) {
      const [
        defensePieceId,
        defensePossibleSquareId
      ] = defensePossibleMovement.split('-')
      const defenseCoordinates = PiecesCoordinates.convertToArray(defensePieceId)
      const defenseRole = getPieceIterator(defenseCoordinates, 'role')

      // capture attacking piece
      if (defensePossibleSquareId == attackPieceId) {
        const defenseKingInCheck = FakeMovement.execute(
          defenseCoordinates,
          attackCoordinates
        )
        if (!defenseKingInCheck) return false
      }

      // block attacking piece
      const continuousPieces = ['bishop', 'rook', 'queen']

      if (defenseRole == 'king') continue
      if (continuousPieces.includes(attackRole)) {
        const directionCoordinates = this.getContinuousDirection(
          attackCoordinates,
          defenseKingCoordinates
        )

        for (const directionCoordinate of directionCoordinates) {
          const directionPossibleSquareId = PiecesCoordinates.convertToString(
            directionCoordinate
          )
          if (directionPossibleSquareId == defensePossibleSquareId) {
            return false
          }
        }
      }
    }

    return true
  },
  getContinuousDirection(attackCoordinates, defenseKingCoordinates) {
    const relative = [null, null]
    for (const index in relative) {
      if (attackCoordinates[index] > defenseKingCoordinates[index]) {
        relative[index] = -1
      }
      if (attackCoordinates[index] == defenseKingCoordinates[index]) {
        relative[index] = 0
      }
      if (attackCoordinates[index] < defenseKingCoordinates[index]) {
        relative[index] = 1
      }
    }

    const directionCoordinates = []
    const X_INDEX = 0
    const Y_INDEX = 1

    var [attackCoordinateX, attackCoordinateY] = attackCoordinates
    const [kingCoordinateX, kingCoordinateY] = defenseKingCoordinates

    while (true) {
      attackCoordinateX += relative[X_INDEX]
      attackCoordinateY += relative[Y_INDEX]

      if (
        attackCoordinateX == kingCoordinateX &&
        attackCoordinateY == kingCoordinateY
      ) {
        break
      } else {
        directionCoordinates.push([attackCoordinateX, attackCoordinateY])
      }
    }
    return directionCoordinates
  }
}