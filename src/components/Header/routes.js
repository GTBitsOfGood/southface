import urls from "src/lib/utils/urls";

const routes = [
  {
    name: "Library",
    link: urls.pages.library,
    auth: false,
    login: true,
  },
  {
    name: "Plan Builder",
    link: urls.pages.planbuilder,
    auth: false,
    login: true,
  },
  {
    name: "Login",
    link: urls.pages.login,
    auth: false,
    atEnd: true,
    login: false,
  },
  {
    name: "Logout",
    link: urls.pages.login,
    auth: true,
    login: true,
  },
];

export default routes;
