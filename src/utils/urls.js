export default {
  baseUrl: process.env.BASE_URL ?? "http://localhost:3000",
  pages: {
    index: "/",
    ssr: "/ssr",
    login: "/login",
    app: {
      home: "/app",
    },
    library: "/library",
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
      create: "/api/card/create",
      get: "/api/card/get",
      update: "/api/card/update",
      delete: "/api/card/delete",
    },
    plan: {
      create: "/api/plan/create",
      get: "/api/plan/[id]",
      update: "/api/plan/update",
      delete: "/api/plan/delete",
    },
  },
};
