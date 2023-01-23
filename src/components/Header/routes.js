import urls from "src/lib/utils/urls";

const routes = [
  {
    name: "Library",
    link: urls.pages.library,
    auth: false,
  },
  {
    name: "Plan Builder",
    link: urls.pages.planbuilder,
    auth: false,
  },
  {
    name: "Login",
    link: urls.pages.login,
    auth: false,
    atEnd: true,
  },
];

export default routes;
