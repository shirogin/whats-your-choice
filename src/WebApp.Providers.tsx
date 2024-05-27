import { lazy } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import store from './app/store';

const WebApp = lazy(() => import('./WebApp'));
const ErrorsBoundary = lazy(() => import('#client/Errors/ErrorsBoundary'));

export default function Providers() {
	return (
		<BrowserRouter>
			<ErrorsBoundary>
				<Provider store={store}>
					<WebApp />
				</Provider>
			</ErrorsBoundary>
		</BrowserRouter>
	);
}
