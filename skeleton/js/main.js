var View = require('./ttt-view');
var Game = require('../../ttt-core-solution/game');


$(function () {
  var $container = $('.ttt');
  var game = new Game();
  var view = new View(game, $container);
});
