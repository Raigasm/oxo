var OXO = {
  create: first => {
    var game = {
      grid: [["N", "N", "N"], ["N", "N", "N"], ["N", "N", "N"]],
      next: first,
      moves: 0
    };

    return game;
  }
};

export default OXO;
