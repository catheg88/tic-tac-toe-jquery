var View = function (game, $el) {
  this.game = game;
  this.$container = $el;

  this.$board = this.setupBoard();
  this.$container.append(this.$board);
  this.bindEvents();
};

View.prototype.bindEvents = function () {
  $('ul li').each(function(_, square) {
    $(square).on('click', function(event) {
      var $square = $(event.currentTarget);
      this.makeMove($square);
    }.bind(this));
  }.bind(this)).bind(this);
};

View.prototype.makeMove = function ($square) {
  var pos = $square.attr('data-pos');
  pos = [parseInt(pos[0]), parseInt(pos[2])];
  // if(!this.game.board.constructor.isValidPos(pos) || !this.game.board.isEmptyPos(pos)) {
  // }

  var currMark = this.game.currentPlayer;
  try {
    this.game.playMove(pos);
    $square.text(currMark);
  } catch (e) {
    alert("Invalid position!");
  }
  $square.css("background-color", "cornflowerblue");
  $square.hover(function() {$(this).css('background-color', 'cornflowerblue')}, function() {$(this).css('background-color', 'cornflowerblue')});

  this.gameOverAlert();
};

View.prototype.gameOverAlert = function() {
  if(this.game.isOver()) {
    if(this.game.winner()) {
      this.game.swapTurn();
      alert("Congratulations, " + this.game.winner() + " , you win!!!!!!!!!!!!!!!!!");
    } else {
      alert("Cat's game");
    }
  }
}

View.prototype.setupBoard = function () {
  var $ul = $('<ul></ul>');
  $ul.css('width', "300px");

  this.game.board.grid.forEach(function(row, rowIdx) {
    row.forEach(function(square, colIdx) {
      var $li = $('<li></li>');
      $li.css('width', '90');
      $li.css('height', '90');
      $li.text(square);
      $li.css({'font-size': '60px', "text-align": "center"});
      $li.css("vertical-align", 'middle');
      $li.css("line-height", '90px');
      $li.css('list-style-type', "none");
      $li.css('float', 'left');
      $li.css('background-color', 'gray');
      $li.css('border', '5px solid white');
      $li.hover(function() { $(this).css('background-color', 'yellow')}, function() { $(this).css('background-color', 'gray')});
      $li.attr('data-pos',[rowIdx, colIdx]);
      $ul.append($li);
    });
  });

  return $ul;
};

module.exports = View;
