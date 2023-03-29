export default {
  pages: {
    index: "/",
    login: "/login",
    library: "/library",
    reportbuilder: "/report-builder",
    addstandard: "/add-standard",
  },
  api: {
    example: "/api/example",
    card: {
      create: "/api/card/create/",
      get: "/api/card/get/",
      getIds: "/api/card/getIds/",
      getPagination: "/api/card/getPagination?page=",
      update: "/api/card/update/",
      delete: "/api/card/delete/",
      thumbsUp: "/api/card/thumbsUp",
      thumbsDown: "/api/card/thumbsDown",
      thumbsUpAndDown: "/api/card/thumbsUpAndDown",
    },
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
      activeReport: {
        get: "/api/user/active-report/get",
        getUnpopulated: "/api/user/active-report/get-unpopulated",
        add: "/api/user/active-report/add",
        remove: "/api/user/active-report/remove",
        update: "/api/user/active-report/update",
        change: "/api/user/active-report/change",
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
