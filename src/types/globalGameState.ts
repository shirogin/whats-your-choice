import { Socket } from 'socket.io-client';

export interface GlobaleGameState {
	gameConnection: ConnectionStates;
	socket: Socket | null;
	gameState: GameState;
	currentPlayer: PlayerInfo;
	cards: CardsJSON | null;
}
