import React, {useEffect} from "react";
import Helmet from "react-helmet";
import {useDispatch} from "react-redux";

import {Content} from "../components/Layout";
import * as AuthActions from "../actions/AuthActions";
import {history} from "../store/configureStore";

export default () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(AuthActions.postLogout());
    history.push("/");
  });

  return (
    <Content>
      <Helmet title="Logout" />
      <div>Logging out</div>
    </Content>
  );
};
