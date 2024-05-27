import React, { createContext } from 'react';
import { Socket } from 'socket.io-client';

export interface GlobaleGameState {
	gameConnection: ConnectionStates;
	socket: Socket | null;
	gameState: GameState;
	currentPlayer: PlayerInfo;
	cards: CardsJSON | null;
}
declare type SocketAction =
	| { type: 'SET_SOCKET'; payload: Socket }
	| { type: 'CONNECT' }
	| { type: 'DISCONNECT' }
	| { type: 'LOG_OUT' }
	| { type: 'PLAYER_LOGGED_IN'; payload: CardsJSON }
	| { type: 'SET_PLAYER_NAME'; payload: string }
	| {
			type: 'GAME_UPDATED';
			payload: GameState;
	  };
export const SocketContext = createContext<
	| {
			state: GlobaleGameState;
			dispatch: React.Dispatch<SocketAction>;
	  }
	| undefined
>(undefined);

export const socketReducer = (state: GlobaleGameState, action: SocketAction): GlobaleGameState => {
	switch (action.type) {
		case 'SET_SOCKET':
			return {
				...state,
				socket: action.payload,
			};
		case 'CONNECT':
			return {
				...state,
				gameConnection: 'connected',
			};
		case 'DISCONNECT':
			return {
				...state,
				socket: null,
				gameConnection: 'disconnected',
			};
		case 'LOG_OUT':
			return {
				...state,
				gameConnection: 'connected',
			};
		case 'SET_PLAYER_NAME':
			return {
				...state,
				currentPlayer: {
					...state.currentPlayer,
					username: action.payload,
				},
			};
		case 'PLAYER_LOGGED_IN':
			return {
				...state,
				gameConnection: 'inRoom',
				cards: action.payload,
			};
		case 'GAME_UPDATED':
			console.log({ game: action.payload });
			return {
				...state,
				gameState: action.payload,
			};
		default:
			return state;
	}
};
