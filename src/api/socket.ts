import { Middleware } from 'redux';
// Actions
import {
	initSocket,
	requestLogin,
	requestLogOut,
	removeCard,
	chooseCard,
	restartGame,
	guessCard,
	addCard,
	passTurn,
	/* disconnectSocket, */
	/*  joinRoom, leaveRoom, */
} from '@client/app/contexts/socket';
import SocketFactory, { SocketInterface } from '&client/socket';
import { SocketEvent } from '@client/types/Event';

// Socket Factory
// Types

let socket: SocketInterface;
const socketMiddleware: Middleware = (store) => {
	return (next) => (action) => {
		// Middleware logic for the `initSocket` action
		if (initSocket.match(action)) {
			if (!socket && typeof window !== 'undefined') {
				// Client-side-only code
				// Create/ Get Socket Socket
				socket = SocketFactory.create();
			}
		}
		/* if (disconnectSocket.match(action)) {
			socket.socket.disconnect();
		} */
		const game = store.getState().game as GameManagerI;
		if (requestLogin.match(action)) {
			console.log({ game });
			socket.socket.emit(SocketEvent.LogIn, game.currentPlayer);
		}
		if (requestLogOut.match(action)) {
			socket.socket.emit(SocketEvent.LogOut);
		}
		if (removeCard.match(action)) {
			socket.socket.emit(SocketEvent.RemoveCard, action.payload);
		}
		if (chooseCard.match(action)) {
			socket.socket.emit(SocketEvent.ChooseCard, action.payload);
		}
		if (passTurn.match(action)) {
			const currentPlayer =
				game.gameState.player1!.username === game.currentPlayer!.username ? 'player1' : 'player2';
			if (game.gameState.currentTurn === currentPlayer)
				socket.socket.emit(SocketEvent.PassedTurn, action.payload);
		}
		if (addCard.match(action)) {
			socket.socket.emit(SocketEvent.AddedCard, action.payload);
		}
		if (guessCard.match(action)) {
			socket.socket.emit(SocketEvent.GuessCard, action.payload);
		}
		if (restartGame.match(action)) {
			socket.socket.emit(SocketEvent.Restart);
		}

		/* 		// handle the joinRoom action
		if (joinRoom.match(action) && socket) {
			let room = action.payload.room;
			// Join room
			socket.socket.emit(SocketEvent.JoinRoom, room);
			// Then Pass on to the next middleware to handle state
			// ...
		}

		// handle leaveRoom action
		if (leaveRoom.match(action) && socket) {
			let room = action.payload.room;
			socket.socket.emit(SocketEvent.LeaveRoom, room);
			// Then Pass on to the next middleware to handle state
			// ...
		} */
		next(action);
	};
};

export default socketMiddleware;
