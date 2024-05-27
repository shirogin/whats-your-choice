import useGame from '@client/hooks/useGame';
import { ConnectionsCheck } from './ConnectionsCheck';

export default function LiveChecker() {
	const { gameConnection } = useGame();

	return <button className="btn">{ConnectionsCheck[gameConnection]}</button>;
}
