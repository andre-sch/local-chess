const DeadPosition = {
  drawCases: [
    ['king'],
    ['knight', 'king'],
    ['bishop', 'king']
  ],
  teamRoles: {
    black: [],
    white: []
  },
  verify() {
    this.listRoles()

    const isInDeadPosition = {
      black: false,
      white: false
    }
    
    for (const teamSide in this.teamRoles) {
      drawCaseIteration:
      for (const drawCase of this.drawCases) {
        if (drawCase.length != this.teamRoles[teamSide].length) continue
  
        for (const roleIndex in drawCase) {
          if (drawCase[roleIndex] != this.teamRoles[teamSide][roleIndex]) {
            continue drawCaseIteration
          }
        }

        isInDeadPosition[teamSide] = true
      }
    }

    return (isInDeadPosition.black && isInDeadPosition.white)
  },
  listRoles() {
    this.teamRoles.black = []
    this.teamRoles.white = []

    for (const teamSideKey in PiecesCoordinates.current) {
      const teamSideValue = PiecesCoordinates.current[teamSideKey]

      for (const pieceRoleKey in teamSideValue) {
        const pieceRoleValue = teamSideValue[pieceRoleKey]

        if (Array.isArray(pieceRoleValue)) {
          for (const piece of pieceRoleValue) {
            if (piece != null) {
              this.teamRoles[teamSideKey].push(pieceRoleKey)
            }
          }
        } else {
          if (pieceRoleValue != null) {
            this.teamRoles[teamSideKey].push(pieceRoleKey)
          }
        }
      }
    }
  }
}