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

  return Card.find({}).sort({ _id: -1 });
}

export async function getCardsCount() {
  await mongoDB();

  return Card.count();
}

export async function getNextDocs(
  no_of_docs_required: number = 4,
  last_doc_id?: string
) {
  if (!last_doc_id) {
    // get first 5 docs
    return Card.find().sort({ _id: -1 }).limit(no_of_docs_required);
  } else {
    // get next 5 docs according to that last document id
    return Card.find({ _id: { $lt: last_doc_id } })
      .sort({ _id: -1 })
      .limit(no_of_docs_required);
  }
}

export async function getCardById(id: string) {
  await mongoDB();

  return Card.findById(id);
}

export async function deleteAllCards() {
  await mongoDB();
  return Card.deleteMany({});
}
