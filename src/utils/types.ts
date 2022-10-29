export interface Card {
  images: [string];
  title: string;
  comments: Comment[];
  tags: string[];
}

export interface Comment {
  body: string;
  date: Date;
}

export interface Plan {
  cards: Card[];
  comments: string;
}

export function isCard(card: Card): card is Card {
  return card.images !== undefined && card.title !== undefined;
}
