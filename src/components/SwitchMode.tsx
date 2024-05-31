import useGame from '@client/hooks/useGame';

export default function SwitchMode() {
	const {
		mode,
		setMode,
		gameState: { canSwitchMode },
		passTurn,
		myTurn,
	} = useGame();
	return (
		<>
			<label className="swap swap-flip text-6xl mx-auto">
				{/* this hidden checkbox controls the state */}
				<input
					type="checkbox"
					aria-checked={mode === 'guess'}
					disabled={!canSwitchMode || !myTurn}
					onClick={() => {
						setMode();
					}}
				/>

				<div className="swap-on">🤔 Guess</div>
				<div className="swap-off">🔄️ Switch</div>
			</label>
			{mode === 'switch' && myTurn && (
				<button className="btn btn-primary" onClick={passTurn}>
					Pass Turn
				</button>
			)}
		</>
	);
}
