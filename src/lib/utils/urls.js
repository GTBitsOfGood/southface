export default {
  pages: {
    index: "/",
    login: "/login",
    library: "/library",
    reportbuilder: "/report-builder",
  },
  api: {
    example: "/api/example",
    user: {
      signUp: "/api/user/sign-up",
      login: "/api/user/login",
      logout: "/api/user/logout",
      getCurrent: "/api/user",
      getAll: "/api/user/get",
      getCurrentTesting: "/api/user/get", // add id to query
      getArchivedReports: "/api/user/get/archivedReports",
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
    report: {
      create: "/api/report/create",
      get: "/api/report/get",
      update: "/api/report/update",
      delete: "/api/report/delete",
    },
  },
};
