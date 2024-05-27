import { ReactNode, useEffect, useReducer } from 'react';
import io from 'socket.io-client';
import { SOCKET_URL } from '&client/web';
import { SocketContext, socketReducer } from '@client/app/contexts/gameR';
import toast from 'react-hot-toast';
import type { GlobaleGameState } from '@client/types/globalGameState';
const username = sessionStorage.getItem('username') || '';
const initialState: GlobaleGameState = {
	gameConnection: 'loading',
	socket: null,
	currentPlayer: { username },
	cards: null,
	gameState: {
		currentTurn: null,
		state: 'notStarted',
		player1: null,
		player2: null,
	},
};
const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [state, dispatch] = useReducer(socketReducer, initialState);

	useEffect(() => {
		const socket = io(SOCKET_URL, {
			withCredentials: true,
		});

		dispatch({ type: 'SET_SOCKET', payload: socket });
		socket.on('reconnect', () => {
			dispatch({ type: 'CONNECT' });
			const username = sessionStorage.getItem('username') || '';
			if (username) {
				socket.emit('logIn', { username });
			}
		});

		socket.on('connect', () => {
			dispatch({ type: 'CONNECT' });
			const username = sessionStorage.getItem('username') || '';
			if (username) {
				socket.emit('logIn', { username });
			}
		});

		socket.on('disconnect', () => {
			dispatch({ type: 'DISCONNECT' });
		});
		socket.on('playerLoggedIn', (cardsCollection: CardsJSON) => {
			dispatch({ type: 'PLAYER_LOGGED_IN', payload: cardsCollection });
		});

		socket.on('gameUpdated', (data: GameState) => {
			dispatch({ type: 'GAME_UPDATED', payload: data });
		});
		socket.on('gameError', (message: string) => {
			toast.error(message);
		});

		return () => {
			socket.disconnect();
			dispatch({ type: 'DISCONNECT' });
		};
	}, []);

	return <SocketContext.Provider value={{ state, dispatch }}>{children}</SocketContext.Provider>;
};
export default GameProvider;
