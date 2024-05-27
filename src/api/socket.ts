import { Middleware } from 'redux';
// Actions
import {
	connectionEstablished,
	initSocket,
	connectionLost,
	requestLogin,
	requestLogOut,
	removeCard,
	chooseCard,
	restartGame,
	/*  joinRoom, leaveRoom, */
} from '@client/app/contexts/socket';
import SocketFactory, { SocketInterface } from '&client/socket';
import { SocketEvent } from '@client/types/Event';
import { GameUpdated, PlayerLoggedIn } from '@client/app/contexts/game';
import toast from 'react-hot-toast';
// Socket Factory
// Types

const socketMiddleware: Middleware = (store) => {
	let socket: SocketInterface;

	return (next) => (action) => {
		// Middleware logic for the `initSocket` action
		if (!socket && typeof window !== 'undefined') {
			// Client-side-only code
			// Create/ Get Socket Socket
			socket = SocketFactory.create();
			if (initSocket.match(action)) {
				socket.socket.on(SocketEvent.Connect, () => {
					store.dispatch(connectionEstablished());
				});

				// handle all Error events
				socket.socket.on(SocketEvent.Error, (message) => {
					console.error(message);
				});

				// Handle disconnect event
				socket.socket.on(SocketEvent.Disconnect, () => {
					store.dispatch(connectionLost());
				});

				// Handle game update event
				socket.socket.on(SocketEvent.GameUpdated, (gameState: GameState) => {
					store.dispatch(GameUpdated(gameState));
					// store.dispatch(gameUpdated(gameState));
				});

				// PlayerLoggedIn event
				socket.socket.on(SocketEvent.PlayerLoggedIn, (cardsCollection: CardsJSON) => {
					store.dispatch(PlayerLoggedIn(cardsCollection));
				});

				// handle error event
				socket.socket.on(SocketEvent.Error, (message: string) => {
					toast.error(message);
				});
			} else {
				const game = store.getState().game;
				if (requestLogin.match(action)) {
					socket.socket.emit(SocketEvent.LogIn, game.currentPlayer);
				} else if (requestLogOut.match(action)) {
					socket.socket.emit(SocketEvent.LogOut);
				} else if (removeCard.match(action)) {
					socket.socket.emit(SocketEvent.RemoveCard, action.payload);
				} else if (chooseCard.match(action)) {
					socket.socket.emit(SocketEvent.ChooseCard, action.payload);
				} else if (restartGame.match(action)) {
					socket.socket.emit(SocketEvent.Restart);
				}
			}
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
