import useGame from '@client/hooks/useGame';
import Cards from './Cards';
import ActionsButton from './ActionsButton2';
export default function Board({ player }: { player: 0 | 1 }) {
	const { players, currentPlayerIndex, gameState } = useGame();
	const thisPlayer = players[player];
	const otherPlayer = players[1 - player];

	if (!thisPlayer)
		return (
			<div className="w-full flex items-center justify-center min-h-48 h-full bg-base-300">
				<h1 className="text-4xl">No player {player} yet !!</h1>
			</div>
		);
	return (
		<div className="w-full flex flex-col gap-8">
			{!thisPlayer.currentChoosenCard ? (
				<div role="alert" className="alert alert-info">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						className="stroke-current shrink-0 w-6 h-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						></path>
					</svg>
					<span>
						{currentPlayerIndex === player
							? 'please select a card to start the game'
							: 'waiting for the other player to select a card'}
					</span>
				</div>
			) : (
				currentPlayerIndex === player && <ActionsButton state={gameState.state} />
			)}
			<h1 className="text-4xl text-center w-full">{thisPlayer.username}</h1>
			<Cards cards={thisPlayer.cards} thisPlayer={thisPlayer} player={player} otherPlayer={otherPlayer} />
		</div>
	);
}
