import LockChoiceButton from '#client/LockChoiceButton';

export const ActionsButtons: Record<GameStatesI, JSX.Element> = {
	notStarted: (
		<>
			<LockChoiceButton />
		</>
	),
	started: <></>,
	finished: <></>,
};

export default function ActionsButton({ state }: { state: GameStatesI }) {
	return <div className="w-full flex items-center justify-between">{ActionsButtons[state]}</div>;
}
