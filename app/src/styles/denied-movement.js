const DeniedMovementAnimation = {
  execute(teamSide) {
    const animation = document.getElementById(
      `${teamSide}-king-still-in-check-animation`
    )
  
    animation.style.display = 'none'
    animation.style.display = 'block'
    setTimeout(() => {
      animation.style.display = 'none'
    }, 1500)
  },
  appendDiv(teamSide, square) {
    var hasCheckAnimationDiv = false
    const checkAnimationDivId = `${teamSide}-king-still-in-check-animation`

    for (const child of square.children) {
      if (child.id == checkAnimationDivId) {
        hasCheckAnimationDiv = true
        break
      }
    }
    if (!hasCheckAnimationDiv) {
      const div = document.createElement('div')
      div.id = checkAnimationDivId
      square.appendChild(div)
    }
  },
  removeDiv(fromCoordinates, teamSide) {
    const fromSquareId = PiecesCoordinates.convertToString(fromCoordinates)
    const fromSquare = document.getElementById(`square-${fromSquareId}`)
    const checkAnimationDivId = `${teamSide}-king-still-in-check-animation`

    for (const child of fromSquare.children) {
      if (child.id == checkAnimationDivId) {
        child.remove()
        return
      }
    }
  }
}