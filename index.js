// Generated by CoffeeScript 1.4.0
(function() {
  var disposable, makeButton, moves, owns, player, togglePlayer;

  player = new Rx.BehaviorSubject('x');

  moves = new Rx.Subject();

  disposable = new Rx.CompositeDisposable();

  makeButton = function() {
    var button;
    button = $('<div>').addClass('button');
    disposable.add(button.onAsObservable('click').take(1).subscribe(function(e) {
      var target;
      target = $(e.target);
      target.addClass("player-" + player.value);
      return moves.onNext("Button Clicked By " + player.value);
    }));
    return button;
  };

  togglePlayer = function(move) {
    return player.onNext(player.value === 'o' ? 'x' : 'o');
  };

  owns = function(p, dom, c) {
    if (c == null) {
      c = "player-" + p;
    }
    return dom.hasClass(c);
  };

  $(function() {
    var button00, button01, button02, button10, button11, button12, button20, button21, button22, main, turn;
    turn = $('<div>').addClass('turn').appendTo('body');
    main = $('<div>').addClass('main').appendTo('body');
    button00 = makeButton().appendTo(main);
    button01 = makeButton().appendTo(main);
    button02 = makeButton().appendTo(main);
    button10 = makeButton().appendTo(main);
    button11 = makeButton().appendTo(main);
    button12 = makeButton().appendTo(main);
    button20 = makeButton().appendTo(main);
    button21 = makeButton().appendTo(main);
    button22 = makeButton().appendTo(main);
    player.subscribe(function() {
      turn.removeClass('player-o player-x');
      turn.addClass("player-" + player.value);
      return turn.html("Current Player");
    });
    moves.subscribe(function() {
      var didWin;
      didWin = (owns(player.value, button00) && owns(player.value, button01) && owns(player.value, button02)) || (owns(player.value, button10) && owns(player.value, button11) && owns(player.value, button12)) || (owns(player.value, button20) && owns(player.value, button21) && owns(player.value, button22)) || (owns(player.value, button00) && owns(player.value, button10) && owns(player.value, button20)) || (owns(player.value, button01) && owns(player.value, button11) && owns(player.value, button21)) || (owns(player.value, button02) && owns(player.value, button12) && owns(player.value, button22)) || (owns(player.value, button00) && owns(player.value, button11) && owns(player.value, button22)) || (owns(player.value, button20) && owns(player.value, button11) && owns(player.value, button02));
      if (didWin) {
        disposable.dispose();
        return alert("Player " + (player.value.toUpperCase()) + " Wins!");
      }
    });
    return moves.subscribe(togglePlayer);
  });

}).call(this);
