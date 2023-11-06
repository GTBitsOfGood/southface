import mongoDB from "../index";
import Card from "../models/Card";

export async function createCard(card) {
  await mongoDB();

  return Card.create(card);
}

export async function insertManyCards(cards) {
  await mongoDB();

  return Card.insertMany(cards);
}

export async function updateCardById(id, updatedCard) {
  await mongoDB();

  return Card.findOneAndUpdate({ _id: id }, updatedCard, {
    returnDocument: "after",
  });
}

export async function deleteCardById(id) {
  await mongoDB();
  return Card.findOneAndRemove({ _id: id });
}

export async function getCards() {
  await mongoDB();

  return Card.find({}).sort({ _id: -1 });
}

function createSearchQuery(
  buildingType,
  primaryCategory,
  searchFilterString,
  searchFilterTags
) {
  let query = { buildingType, ...(primaryCategory && { primaryCategory }) };

  searchFilterTags = searchFilterTags
    ? searchFilterTags.split(",").map((tag) => tag.replaceAll("-;-", ","))
    : null;

  if (searchFilterString && searchFilterTags) {
    const regex = new RegExp(searchFilterString, "i");

    query = {
      ...query,
      $and: [
        {
          $or: [
            { title: { $regex: regex } },
            { criteria: { $regex: regex } },
            { "notes.body": { $regex: regex } },
            { tags: { $regex: regex } },
          ],
        },
        { tags: { $all: searchFilterTags } },
      ],
    };
  } else if (searchFilterString) {
    const regex = new RegExp(searchFilterString, "i");
    query = {
      ...query,
      $or: [
        { title: { $regex: regex } },
        { criteria: { $regex: regex } },
        { "notes.body": { $regex: regex } },
        { tags: { $regex: regex } },
      ],
    };
  } else if (searchFilterTags) {
    query = {
      ...query,
      tags: { $all: searchFilterTags },
    };
  }

  return query;
}

export async function getCardsPagination({
  pageNumber,
  buildingType,
  primaryCategory = null,
  searchFilterString = null,
  searchFilterTags = null,
  cardsPerPage = 6,
}) {
  await mongoDB();

  const query = createSearchQuery(
    buildingType,
    primaryCategory,
    searchFilterString,
    searchFilterTags
  );

  const result = await Card.find(query)
    .sort({ _id: -1 })
    .skip(pageNumber * cardsPerPage)
    .limit(cardsPerPage);

  return result;
}

export async function getCardsCount({
  buildingType,
  primaryCategory,
  searchFilterString = null,
  searchFilterTags = null,
}) {
  await mongoDB();

  const query = createSearchQuery(
    buildingType,
    primaryCategory,
    searchFilterString,
    searchFilterTags
  );

  return Card.find(query).count();
}

export async function getNextDocs(no_of_docs_required, last_doc_id) {
  if (!last_doc_id) {
    // get first 4 docs
    return Card.find().sort({ _id: -1 }).limit(no_of_docs_required);
  } else {
    // get next 4 docs according to that last document id
    return Card.find({ _id: { $lt: last_doc_id } })
      .sort({ _id: -1 })
      .limit(no_of_docs_required);
  }
}

export async function getCardById(id) {
  await mongoDB();

  return Card.findById(id);
}

export async function getCardsByIds(ids) {
  await mongoDB();

  return Card.find({
    _id: { $in: ids },
  });
}

export async function deleteAllCards() {
  await mongoDB();
  return Card.deleteMany({});
}

export async function thumbsUp(cardId, userId, index, shouldPush) {
  await mongoDB();

  const operation = shouldPush ? "$push" : "$pull";

  return Card.findOneAndUpdate(
    { _id: cardId },
    { [`${operation}`]: { [`images.${index}.thumbsUp`]: userId } },
    { new: true }
  );
}

export async function thumbsDown(cardId, userId, index, shouldPush) {
  await mongoDB();

  const operation = shouldPush ? "$push" : "$pull";

  return Card.findOneAndUpdate(
    { _id: cardId },
    { [`${operation}`]: { [`images.${index}.thumbsDown`]: userId } },
    { new: true }
  );
}

export async function thumbsUpAndDown(cardId, userId, index, currentlyLiked) {
  await mongoDB();

  const operationOne = currentlyLiked ? "$pull" : "$push";
  const operationTwo = currentlyLiked ? "$push" : "$pull";

  return Card.findOneAndUpdate(
    { _id: cardId },
    {
      [`${operationOne}`]: { [`images.${index}.thumbsUp`]: userId },
      [`${operationTwo}`]: { [`images.${index}.thumbsDown`]: userId },
    },
    { new: true }
  );
}
