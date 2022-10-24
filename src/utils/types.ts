export interface Card {
  imageSrc: string;
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
