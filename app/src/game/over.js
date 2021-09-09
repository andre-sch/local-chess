const GameOver = {
  display(type, winner) {
    localStorage.removeItem('savedGame')
    
    const img = document.createElement('img')

    img.src = `${staticProvider}/assets/winner/${winner}.svg`
    img.alt = winner + ' wins'
    img.draggable = false

    document.getElementById('winner-container').appendChild(img)

    const h1 = document.querySelector('#game-over .text h1')
    const h2 = document.querySelector('#game-over .text h2')

    if (winner == 'nobody') {
      h1.innerHTML = 'draw'
    } else {
      h1.innerHTML = winner + ' team wins'
    }
    h2.innerHTML = type.toUpperCase()

    BodyOverlayInModals.display(this.hide)

    const enabledButtons = document.querySelectorAll(
      '.chess-square button.player-of-turn'
    )
    for (const squareButton of enabledButtons) {
      PlayerActions.remove(squareButton)
    }

    document.getElementById('game-over').style.display = 'flex'
  },
  hide() {
    document.getElementById('winner-container').innerHTML = ''

    document.querySelector('#game-over .text h1').textContent = ''
    document.querySelector('#game-over .text h2').textContent = ''

    BodyOverlayInModals.hide()

    document.getElementById('game-over').style.display = 'none'
  },
  resetGame() {
    document.getElementById('turn-display').innerHTML = 'white turn'
    document.getElementById('king-check').innerHTML = ''

    document.getElementById('black-king-still-in-check-animation').remove()
    document.getElementById('white-king-still-in-check-animation').remove()

    localStorage.removeItem('savedGame')
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
    FakeMovement.resetProps()
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