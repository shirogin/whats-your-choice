import { createSlice } from '@reduxjs/toolkit';
const username = sessionStorage.getItem('username') || '';
const room = sessionStorage.getItem('room') || null;
const mode = (sessionStorage.getItem('mode') || 'switch') as 'switch' | 'guess';
const initialState: GameManagerI = {
	choices: [],
	mode,
	selectedCard: null,
	room,
	currentPlayer: { username },
	cards: null,
	gameState: {
		canSwitchMode: true,
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
		SetChoices: (state, action: { payload: CardEssential<string>[] }) => {
			state.choices = action.payload;
		},
		PlayerLoggedOut: (state) => {
			sessionStorage.removeItem('username');
			state.currentPlayer = { username: '' };
			sessionStorage.removeItem('room');
			state.room = null;
		},
		PlayerLoggedIn: (state, action: PLAYER_LOGGED_IN_Action) => {
			state.cards = action.payload.cardsCollection;
			sessionStorage.setItem('username', state.currentPlayer.username);
			state.room = action.payload.roomId;
			sessionStorage.setItem('room', state.room);
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
		SetMode: (state, action: { payload: 'switch' | 'guess' }) => {
			if (state.gameState.canSwitchMode) state.mode = action.payload;
			sessionStorage.setItem('mode', state.mode);
		},
	},
});

export const { GameUpdated, PlayerLoggedOut, PlayerLoggedIn, SetPlayerName, SelectCard, SetMode, SetChoices } =
	game.actions;

export default game.reducer;
