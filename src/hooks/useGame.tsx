import { SetPlayerName, SelectCard, SetMode } from '@client/app/contexts/game';
import { useAppDispatch, useAppSelector } from './redux';
import {
	removeCard,
	chooseCard,
	requestLogOut,
	requestLogin,
	restartGame,
	guessCard,
	passTurn,
	addCard,
} from '@client/app/contexts/socket';

const useGame = () => {
	const dispatch = useAppDispatch();
	const state = useAppSelector((state) => state.game);
	const socket = useAppSelector((state) => state.socket);
	const players = [state.gameState.player1, state.gameState.player2];
	const currentPlayerIndex = players.findIndex((player) => player?.username === state.currentPlayer?.username);
	return {
		...state,
		players,
		socketConnection: socket.Is,
		logIn: () => {
			dispatch(requestLogin());
		},
		logOut: () => {
			dispatch(requestLogOut());
		},
		removeCard: (cardId: number) => {
			dispatch(removeCard(cardId));
		},
		guessCard: (cardId: number) => {
			dispatch(guessCard(cardId));
		},
		chooseCard: (cardId: number) => {
			dispatch(chooseCard(cardId));
		},
		restartGame: () => {
			dispatch(restartGame());
		},
		setPlayerName: (name: string) => {
			dispatch(SetPlayerName(name));
		},
		setSelectedCard: (cardId: number | null) => {
			console.log({ cardId });
			dispatch(SelectCard(cardId));
		},
		setMode: (mode: 'switch' | 'guess') => {
			dispatch(SetMode(mode));
		},
		addCard: (cardId: number) => {
			dispatch(addCard(cardId));
		},
		passTurn: () => {
			dispatch(passTurn());
		},
		currentPlayerIndex,
		currentPlayer: (players[currentPlayerIndex] ? players[currentPlayerIndex] : state.currentPlayer) as Player,
		myTurn: state.gameState.currentTurn === 'player' + (currentPlayerIndex + 1),
	};
};
export default useGame;
