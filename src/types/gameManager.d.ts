interface GameManagerI {
	choices: CardEssential<string>[];
	mode: 'switch' | 'guess';
	room: string | null;
	selectedCard: number | null;
	gameState: GameState;
	currentPlayer: PlayerInfo;
	cards: CardsJSON | null;
}
