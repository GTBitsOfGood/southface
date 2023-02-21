export default {
  pages: {
    index: "/",
    login: "/login",
    library: "/library",
    planbuilder: "/plan-builder",
  },
  api: {
    example: "/api/example",
    user: {
      signUp: "/api/user/sign-up",
      login: "/api/user/login",
      logout: "/api/user/logout",
      getCurrent: "/api/user",
      standards: {
        get: "/api/user/standards/get/",
        update: "/api/user/standards/update",
      },
    },
    card: {
      create: "/api/card/create/",
      get: "/api/card/get/",
      getIds: "/api/card/getIds/",
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
