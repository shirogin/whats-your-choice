export enum SocketEvent {
	Connect = 'connect',
	Disconnect = 'disconnect',
	/* // Emit events
	JoinRoom = 'join-room',
	LeaveRoom = 'leave-room', */
	// On events
	PlayerLoggedIn = 'player-logged-in',
	GameUpdated = 'game-updated',
	Error = 'err',

	/* emited */
	LogIn = 'logIn',
	LogOut = 'logOut',
	ChooseCard = 'chooseCard',
	RemoveCard = 'removeCard',
	Restart = 'restart',

	// Price = 'price',
}
