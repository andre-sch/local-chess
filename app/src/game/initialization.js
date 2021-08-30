const GameInitialization = {
  start() {
    this.display()
  },
  display() {
    document.getElementById('initialization-modal').style.display = 'none'
    document.getElementById('game').style.display = 'flex'
  }
}