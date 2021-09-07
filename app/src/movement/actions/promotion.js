const Promotion = {
  promotingCoordinates: {
    from: null,
    to: null
  },
  moveType: null,
  verify(fromCoordinates, toCoordinates, type) {
    const role = getPieceIterator(toCoordinates, 'role')
    if (role != 'pawn') return false

    const teamSide = getPieceIterator(toCoordinates, 'teamSide')
    const [,coordinateY] = toCoordinates
    const requiredY = {
      black: 0,
      white: 7
    }

    if (coordinateY == requiredY[teamSide]) {
      this.promotingCoordinates = {
        from: fromCoordinates,
        to: toCoordinates
      }
      this.moveType = type
      return true
    }
    return false
  },
  display(teamSide) {
    document.getElementById('choices').className = teamSide + '-team'
    document.getElementById('promotion').style.display = 'flex'

    BodyOverlayInModals.display(() => {
      revertRealMovement(
        this.promotingCoordinates.from,
        this.promotingCoordinates.to,
        this.moveType
      )
      this.hide()
    })
  },
  hide() {
    document.getElementById('choices').className = ''
    document.getElementById('promotion').style.display = 'none'
    BodyOverlayInModals.hide()
  },
  changeRole(role) {
    this.hide()

    const teamSide = getPieceIterator(this.promotingCoordinates.to, 'teamSide')
    const index = getPieceIterator(this.promotingCoordinates.to, 'index')
    const squareId = PiecesCoordinates.convertToString(
      this.promotingCoordinates.to
    )

    PiecesCoordinates.current[teamSide].pawn[index] = null
    PiecesCoordinates.current[teamSide][role].push(squareId)

    MovePiece.removeOldButton(this.promotingCoordinates.to)
    MovePiece.createNewImage(this.promotingCoordinates.to)
    MovePiece.afterPromotion(this.promotingCoordinates.to)
  },
  resetProps() {
    this.promotingCoordinates = {
      from: null,
      to: null
    }
    this.moveType = null
  }
}