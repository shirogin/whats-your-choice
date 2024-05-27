import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import socketMiddleware from '$client/socket';
// import API from '$client';

import game from './contexts/game';
// import modal from './contexts/modal';
//import notifications from './contexts/notifications';
//import search from './contexts/search';
//import user from './contexts/user';

const store = configureStore({
	reducer: {
		game,
		// language,
		/* modal, */
		/* user, */
		// search,
		// notifications,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(socketMiddleware),
});

export const dispatch = store.dispatch;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export default store;
