import { LogOut, SetPlayerName, SelectCard } from '@client/app/contexts/game';
import { useAppDispatch, useAppSelector } from './redux';
import { removeCard, chooseCard, requestLogOut, requestLogin, restartGame } from '@client/app/contexts/socket';

const useGame = () => {
	const dispatch = useAppDispatch();
	const state = useAppSelector((state) => state.game);
	const players = [state.gameState.player1, state.gameState.player2];
	return {
		...state,
		players,
		logIn: () => {
			dispatch(requestLogin());
		},
		logOut: () => {
			dispatch(requestLogOut());
			dispatch(LogOut());
		},
		removeCard: (cardId: number) => {
			dispatch(removeCard(cardId));
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
		setTempSelectedCard: (cardId: number | null) => {
			dispatch(SelectCard(cardId));
		},
		currentPlayerIndex: players.findIndex((player) => player?.username === state.currentPlayer?.username),
	};
};
export default useGame;
