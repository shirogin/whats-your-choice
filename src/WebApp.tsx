import './tailwind.css';

import { Toaster } from 'react-hot-toast';

import Routes from '@client/Routes';
import { toasterConfig } from '&client/toaster';
import GameProvider from './providers/GameProvider';

// const Copyright = lazy(() => import('#client/Copyright'));

function WebApp() {
	return (
		<GameProvider>
			<Routes />
			<Toaster {...toasterConfig} />
		</GameProvider>
	);
}

export default WebApp;
