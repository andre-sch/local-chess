const MobileDrag = {
  movingToCoordinates: [null, null],
  start(squareId) {
    DesktopDrag.startDragPiece(squareId)

    const ghostImgContainer = document.getElementById('touch-drag-container')
    ghostImgContainer.innerHTML = ''

    const coordinates = PiecesCoordinates.convertToArray(squareId)
    const teamSide = getPieceIterator(coordinates, 'teamSide')
    const role = getPieceIterator(coordinates, 'role')

    const ghostImg = document.createElement('img')
    ghostImg.src = `${staticProvider}/assets/licensed/${teamSide}/${role}.svg`
    ghostImg.alt = `${teamSide} ${role} ghost image`

    ghostImgContainer.appendChild(ghostImg)
  },
  move(event) {
    const ghostImg = document.querySelector('#touch-drag-container img')

    ghostImg.style.width = event.target.width + 'px'
    ghostImg.style.height = event.target.height + 'px'

    const chessBoard = document.getElementById('chess-board')
    const relativePositions = {x: null, y: null}
    const touchLocation = event.touches[0]

    // verify if is out of chess board
    if (touchLocation.pageX <= chessBoard.offsetLeft) {
      ghostImg.style.left = chessBoard.offsetLeft + 'px'
      relativePositions.x = 0
    } else if (
      touchLocation.pageX >= chessBoard.offsetLeft + chessBoard.offsetWidth
    ) {
      ghostImg.style.left = chessBoard.offsetLeft + chessBoard.offsetWidth + 'px'
      relativePositions.x = chessBoard.offsetWidth - 1
    } else {
      ghostImg.style.left = touchLocation.pageX + 'px'
      relativePositions.x = touchLocation.pageX - chessBoard.offsetLeft
    }
    
    if (touchLocation.pageY <= chessBoard.offsetTop) {
      ghostImg.style.top = chessBoard.offsetTop + 'px'
      relativePositions.y = 0
    } else if (
      touchLocation.pageY >= chessBoard.offsetTop + chessBoard.offsetHeight
    ) {
      ghostImg.style.top = chessBoard.offsetTop + chessBoard.offsetHeight + 'px'
      relativePositions.y = chessBoard.offsetHeight - 1
    } else {
      ghostImg.style.top = touchLocation.pageY + 'px'
      relativePositions.y = touchLocation.pageY - chessBoard.offsetTop
    }

    ghostImg.style.display = 'block'
    this.setMovingToCoordinates(relativePositions)
    this.setDropZone()
  },
  setMovingToCoordinates(relativePositions) {
    const squareSide = document.querySelector('.chess-square').offsetWidth

    const toCoordinateX = Math.floor(relativePositions.x / squareSide)
    const toCoordinateYInverted = Math.floor(relativePositions.y / squareSide)
    const toCoordinateY = [7, 6, 5, 4, 3, 2, 1, 0][toCoordinateYInverted]

    this.movingToCoordinates = [toCoordinateX, toCoordinateY]
  },
  setDropZone() {
    const squareId = PiecesCoordinates.convertToString(this.movingToCoordinates)
    const lastDropZone = document.querySelector('.drop-zone')

    if (lastDropZone) {
      const [,lastDropZoneId] = lastDropZone.id.split('-')
      if (lastDropZoneId == squareId) return

      lastDropZone.classList.remove('drop-zone')
    }

    const overlays = document.querySelectorAll(`#square-${squareId} .overlay`)
    for (const overlay of overlays) {
      if (overlay.className.includes('possible-movement')) {
        overlay.classList.add('drop-zone')
      }
    }
  },
  end() {
    const [movingToCoordinateX,] = this.movingToCoordinates
    if (movingToCoordinateX == null) return

    const fromSquareId = sessionStorage.getItem('draggingPiece')
    const toSquareId = PiecesCoordinates.convertToString(this.movingToCoordinates)

    if (fromSquareId != toSquareId) {
      const fromCoordinates = PiecesCoordinates.convertToArray(fromSquareId)
      const toSquareOverlays =
        document.querySelectorAll(`#square-${toSquareId} .overlay`)

      for (const overlay of toSquareOverlays) {
        if (overlay.className.includes('possible-movement')) {
          MovePiece.execute(fromCoordinates, this.movingToCoordinates)
        } else {
          PiecePossibleMovements.reset()
        }
      }
    }
    this.reset()
  },
  reset() {
    document.getElementById('touch-drag-container').innerHTML = ''
    sessionStorage.removeItem('draggingPiece')
    this.movingToCoordinates = [null, null]
  }
}