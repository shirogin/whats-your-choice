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
		connectionEstablished: (state) => {
			state.Is = 'connected';
		},
		connectionLost: (state) => {
			state.Is = 'disconnected';
		},
		requestLogin: () => {},
		requestLogOut: () => {},
		removeCard: (_state, _action: { type: string; payload: number }) => {},
		chooseCard: (_state, _action: { type: string; payload: number }) => {},
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
	requestLogin,
	requestLogOut,
	removeCard,
	chooseCard,
	restartGame,
	/* ,joinRoom */
} = socketSlice.actions;
// Export the reducer for this slice
export default socketSlice.reducer;
