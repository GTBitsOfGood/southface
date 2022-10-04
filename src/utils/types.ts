export interface Card {
  imageSrc: string;
  title: string;
  body: string;
  tags: string[];
}

export interface Plan {
  cards: Card[];
  comments: string;
}
