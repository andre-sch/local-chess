const PiecesCoordinates = {
  startSetup: {
    black: {
      rook: ['a8', 'h8'],
      knight: ['b8', 'g8'],
      bishop: ['c8', 'f8'],
      queen: ['d8'],
      king: 'e8',
      pawn: [
        'a7', 'b7',
        'c7', 'd7',
        'e7', 'f7',
        'g7', 'h7'
      ]
    },
    white: {
      rook: ['a1', 'h1'],
      knight: ['b1', 'g1'],
      bishop: ['c1', 'f1'],
      queen: ['d1'],
      king: 'e1',
      pawn: [
        'a2', 'b2',
        'c2', 'd2',
        'e2', 'f2',
        'g2', 'h2'
      ]
    }
  },
  current: null,
  initialize() {
    for (const teamSideKey in this.current) {
      const teamSideValue = this.current[teamSideKey]

      for (const pieceRoleKey in teamSideValue) {
        const pieceRoleValue = teamSideValue[pieceRoleKey]

        if (Array.isArray(pieceRoleValue)) {
          for (const piece of pieceRoleValue) {
            const squareId = piece
            this.setPieceInSquare(squareId)
          }
        } else {
          const squareId = pieceRoleValue
          this.setPieceInSquare(squareId)
        }
      }
    }
  },
  setPieceInSquare(squareId) {
    if (squareId == null) return 

    const coordinates = this.convertToArray(squareId)
    const teamSide = getPieceIterator(coordinates, 'teamSide')
    const role = getPieceIterator(coordinates, 'role')

    const square = document.getElementById(`square-${squareId}`)

    const squareButton = document.createElement('button')
    const squareImg = document.createElement('img')

    squareImg.src = `${staticProvider}/assets/licensed/${teamSide}/${role}.svg`
    squareImg.alt = `${teamSide} ${role}`
    squareButton.appendChild(squareImg)

    square.appendChild(squareButton)

    if (teamSide == playerOfTurn) {
      PlayerActions.set(squareButton)
    }
  },
  convertToArray(coordinates) {
    // e.g.: 'c1' -> [2, 0]
    let [coordinateX, coordinateY] = coordinates.split('')
    const XAxis = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
  
    coordinateX = XAxis.findIndex(element => element == coordinateX)
    coordinateY -= 1
  
    return [coordinateX, coordinateY]
  },
  convertToString(coordinates) {
    // e.g.: [1, 3] -> 'b4'
    let [coordinateX, coordinateY] = coordinates
    const XAxis = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
  
    coordinateX = XAxis[coordinateX]
    coordinateY += 1
  
    return coordinateX + coordinateY
  }
}