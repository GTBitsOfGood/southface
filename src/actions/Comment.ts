import fetch from "isomorphic-unfetch";
import urls from "src/utils/urls";

export const createComment = async (cardId: string, text: string) => {
  return fetch(urls.baseUrl + urls.api.comment.create, {
    method: "POST",
    mode: "same-origin",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ cardId, text }),
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

export const updateCommentById = async (
  cardId: string,
  commentId: string,
  text: string
) => {
  return fetch(urls.baseUrl + urls.api.comment.update, {
    method: "PUT",
    mode: "same-origin",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      cardId,
      commentId,
      text,
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

export const deleteCommentByCardId = async (
  cardId: string,
  commentId: string
) => {
  return fetch(urls.baseUrl + urls.api.comment.delete, {
    method: "DELETE",
    mode: "same-origin",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ cardId, commentId }),
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
