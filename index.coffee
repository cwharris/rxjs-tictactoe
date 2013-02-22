player = new Rx.BehaviorSubject 'x'
moves = new Rx.Subject()

disposable = new Rx.CompositeDisposable()

makeButton = () ->
	button = $('<div>').addClass('button')
	disposable.add button.onAsObservable('click').take(1).subscribe (e) ->
		target = $ e.target
		# target.html player.value
		target.addClass "player-#{player.value}"
		moves.onNext "Button Clicked By #{player.value}"

	button

togglePlayer = (move) ->
	player.onNext if player.value is 'o' then 'x' else 'o'

owns = (p, dom, c = "player-#{p}") ->
	dom.hasClass c

$ ->

	turn = $('<div>').addClass('turn').appendTo 'body'

	main = $('<div>').addClass('main').appendTo 'body'

	button00 = makeButton().appendTo main
	button01 = makeButton().appendTo main
	button02 = makeButton().appendTo main

	button10 = makeButton().appendTo main
	button11 = makeButton().appendTo main
	button12 = makeButton().appendTo main

	button20 = makeButton().appendTo main
	button21 = makeButton().appendTo main
	button22 = makeButton().appendTo main

	player.subscribe ->
		turn.removeClass 'player-o player-x'
		turn.addClass "player-#{player.value}"
		turn.html "Current Player"

	moves.subscribe ->

		didWin =
			(owns(player.value, button00) and owns(player.value, button01) and owns(player.value, button02)) or
			(owns(player.value, button10) and owns(player.value, button11) and owns(player.value, button12)) or
			(owns(player.value, button20) and owns(player.value, button21) and owns(player.value, button22)) or
			(owns(player.value, button00) and owns(player.value, button10) and owns(player.value, button20)) or
			(owns(player.value, button01) and owns(player.value, button11) and owns(player.value, button21)) or
			(owns(player.value, button02) and owns(player.value, button12) and owns(player.value, button22)) or
			(owns(player.value, button00) and owns(player.value, button11) and owns(player.value, button22)) or
			(owns(player.value, button20) and owns(player.value, button11) and owns(player.value, button02))

		if didWin

			disposable.dispose()
			alert "Player #{player.value.toUpperCase()} Wins!"

	moves.subscribe togglePlayer
