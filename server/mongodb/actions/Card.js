import mongoDB from "../index";
import Card from "../models/Card";

export async function createCard(card) {
  await mongoDB();

  return Card.create(card);
}

export async function updateCardById(id, updatedCard) {
  await mongoDB();

  const { isThumbsUp, isThumbsDown, imageId, ...cardUpdate } = updatedCard;

  if (isThumbsUp) {
    return Card.findOneAndUpdate(
      { _id: id, "images._id": imageId },
      { $inc: { "images.$.thumbsUp": 1 } },
      { new: true }
    );
  } else if (isThumbsDown) {
    return Card.findOneAndUpdate(
      { _id: id, "images._id": imageId },
      { $inc: { "images.$.thumbsDown": 1 } },
      { new: true }
    );
  } else {
    return Card.findOneAndUpdate(
      { _id: id, "images._id": imageId },
      {
        $set: {
          "images.$": updatedCard.images.find((image) => image._id === imageId),
        },
        ...cardUpdate,
      },
      {
        returnDocument: "after",
      }
    );
  }
}

export async function deleteCardById(id) {
  await mongoDB();

  return Card.findOneAndRemove({ _id: id });
}

export async function getCards() {
  await mongoDB();

  return Card.find({}).sort({ _id: -1 });
}

export async function getCardsPagination(
  pageNumber,
  searchFilterString,
  searchFilterTags,
  cardsPerPage = 4
) {
  await mongoDB();

  let query = {};
  if (searchFilterString && searchFilterTags) {
    const regex = new RegExp(searchFilterString, "i");

    query = {
      $or: [
        { title: { $regex: regex } },
        { "comments.body": { $regex: regex } },
      ],
      tags: { $all: searchFilterTags },
    };
  } else if (searchFilterString) {
    const regex = new RegExp(searchFilterString, "i");
    query = {
      $or: [
        { title: { $regex: regex } },
        { "comments.body": { $regex: regex } },
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

export async function getCardsCount(searchFilterString, searchFilterTags) {
  await mongoDB();

  let query = {};
  if (searchFilterString && searchFilterTags) {
    const regex = new RegExp(searchFilterString, "i");

    query = {
      $or: [
        { title: { $regex: regex } },
        { "comments.body": { $regex: regex } },
      ],
      tags: { $all: searchFilterTags },
    };
  } else if (searchFilterString) {
    const regex = new RegExp(searchFilterString, "i");
    query = {
      $or: [
        { title: { $regex: regex } },
        { "comments.body": { $regex: regex } },
      ],
    };
  } else if (searchFilterTags) {
    query = {
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

export async function deleteAllCards() {
  await mongoDB();
  return Card.deleteMany({});
}
