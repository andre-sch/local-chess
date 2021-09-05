function revertRealMovement(fromCoordinates, toCoordinates, moveType) {
  MovePiece.removeOldButton(toCoordinates)
  MovePiece.updateCurrentCoordinates(toCoordinates, fromCoordinates)
  MovePiece.createNewImage(fromCoordinates)

  if (moveType == 'capture' || moveType == 'en passant') {
    CapturePiece.removeLastDeadPiece()
    CapturePiece.displayTeamDeadPieces()
    CapturePiece.displayTeamScore()

    var capturedPieceSquareId
    if (moveType == 'en passant') {
      const capturedPieceCoordinates = EnPassant.lastDoubleStepPawn.coordinates
      capturedPieceSquareId = PiecesCoordinates.convertToString(
        capturedPieceCoordinates
      )
    } else {
      capturedPieceSquareId = PiecesCoordinates.convertToString(toCoordinates)
    }

    const capturedTeamSide = CapturePiece.teamSide
    const capturedRole = CapturePiece.role
    const capturedIndex = CapturePiece.index

    if (capturedIndex) {
      const rolePieces =
        PiecesCoordinates.current[capturedTeamSide][capturedRole]

      for (const index in rolePieces) {
        if (index == capturedIndex) {
          PiecesCoordinates.current
            [capturedTeamSide]
            [capturedRole]
            [index] = capturedPieceSquareId
          break
        }
      }
    } else {
      PiecesCoordinates.current
        [capturedTeamSide]
        [capturedRole] = capturedPieceSquareId
    }
    PiecesCoordinates.setPieceInSquare(capturedPieceSquareId)
  }
}