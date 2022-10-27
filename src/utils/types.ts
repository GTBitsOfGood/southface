export interface Card {
  images: [string];
  title: string;
  body: string;
  tags: string[];
}

export interface Plan {
  cards: Card[];
  comments: string;
}

export function isCard(card: Card): card is Card {
  return card.images !== undefined && card.title !== undefined;
}
