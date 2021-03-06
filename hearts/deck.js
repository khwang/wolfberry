var Card = require("./card").Card;

var SUITS = ["clubs", "hearts", "spades", "diamonds"];
var VALUES = [2,3,4,5,6,7,8,9,10,11,12,13,14]; // aces are high

var Deck = function () {
  this.cards = [];
  for (var i = 0; i < SUITS.length; i++) {
    for (var j = 0; j < VALUES.length; j++) {
      this.cards.push(new Card(VALUES[j], SUITS[i]));
    }
  }
  this.shuffle();
  return this;
};

Deck.prototype.shuffle = function () {
  var m = this.cards.length, temp, i;

  while (m) {
    i = Math.floor(Math.random() * m--);
    temp = this.cards[m];
    this.cards[m] = this.cards[i];
    this.cards[i] = temp;
  }
};

Deck.prototype.dealCard = function () {
  return this.cards.shift();
};

module.exports.Deck = Deck;
