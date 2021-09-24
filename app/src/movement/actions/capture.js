const CapturePiece = {
  coordinates: null,
  role: null,
  teamSide: null,
  index: null,
  execute(capturedPieceCoordinates) {
    this.coordinates = capturedPieceCoordinates
    this.role = getPieceIterator(this.coordinates, 'role')
    this.teamSide = getPieceIterator(this.coordinates, 'teamSide')
    try {
      this.index = getPieceIterator(this.coordinates, 'index')
    } catch {
      this.index = null
    }

    MovePiece.removeOldButton(this.coordinates)
    this.deleteCoordinates()
    this.appendDeadPiece()
    this.displayTeamDeadPieces()
    this.displayTeamScore()
  },
  deleteCoordinates() {
    if (Array.isArray(
      PiecesCoordinates.current[this.teamSide][this.role]
    )) {
      const index = getPieceIterator(this.coordinates, 'index')
      PiecesCoordinates.current[this.teamSide][this.role][index] = null
    } else {
      PiecesCoordinates.current[this.teamSide][this.role] = null
    }
  },
  appendDeadPiece() {
    const roleScore = {
      pawn: 1,
      knight: 3,
      bishop: 3,
      rook: 5,
      queen: 9
    }

    deadPieces[this.teamSide].push({
      coordinates: this.coordinates,
      role: this.role,
      score: roleScore[this.role]
    })

    const roleOrder = ['pawn', 'knight', 'bishop', 'rook', 'queen']
    deadPieces[this.teamSide].sort((deadPieceA, deadPieceB) => {
      var indexA, indexB
      for (const index in roleOrder) {
        if (roleOrder[index] == deadPieceA.role) {
          indexA = index
        }
        if (roleOrder[index] == deadPieceB.role) {
          indexB = index
        }
      }
      return indexA - indexB
    })
  },
  removeLastDeadPiece() {
    const filteredDeadPieces = []
    for (const deadPiece of deadPieces[this.teamSide]) {
      if (deadPiece.coordinates != this.coordinates) {
        filteredDeadPieces.push(deadPiece)
      }
    }
    deadPieces[this.teamSide] = filteredDeadPieces
  },
  displayTeamDeadPieces() {
    const MAX_PIECES_IN_SECTION = 8
    const FIRST_SECTION = 0
    const SECOND_SECTION = 1

    const deadPieceSections =
        document.querySelectorAll(`.dead-pieces.${this.teamSide} section`)

    deadPieceSections[FIRST_SECTION].innerHTML = ''
    deadPieceSections[SECOND_SECTION].innerHTML = ''

    const sectionOrders = {
      black: [FIRST_SECTION, SECOND_SECTION],
      white: [SECOND_SECTION, FIRST_SECTION]
    }
    const teamSectionOrder = sectionOrders[this.teamSide]

    deadPieces[this.teamSide].forEach(deadPiece => {
      const deadPieceRole = deadPiece.role
      const deadPieceButton = document.createElement('button')
      const deadPieceImg = document.createElement('img')
      
      deadPieceImg.src =
        `${staticProvider}/assets/licensed/${this.teamSide}/${deadPieceRole}.svg`
      deadPieceImg.alt = `${this.teamSide} dead ${deadPieceRole}`
      deadPieceImg.draggable = false

      deadPieceButton.appendChild(deadPieceImg)

      if (
        deadPieceSections[teamSectionOrder[0]]
        .children.length < MAX_PIECES_IN_SECTION
      ) {
        deadPieceSections[teamSectionOrder[0]]
          .appendChild(deadPieceButton)
      } else {
        deadPieceSections[teamSectionOrder[1]]
          .appendChild(deadPieceButton)
      }
    })
  },
  displayTeamScore() {
    let total = 0
    deadPieces[this.teamSide].forEach(deadPiece => {
      total += deadPiece.score
    })
    
    const oppositeTeam = this.teamSide == 'black' ? 'white' : 'black'
    document.getElementById(`${oppositeTeam}-score`).innerHTML = total
  },
  resetDisplay() {
    const deadSections = document.querySelectorAll('.dead-pieces section')
    for (const deadSection of deadSections) {
      deadSection.innerHTML = ''
    }

    const scoreSpans = document.querySelectorAll('#scores span')
    for (const score of scoreSpans) {
      score.textContent = '0'
    }
  }
}