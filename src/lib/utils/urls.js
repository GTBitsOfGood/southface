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
    report: {
      create: "/api/report/create",
      get: "/api/report/get",
      update: "/api/report/update",
      delete: "/api/report/delete",
    },
    tag: {
      create: "/api/tag/create",
      getTags: "/api/tag/get",
      //This is to get all the tags sorted based on first alphabet of each character in the form of a object
      getObject: "/api/tag/get/tagObject",
      delete: "api/tag/delete",
      update: "api/tag/update",
      getTag: "/api/tag/get/tag",
    },
  },
};
