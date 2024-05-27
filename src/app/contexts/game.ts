import { Socket } from 'socket.io-client';
import type { GlobaleGameState } from '@client/types/globalGameState';
import { createSlice } from '@reduxjs/toolkit';
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

const user = createSlice({
	name: 'user',
	initialState: initialState,
	reducers: {},
});

export const {} = user.actions;

export default user.reducer;
