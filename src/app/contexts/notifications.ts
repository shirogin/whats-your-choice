import { createSlice } from '@reduxjs/toolkit';

const initial_state: NotificationI[] = [];
const notifications = createSlice({
	name: 'notifications',
	initialState: initial_state,
	reducers: {
		pushNotification: (state, action: { payload: { notification: NotificationI } }) => {
			state.unshift(action.payload.notification);
			return state;
		},
		initNotifications: (state, action: { payload: { notifications: NotificationI[] } }) => {
			state = action.payload.notifications;
			return state;
		},
	},
});

export const { pushNotification, initNotifications } = notifications.actions;

export default notifications.reducer;
