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
