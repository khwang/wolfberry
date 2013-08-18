var SUITS = ["diamonds", "hearts", "spades", "diamonds"];
var VALUES = [1,2,3,4,5,6,7,8,9,10,11,12,13];

var Card = function (value, suit) {
  if (SUITS.indexOf(suit) == -1 || VALUES.indexOf(value) == -1) {
    throw "Invalid arguments to Card given";
  }
  this.value = value;
  this.suit = suit;
  return this;
};

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

var Player = function (name, position) {
  this.name = name;
  this.position = position;
  this.hand = [];

  return this;
};

Player.prototype.receiveCard = function (card) {
  this.hand.push(card);
};

Player.prototype.playCard = function (card) {
  var index = this.hand.indexOf(card);
  if (index == -1) {
    throw "Tried to play a card not in your hand!";
  }
  this.hand.splice(index, 1);
};

var Game = function () {
  this.players = [];
};

module.exports.Card = Card;
module.exports.Deck = Deck;
module.exports.Player = Player;
