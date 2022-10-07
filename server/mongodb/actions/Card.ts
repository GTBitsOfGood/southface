import mongoDB from "../index";
import Card from "../models/Card";

import { Card as CardType } from "src/utils/types";

export async function createCard(card: CardType) {
  await mongoDB();
  return Card.create(card);
}

export async function updateCardById(
  id: string,
  updatedCard: Partial<CardType>
) {
  await mongoDB();
  return Card.findOneAndUpdate({ _id: id }, updatedCard, {
    returnDocument: "after",
  });
}

export async function deleteCardById(id: string) {
  await mongoDB();
  return Card.findOneAndRemove({ _id: id });
}

export async function getCards() {
  await mongoDB();
  return Card.find({});
}

export async function getCardById(id: string) {
  await mongoDB();

  return Card.findById(id);
}

export async function deleteAllCards() {
  await mongoDB();
  return Card.deleteMany({});
}
