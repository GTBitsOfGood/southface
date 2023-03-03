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

export async function getCardsPagination({
  pageNumber,
  buildingType,
  primaryCategory,
  searchFilterString = null,
  searchFilterTags = null,
  cardsPerPage = 4,
}) {
  console.log("Entering getCardsPagination...");
  await mongoDB();
  console.log("Connected to database...");

  let query = {};
  if (primaryCategory && buildingType) {
    query = {
      $or: [
        { primaryCategory: primaryCategory, buildingType: buildingType },
        { primaryCategory: null, buildingType: buildingType },
      ],
    };
    console.log(buildingType, primaryCategory);
  } else if (buildingType) {
    query = {
      $in: [buildingType],
    };
    console.log(buildingType, primaryCategory);
  }

  if (searchFilterString && searchFilterTags) {
    const regex = new RegExp(searchFilterString, "i");

    query = {
      ...query,
      $or: [{ title: { $regex: regex } }, { "notes.body": { $regex: regex } }],
      tags: { $all: searchFilterTags },
    };
  } else if (searchFilterString) {
    const regex = new RegExp(searchFilterString, "i");
    query = {
      ...query,
      $or: [{ title: { $regex: regex } }, { "notes.body": { $regex: regex } }],
    };
  } else if (searchFilterTags) {
    query = {
      ...query,
      tags: { $all: searchFilterTags },
    };
  }

  console.log("Query: ", query);
  const result = await Card.find(query)
    .sort({ _id: -1 })
    .skip(pageNumber * cardsPerPage)
    .limit(cardsPerPage);

  console.log("Exiting getCardsPagination...");
  return result;
}

export async function getCardsCount({
  buildingType,
  primaryCategory,
  searchFilterString = null,
  searchFilterTags = null,
}) {
  await mongoDB();

  let query = {
    $match: [{ buildingType }, { primaryCategory }],
  };
  if (searchFilterString && searchFilterTags) {
    const regex = new RegExp(searchFilterString, "i");

    query = {
      ...query,
      $or: [{ title: { $regex: regex } }, { "notes.body": { $regex: regex } }],
      tags: { $all: searchFilterTags },
    };
  } else if (searchFilterString) {
    const regex = new RegExp(searchFilterString, "i");
    query = {
      ...query,
      $or: [{ title: { $regex: regex } }, { "notes.body": { $regex: regex } }],
    };
  } else if (searchFilterTags) {
    query = {
      ...query,
      tags: { $all: searchFilterTags },
    };
  }

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
