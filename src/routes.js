// @flow

import BasePage from "./pages/BasePage";

import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import LogoutPage from "./pages/LogoutPage";

import SurveyCreatePage from "./pages/SurveyCreatePage";
import SurveyUpdatePage from "./pages/SurveyUpdatePage";
import SurveyListPage from "./pages/SurveyListPage";
import SurveyPage from "./pages/SurveyPage";

export default [{
  path: "/",
  component: BasePage,
  routes: [{
    path: "/",
    component: SurveyListPage,
    exact: true,
  }, {
    path: "/signup",
    component: SignupPage,
    exact: true,
  }, {
    path: "/signin",
    component: SigninPage,
    exact: true,
  }, {
    path: "/logout",
    component: LogoutPage,
    exact: true,
  }, {
    path: "/survey/create",
    component: SurveyCreatePage,
    exact: true,
  }, {
    path: "/survey/:id(\\d+)",
    component: SurveyPage,
    exact: true,
  }, {
    path: "/survey/:id/update",
    component: SurveyUpdatePage,
    exact: true,
  }],
}];
