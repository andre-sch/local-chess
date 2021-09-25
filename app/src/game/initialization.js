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
  },
  showContinueButton() {
    const savedData = localStorage.getItem('savedGame')
    if (savedData) {
      document.getElementById('continue-game').style.display = 'inline-block'
    }
  }
}