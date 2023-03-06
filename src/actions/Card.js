import urls from "src/lib/utils/urls";

export const getCards = async () => {
  return fetch(urls.api.card.get, {
    method: "GET",
    mode: "same-origin",
    credentials: "include",
  })
    .then((response) => response.json())
    .then((json) => {
      if (json == null) {
        throw new Error("Could not connect to API!");
      } else if (!json.success) {
        throw new Error(json.message);
      }

      return json.payload;
    });
};

export const getCardsByIds = async (ids) => {
  getCardsByIdsRequest(ids)
    .then((response) => response.json())
    .then((json) => {
      if (json == null) {
        throw new Error("Could not connect to API!");
      } else if (!json.success) {
        throw new Error(json.message);
      }

      return json.payload;
    });
};

export const getCardsByIdsRequest = (ids) => {
  return fetch(urls.api.card.getIds, {
    method: "POST",
    mode: "same-origin",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ids),
  });
};

export const getCardsPagination = async (pageNumber, searchFilter) => {
  let url = urls.api.card.getPagination + pageNumber;

  if (searchFilter) {
    const tagsArray = Object.keys(searchFilter.tags);

    url +=
      "&searchFilterString=" +
      searchFilter.searchString +
      "&searchFilterTags=" +
      tagsArray +
      "&buildingType=" +
      searchFilter.buildingType;
  }

  if (searchFilter.primaryCategory) {
    url += "&primaryCategory=" + searchFilter.primaryCategory;
  }

  return fetch(url, {
    method: "GET",
    mode: "same-origin",
    credentials: "include",
  })
    .then((response) => response.json())
    .then((json) => {
      if (json == null) {
        throw new Error("Could not connect to API!");
      } else if (!json.success) {
        throw new Error(json.message);
      }

      return json.payload;
    });
};

export const getCardById = async (id) => {
  return fetch(urls.api.card.get + id, {
    method: "GET",
    mode: "same-origin",
    credentials: "include",
  })
    .then((response) => response.json())
    .then((json) => {
      if (json == null) {
        throw new Error("Could not connect to API!");
      } else if (!json.success) {
        throw new Error(json.message);
      }
      return json.payload;
    });
};

export const createCard = async (card) => {
  return fetch(urls.api.card.create, {
    method: "POST",
    mode: "same-origin",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(card),
  })
    .then((response) => response.json())
    .then((json) => {
      if (json == null) {
        throw new Error("Could not connect to API!");
      } else if (!json.success) {
        throw new Error(json.message);
      }

      return json.payload;
    });
};

export const updateCardById = async (id, card) => {
  return fetch(urls.api.card.update, {
    method: "PUT",
    mode: "same-origin",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      card,
    }),
  })
    .then((response) => response.json())
    .then((json) => {
      if (json == null) {
        throw new Error("Could not connect to API!");
      } else if (!json.success) {
        throw new Error(json.message);
      }

      return json.payload;
    });
};

export const deleteCardById = async (id) => {
  return fetch(urls.api.card.delete, {
    method: "DELETE",
    mode: "same-origin",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(id),
  })
    .then((response) => response.json())
    .then((json) => {
      if (json == null) {
        throw new Error("Could not connect to API!");
      } else if (!json.success) {
        throw new Error(json.message);
      }

      return json.payload;
    });
};
