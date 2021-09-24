const PlayerActions = {
  set(squareButton) {
    squareButton.classList.add('player-of-turn')

    const chessSquare = squareButton.parentNode
    const [,squareId] = chessSquare.id.split('-')
    
    squareButton.onclick = () => PiecePossibleMovements.show(squareId)

    squareButton.draggable = true
    squareButton.ondragstart = () => DesktopDrag.startDragPiece(squareId)
    squareButton.ondragend = () => DesktopDrag.endDragPiece()

    squareButton.ontouchstart = () => MobileDrag.start(squareId)
    squareButton.ontouchmove = event => MobileDrag.move(event)
    squareButton.ontouchend = () => MobileDrag.end()
    squareButton.ontouchcancel = () => {
      MobileDrag.reset()
      PiecePossibleMovements.reset()
    }
  },
  remove(squareButton) {
    squareButton.classList.remove('player-of-turn')
    squareButton.onclick = null

    squareButton.draggable = false
    squareButton.ondragstart = null
    squareButton.ondragend = null

    squareButton.ontouchstart = null
    squareButton.ontouchmove = null
    squareButton.ontouchend = null
    squareButton.ontouchcancel = null
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

    EnPassant.disableStale()
    Check.hide()

    if (playerOfTurn == 'black') {
      playerOfTurn = 'white'
    } else {
      playerOfTurn = 'black'
    }

    if (kingInCheck != playerOfTurn) {
      kingInCheck = ''
    }

    const oppositeTeam = playerOfTurn == 'black' ? 'white' : 'black'
    TeamPossibleMovements.list(oppositeTeam)

    document.getElementById('turn-display').innerHTML = `${playerOfTurn} turn`
  }
}