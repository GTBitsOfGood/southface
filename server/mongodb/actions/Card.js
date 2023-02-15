import mongoDB from "../index";
import Card from "../models/Card";

export async function createCard(card) {
  await mongoDB();

  return Card.create(card);
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

// thumbs up and down logic for connect to db
export async function thumbUpCard(id) {
  await mongoDB();

  const card = await Card.findById(id);

  if (!card) {
    throw new Error(`Card with id ${id} not found.`);
  }

  card.thumbsUp += 1;

  return Card.findOneAndUpdate({ _id: id }, card, {
    returnDocument: "after",
  });
}

export async function thumbDownCard(id) {
  await mongoDB();

  return Card.findOneAndUpdate(
    { _id: id },
    {
      $inc: {
        thumbDown: 1,
      },
    },
    { returnDocument: "after" }
  );
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
