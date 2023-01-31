export default {
  pages: {
    index: "/",
    login: "/login",
    library: "/library",
    planbuilder: "/plan-builder",
    categories: "/categories",
  },
  api: {
    example: "/api/example",
    user: {
      signUp: "/api/user/sign-up",
      login: "/api/user/login",
      logout: "/api/user/logout",
      getCurrent: "/api/user",
    },
    card: {
      create: "/api/card/create/",
      get: "/api/card/get/",
      getPagination: "/api/card/getPagination?page=",
      update: "/api/card/update/",
      delete: "/api/card/delete/",
    },
    comment: {
      create: "/api/comment/create",
      update: "/api/comment/update",
      delete: "/api/comment/delete",
    },
    plan: {
      create: "/api/plan/create",
      get: "/api/plan/get",
      update: "/api/plan/update",
      delete: "/api/plan/delete",
    },
  },
};
