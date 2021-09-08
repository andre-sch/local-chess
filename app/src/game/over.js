const GameOver = {
  resetGame() {
    document.getElementById('turn-display').innerHTML = 'white turn'
    document.getElementById('king-check').innerHTML = ''

    document.getElementById('black-king-still-in-check-animation').remove()
    document.getElementById('white-king-still-in-check-animation').remove()

    sessionStorage.removeItem('draggingPiece')
    playerOfTurn = 'white'
    kingInCheck = ''
    deadPieces = {
      black: [],
      white: []
    }

    CapturePiece.resetDisplay()
    Promotion.resetProps()
    Castling.resetProps()
    EnPassant.resetProps()
    LastMovement.reset()

    TeamPossibleMovements.black = null
    TeamPossibleMovements.white = null

    const pieces = document.querySelectorAll('.chess-square button')
    for (const piece of pieces) {
      piece.remove()
    }

    PiecesCoordinates.current = JSON.parse(
      JSON.stringify(PiecesCoordinates.startSetup)
    )
    PiecesCoordinates.initialize()
  }
}