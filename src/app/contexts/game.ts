import { createSlice } from '@reduxjs/toolkit';
const username = sessionStorage.getItem('username') || '';
const initialState: GameManagerI = {
	selectedCard: null,
	currentPlayer: { username },
	cards: null,
	gameState: {
		currentTurn: null,
		state: 'notStarted',
		player1: null,
		player2: null,
	},
};

const game = createSlice({
	name: 'game',
	initialState: initialState,
	reducers: {
		/* LOG_OUT_Action
PLAYER_LOGGED_IN_Action
SET_PLAYER_NAME_Action
GAME_UPDATED_Action */
		LogOut: (state) => {
			sessionStorage.removeItem('username');
			state.currentPlayer = { username: '' };
		},
		PlayerLoggedIn: (state, action: PLAYER_LOGGED_IN_Action) => {
			state.cards = action.payload;
			sessionStorage.setItem('username', state.currentPlayer.username);
		},
		SetPlayerName: (state, action: SET_PLAYER_NAME_Action) => {
			state.currentPlayer.username = action.payload;
		},
		GameUpdated: (state, action: GAME_UPDATED_Action) => {
			state.gameState = action.payload;
		},
		SelectCard: (state, action: SELECT_CARD_Action) => {
			state.selectedCard = action.payload;
		},
	},
});

export const { GameUpdated, LogOut, PlayerLoggedIn, SetPlayerName, SelectCard } = game.actions;

export default game.reducer;
