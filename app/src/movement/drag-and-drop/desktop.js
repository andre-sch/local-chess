const DesktopDrag = {
  haveDropped: false,
  startDragPiece(squareId) {
    sessionStorage.setItem('draggingPiece', squareId)
    PiecePossibleMovements.show(squareId)
  },
  endDragPiece() {
    sessionStorage.removeItem('draggingPiece')
    if (!this.haveDropped) {
      PiecePossibleMovements.reset()
    }
    this.haveDropped = false
  },
  allowDrop(event) {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  },
  dropPiece(event) {
    event.preventDefault()
    for (const child of event.currentTarget.children) {
      if (child.className.includes('drop-zone')) {
        PiecePossibleMovements.reset()
        break
      }
    }
    this.haveDropped = true

    const draggingPiece = sessionStorage.getItem('draggingPiece')
    const [,squareId] = event.currentTarget.id.split('-')

    const fromCoordinates = PiecesCoordinates.convertToArray(draggingPiece)
    const toCoordinates = PiecesCoordinates.convertToArray(squareId)

    MovePiece.execute(fromCoordinates, toCoordinates)

    sessionStorage.removeItem('draggingPiece')
  },
  squareDragEnter(event) {
    event.dataTransfer.dropEffect = 'move'
    for (const child of event.currentTarget.children) {
      if (child.className.includes('possible-movement')) {
        child.classList.add('drop-zone')
        return
      }
    }
  },
  squareDragLeave(event) {
    for (const child of event.currentTarget.children) {
      if (child.className.includes('drop-zone')) {
        child.classList.remove('drop-zone')
        return
      }
    }
  }
}