class Knight extends NonContinuousMovement {
  constructor() {
    super()
    this.movementVectors = [
      [1, 2], [2, 1], [2, -1], [1, -2], [-1, -2], [-2, -1], [-2, 1], [-1, 2]
    ]
  }
}