import useGame from '@client/hooks/useGame';

export default function LockChoiceButton() {
	const { tempSelectedCard, chooseCard } = useGame();

	if (tempSelectedCard === null) return <></>;
	return (
		<button onClick={() => chooseCard(tempSelectedCard)} className="btn btn-primary">
			Lock Choice
		</button>
	);
}
