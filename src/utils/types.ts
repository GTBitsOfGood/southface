export interface Card {
  imageSrc: string;
  title: string;
  comments: string[];
  tags: string[];
}

export interface Plan {
  cards: Card[];
  comments: string;
}
