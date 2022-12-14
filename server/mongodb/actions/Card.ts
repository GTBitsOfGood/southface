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

export async function getCardsPagination(
  pageNumber: number,
  searchFilterString: string | null = null,
  searchFilterTags: string[] | null = null,
  cardsPerPage: number = 4
) {
  await mongoDB();

  let query = {};
  if (searchFilterString && searchFilterTags) {
    const regex = new RegExp(searchFilterString, "i");

    query = {
      $or: [
        { title: { $regex: regex } },
        { "comments.body": { $regex: regex } }, // checks in each element.body in comments array
      ],
      tags: { $all: searchFilterTags },
    };
  } else if (searchFilterString) {
    const regex = new RegExp(searchFilterString, "i");
    query = {
      $or: [
        { title: { $regex: regex } },
        { "comments.body": { $regex: regex } }, // checks in each element.body in comments array
      ],
    };
  } else if (searchFilterTags) {
    query = {
      tags: { $all: searchFilterTags },
    };
  }

  return Card.find(query)
    .sort({ _id: -1 })
    .skip(pageNumber * cardsPerPage)
    .limit(cardsPerPage);
}

export async function getCardsCount(
  searchFilterString: string | null = null,
  searchFilterTags: string[] | null = null
) {
  await mongoDB();

  let query = {};
  if (searchFilterString && searchFilterTags) {
    const regex = new RegExp(searchFilterString, "i");

    query = {
      $or: [
        { title: { $regex: regex } },
        { "comments.body": { $regex: regex } }, // checks in each element.body in comments array
      ],
      tags: { $all: searchFilterTags },
    };
  } else if (searchFilterString) {
    const regex = new RegExp(searchFilterString, "i");
    query = {
      $or: [
        { title: { $regex: regex } },
        { "comments.body": { $regex: regex } }, // checks in each element.body in comments array
      ],
    };
  } else if (searchFilterTags) {
    query = {
      tags: { $all: searchFilterTags },
    };
  }

  return Card.find(query).count();
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
