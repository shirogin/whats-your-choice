import LiveChecker from '#client/LiveChecker';
import Logo from '#client/Logo';
import useGame from '@client/hooks/useGame';
import Board from './Board';
import ScoreBoard from './ScoreBoard';
function LogoutButton() {
	const { logOut } = useGame();
	return (
		<button onClick={logOut} className="btn btn-warning">
			Logout
		</button>
	);
}
export default function Game() {
	const { currentPlayerIndex } = useGame();

	return (
		<main className="flex flex-col items-center py-16 px-8 w-full mx-auto gap-8">
			<Logo />
			<div className="w-full flex justify-center gap-4">
				<LiveChecker />
				<LogoutButton />
			</div>
			<ScoreBoard />
			<div
				className={`flex w-full gap-8 ${currentPlayerIndex === 1 ? 'flex-col-reverse lg:flex-row-reverse' : 'flex-col lg:flex-row'}`}
			>
				<Board player={0} />
				<div className="divider lg:divider-horizontal">PLAYERS</div>
				<Board player={1} />
			</div>
		</main>
	);
}
