export interface Card {
  images: string[];
  title: string;
  comments: Comment[];
  tags: string[];
}

export interface Comment {
  body: string;
  date: Date;
}

export interface Plan {
  userId: string;
  cards: Card[];
  name: string;
}
