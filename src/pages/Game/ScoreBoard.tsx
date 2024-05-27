import useGame from '@client/hooks/useGame';
const gameStates: Record<GameStatesI, string> = {
	started: 'Game Started',
	notStarted: 'Game Not Started',
	finished: 'Game Finished',
};
const gameStatesClassNames: Record<GameStatesI, string> = {
	started: 'btn-info',
	notStarted: 'btn-warning',
	finished: 'btn-success',
};
export default function ScoreBoard() {
	const { gameState, restartGame } = useGame();
	return (
		<div className="w-full flex flex-col items-center gap-4">
			<h1 className="text-4xl">ScoreBoard</h1>
			<div className="flex gap-4 w-full">
				<div className="w-1/2 flex flex-col items-center">
					<h2 className="text-2xl">{gameState.player1?.username || 'Player 1'}</h2>
					<p>Score: {gameState.player1?.score || 0}</p>
				</div>
				<div className="w-1/2 flex flex-col items-center">
					<h2 className="text-2xl">{gameState.player2?.username || 'Player 2'}</h2>
					<p>Score: {gameState.player2?.score || 0}</p>
				</div>
			</div>
			<div className="w-full flex justify-around items-center">
				<div className="w-1/2 flex flex-col items-center">
					<button className={`btn ${gameStatesClassNames[gameState.state]}`}>
						{gameStates[gameState.state]}
					</button>
				</div>
				<div className="w-1/2 flex flex-col items-center">
					<button disabled className="btn btn-secondary" onClick={() => restartGame()}>
						Restart Game
					</button>
				</div>
			</div>
		</div>
	);
}
