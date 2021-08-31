class King extends NonContinuousMovement {
  constructor() {
    super()
    this.movementVectors = [
      [0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1], [-1, 0], [-1, 1]
    ]
  }
}