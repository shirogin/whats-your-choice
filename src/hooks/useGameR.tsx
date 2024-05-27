import { useContext, useState } from 'react';
import { SocketContext } from '@client/app/contexts/gameR';

const useGame = () => {
	const context = useContext(SocketContext);
	if (context === undefined) {
		throw new Error('useGame must be used within a SocketProvider');
	}
	const [tempSelectedCard, setTempSelectedCard] = useState<number | null>(null);
	const { state, dispatch } = context;
	const players = [state.gameState.player1, state.gameState.player2];
	return {
		...state,
		players,
		logIn: () => {
			if (state.socket) {
				sessionStorage.setItem('username', state.currentPlayer.username);
				state.socket.emit('logIn', state.currentPlayer);
			}
		},
		logOut: () => {
			if (state.socket) {
				sessionStorage.removeItem('username');
				state.socket.emit('logOut');
				dispatch({ type: 'LOG_OUT' });
			}
		},
		removeCard: (cardId: number) => {
			if (state.socket) {
				state.socket.emit('removeCard', cardId);
			}
		},
		chooseCard: (cardId: number) => {
			if (state.socket) {
				console.log('card been choosen', cardId);
				state.socket.emit('chooseCard', cardId);
			}
		},
		restartGame: () => {
			if (state.socket) {
				state.socket.emit('restart');
			}
		},
		setPlayerName: (name: string) => {
			dispatch({ type: 'SET_PLAYER_NAME', payload: name });
		},
		tempSelectedCard,
		setTempSelectedCard,
		currentPlayerIndex: players.findIndex((player) => player?.username === state.currentPlayer?.username),
	};
};
export default useGame;
