export interface Card {
  imageSrc: string;
  title: string;
  body: string;
  tags: [string];
}

export function isCard(card: Card): card is Card {
  return card.imageSrc !== undefined && card.title !== undefined;
}
