const GameInitialization = {
  start() {
    localStorage.removeItem('savedGame')
    PiecesCoordinates.current = JSON.parse(
      JSON.stringify(PiecesCoordinates.startSetup)
    )
    this.display()
  },
  continue() {
    const data = JSON.parse(localStorage.getItem('savedGame'))

    PiecesCoordinates.current = data.pieces
    deadPieces = data.savedDeadPieces
    const teams = ['black', 'white']
    teams.forEach(team => {
      CapturePiece.teamSide = team
      CapturePiece.displayTeamDeadPieces()
      CapturePiece.displayTeamScore()
    })

    LastMovement.fromCoordinates = data.savedLastMovement.from
    LastMovement.toCoordinates = data.savedLastMovement.to
    LastMovement.show()

    Castling.involvedPiecesHaveMoved = data.castlingPiecesHaveMoved

    EnPassant.lastDoubleStepPawn = data.lastDoubleStepPawn
    EnPassant.captureCoordinates = data.enPassantCaptureCoordinates

    playerOfTurn = data.turn
    document.getElementById('turn-display').textContent = `${playerOfTurn} turn`

    if (data.check) {
      kingInCheck = data.check
      document.getElementById('king-check').innerHTML =
        ` | <em>${kingInCheck} king is in check</em>`
    }

    this.display()
  },
  display() {
    PiecesCoordinates.initialize()
    document.getElementById('initialization-modal').style.display = 'none'
    document.getElementById('game').style.display = 'flex'
  },
  showContinueButton() {
    const savedData = localStorage.getItem('savedGame')
    if (savedData) {
      document.getElementById('continue-game').style.display = 'inline-block'
    }
  }
}