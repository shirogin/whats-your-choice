// Slice of store that manages Socket connections
import { createSlice } from '@reduxjs/toolkit';
//import type { PayloadAction } from '@reduxjs/toolkit';
type SocketConnectionState = 'loading' | 'connected' | 'disconnected';
interface SocketState {
	Is: SocketConnectionState;
}

const initialState: SocketState = {
	Is: 'disconnected',
};

/* type RoomAction = PayloadAction<{
	room: string;
}>;
 */
// Now create the slice
const socketSlice = createSlice({
	name: 'socket',
	initialState,
	// Reducers: Functions we can call on the store
	reducers: {
		initSocket: (state) => {
			state.Is = 'loading';
		},
		disconnectSocket: () => {},

		connectionEstablished: (state) => {
			state.Is = 'connected';
		},
		connectionLost: (state) => {
			state.Is = 'disconnected';
		},
		joinRoom: (state, action: { payload: string }) => {
			console.log('state', state, action);
		},
		createRoom: (state, action: { payload: string }) => {
			console.log('state', state, action);
		},
		requestLogOut: () => {},
		removeCard: (_state, _action: { type: string; payload: number }) => {},
		chooseCard: (_state, _action: { type: string; payload: number }) => {},
		guessCard: (_state, _action: { type: string; payload: number }) => {},
		addCard: (_state, _action: { type: string; payload: number }) => {},
		passTurn: (_state) => {},
		restartGame: () => {},
		/* joinRoom: (state, action: RoomAction) => {
			// After the required room is joined through middleware, we manage state here!
			let rooms = action.payload.rooms;
			state.rooms = state.rooms.concat(room);
			return;
		}, */
	},
});

// Don't have to define actions, they are automatically generated
export const {
	initSocket,
	connectionEstablished,
	connectionLost,
	joinRoom,
	createRoom,
	requestLogOut,
	removeCard,
	chooseCard,
	restartGame,
	disconnectSocket,
	guessCard,
	addCard,
	passTurn,
	/* ,joinRoom */
} = socketSlice.actions;
// Export the reducer for this slice
export default socketSlice.reducer;
