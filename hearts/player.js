var Player = function (name, position) {
  this.name = name;
  this.position = position;
  this.hand = [];
  this.tricks = [];
  this.game = null;
  this.score = 0;

  return this;
};

Player.prototype.receiveCard = function (card) {
  this.hand.push(card);
};

Player.prototype.playCard = function (card) {
  var index = this.hand.indexOf(card);
  if (index == -1) {
    throw new Error("Tried to play a card not in your hand!");
  }

  // Logic about whether or not this card is a legal move.

  ledCard = this.game.currentTrick[0];

  if (ledCard) {
    var ledSuit = ledCard.suit;
    if (card.suit !== ledSuit) {
      matchingSuitCards = this.hand.filter(function (card) {
        return card.suit === ledSuit;
      });
      if (matchingSuitCards.length !== 0) {
        throw new Error("You must follow suit if you can!");
      }
    }
  }
  else { // you are the first card to lead
    if (card.suit === "hearts" && this.game.penaltyCardPlayed !== true) {
      throw new Error("You can't lead Hearts until it has been broken");
    }
  }
  this.hand.splice(index, 1);
};

Player.prototype.scoreTricks = function () {
  var newScore = this.tricks.reduce(function (prev, current) {
    if (current.suit === "hearts") {
      return prev + 1;
    }
    else if (current.suit === "spades" && current.value === 12) {
      return prev + 13;
    }
    else return prev;
  }, 0);
  this.score = newScore + this.score;
};

Player.prototype.takeTrick = function (trick) {
  this.tricks = this.tricks.concat(trick);
};

Player.prototype.joinGame = function (game) {
  this.game = game;
};

module.exports = Player;
