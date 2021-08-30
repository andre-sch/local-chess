const GameInitialization = {
  start() {
    PiecesCoordinates.current = JSON.parse(
      JSON.stringify(PiecesCoordinates.startSetup)
    )
    this.display()
  },
  display() {
    PiecesCoordinates.initialize()
    document.getElementById('initialization-modal').style.display = 'none'
    document.getElementById('game').style.display = 'flex'
  }
}