const Castling = {
  involvedPiecesHaveMoved: {
    black: {
      king: false,
      rook: [false, false]
    },
    white: {
      king: false,
      rook: [false, false]
    }
  },
  rooksMove: {
    black: {
      longCastling: [[0, 7], [3, 7]],
      shortCastling: [[7, 7], [5, 7]]
    },
    white: {
      longCastling: [[0, 0], [3, 0]],
      shortCastling: [[7, 0], [5, 0]]
    }
  },
  kingNextMovement: null,
  kingTeamSide: '',
  changeMoveState(coordinates) {
    const teamSide = getPieceIterator(coordinates, 'teamSide')
    const role = getPieceIterator(coordinates, 'role')

    if (role == 'king') {
      this.involvedPiecesHaveMoved[teamSide][role] = true
    } else {
      const index = getPieceIterator(coordinates, 'index')
      this.involvedPiecesHaveMoved[teamSide][role][index] = true
    }
  },
  incrementMovement(possibleMovements, kingCoordinates) {
    const teamSide = getPieceIterator(kingCoordinates, 'teamSide')
    if (this.involvedPiecesHaveMoved[teamSide].king) return possibleMovements

    const possibleCastlingTypes = this.getPossibleTypes(teamSide)
    const castlingKingSideMovement = {
      shortCastling: 2,
      longCastling: -2,
    }
    const [kingCoordinateX, kingCoordinateY] = kingCoordinates

    for (const typeOfCastling of possibleCastlingTypes) {
      const sumX = kingCoordinateX + castlingKingSideMovement[typeOfCastling]
      possibleMovements.push([sumX, kingCoordinateY])
    }
    return possibleMovements
  },
  getPossibleTypes(teamSide) {
    const LEFT_ROOK = 0
    const RIGHT_ROOK = 1
    const possibleCastlingTypes = []
    const verifySquares = {
      black: {
        longCastling: [[3, 7], [2, 7], [1, 7]],
        shortCastling: [[5, 7], [6, 7]]
      },
      white: {
        longCastling: [[3, 0], [2, 0], [1, 0]],
        shortCastling: [[5, 0], [6, 0]]
      }
    }

    for (const typeOfCastling in verifySquares[teamSide]) {
      if (typeOfCastling == 'longCastling') {
        const longCastlingRookMoved =
          this.involvedPiecesHaveMoved[teamSide].rook[LEFT_ROOK]
        if (longCastlingRookMoved) continue
      } else {
        const shortCastlingRookMoved =
          this.involvedPiecesHaveMoved[teamSide].rook[RIGHT_ROOK]
        if (shortCastlingRookMoved) continue
      }

      const middleCastlingSquares = verifySquares[teamSide][typeOfCastling]

      for (const index in middleCastlingSquares) {
        const middleCastlingCoordinates = middleCastlingSquares[index]
        const [hasPieceIn,] = hasPieceInChessSquare(middleCastlingCoordinates)

        if (hasPieceIn) break

        verifySquares[teamSide][typeOfCastling][index] = hasPieceIn

        if (index == middleCastlingSquares.length - 1) {
          possibleCastlingTypes.push(typeOfCastling)
        }
      }
    }
    return possibleCastlingTypes
  },
  verify(movingFromCoordinates, movingToCoordinates) {
    const role = getPieceIterator(movingFromCoordinates, 'role')
    if (role != 'king') return false

    const [fromCoordinateX,] = movingFromCoordinates
    const [toCoordinateX,] = movingToCoordinates

    if (Math.abs(toCoordinateX - fromCoordinateX) == 2) {
      const teamSide = getPieceIterator(movingFromCoordinates, 'teamSide')
      this.kingTeamSide = teamSide
      this.kingNextMovement = movingToCoordinates

      return true
    }
    return false
  },
  moveRook() {
    const [fromCoordinates, toCoordinates] = this.getRookMovement()

    MovePiece.removeOldButton(fromCoordinates)
    MovePiece.updateCurrentCoordinates(fromCoordinates, toCoordinates)
    MovePiece.createNewImage(toCoordinates)
  },
  revertRookMovement() {
    const [fromCoordinates, toCoordinates] = this.getRookMovement()

    MovePiece.removeOldButton(toCoordinates)
    MovePiece.updateCurrentCoordinates(toCoordinates, fromCoordinates)
    MovePiece.createNewImage(fromCoordinates)

    const rookIndex = getPieceIterator(fromCoordinates, 'index')
    this.involvedPiecesHaveMoved[this.kingTeamSide][rookIndex] = false
  },
  getRookMovement() {
    const KING_DOUBLE_STEP_LEFT = 2
    const [kingNextCoordinateX,] = this.kingNextMovement

    var castlingType
    if (kingNextCoordinateX == KING_DOUBLE_STEP_LEFT) {
      castlingType = 'longCastling'
    } else {
      castlingType = 'shortCastling'
    }

    return this.rooksMove[this.kingTeamSide][castlingType]
  },
  resetProps() {
    this.involvedPiecesHaveMoved = {
      black: {
        king: false,
        rook: [false, false]
      },
      white: {
        king: false,
        rook: [false, false]
      }
    }
    this.kingNextMovement = null
    this.kingTeamSide = ''
  }
}