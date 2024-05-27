import Loading from '#client/Loading';
import useGame from '@client/hooks/useGameR';
import Card from './CharachterCard';

export default function Cards({
	cards,
	thisPlayer,
	otherPlayer,
	player,
}: {
	cards: number[];
	player: 0 | 1;
	thisPlayer: Player;
	otherPlayer: Player | null;
}) {
	const { cards: cardsCollection, gameState, currentPlayerIndex, tempSelectedCard, setTempSelectedCard } = useGame();
	if (!cardsCollection) return <Loading className="w-32 mx-auto my-10" />;

	const formedCards: FormedCard[] = cardsCollection.cards.map((card) => ({
		...card,
		isFlipped: cards.includes(card.id),
		isMatched: false,
		isChoosen: otherPlayer?.currentChoosenCard === card.id,
		isSelected: thisPlayer.lastCardClicked === card.id,
		isTempSelected: currentPlayerIndex === player && tempSelectedCard === card.id,
		OnClick:
			currentPlayerIndex === player
				? gameState.state === 'notStarted'
					? setTempSelectedCard
					: () => {}
				: undefined,
	}));
	return (
		<div className="w-full grid grid-cols-6 items-center gap-4">
			{formedCards.map((card) => {
				return <Card key={card.id} {...card}></Card>;
			})}
		</div>
	);
}
