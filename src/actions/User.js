import fetch from "isomorphic-unfetch";
import urls from "src/lib/utils/urls";

export const signUp = (username, password) =>
  fetch(urls.api.user.signUp, {
    method: "POST",
    mode: "same-origin",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
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

export const login = (username, password) =>
  fetch(urls.api.user.login, {
    method: "POST",
    mode: "same-origin",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
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

export const logout = () =>
  fetch(urls.api.user.logout, {
    method: "POST",
    mode: "same-origin",
    credentials: "include",
  })
    .then((response) => response.json())
    .then((json) => {
      if (json == null) {
        throw new Error("Could not connect to API!");
      }

      return json.success;
    });

export const getCurrentUser = (cookies) => {
  const conditionals = {};

  if (cookies != null) {
    conditionals.headers = {
      cookie: cookies,
    };
  }

  return fetch(urls.api.user.getCurrent, {
    method: "GET",
    mode: "same-origin",
    credentials: "include",
    ...conditionals,
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

export const updateRecentStandards = (userId, standardId) =>
  updateRecentStandardsRequest(userId, standardId)
    .then((response) => response.json())
    .then((json) => {
      if (json == null) {
        throw new Error("Could not connect to API!");
      } else if (!json.success) {
        throw new Error(json.message);
      }
      return json.payload;
    });

export const updateRecentStandardsRequest = (userId, standardId) => {
  return fetch(urls.api.user.standards.update, {
    method: "PATCH",
    mode: "same-origin",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: userId, standardId: standardId }),
  });
};
