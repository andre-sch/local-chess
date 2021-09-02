const PlayerActions = {
  set(squareButton) {
    squareButton.classList.add('player-of-turn')

    const chessSquare = squareButton.parentNode
    const [,squareId] = chessSquare.id.split('-')
    
    squareButton.onclick = () => PiecePossibleMovements.show(squareId)
  },
  remove(squareButton) {
    squareButton.classList.remove('player-of-turn')
    squareButton.onclick = null
  },
  switchPlayer() {
    const chessBoardPieces = document.querySelectorAll('.chess-square button')
    for (const piece of chessBoardPieces) {
      if (piece.className.includes('player-of-turn')) {
        this.remove(piece)
      } else {
        this.set(piece)
      }
    }

    if (playerOfTurn == 'black') {
      playerOfTurn = 'white'
    } else {
      playerOfTurn = 'black'
    }
  }
}