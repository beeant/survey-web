// @flow

import React from 'react';
import styled from "styled-components";
import {Switch} from "react-router-dom";
import {Layout} from "antd";

import {history} from "../store/configureStore";
import Header from "../components/Header";
import {RouteWithSubRoutes} from "../lib/helpers";
import ScrollTop from "../components/ScrollTop";

export default ({
  routes,
}) => (
  <>
    <ScrollTop />
    <Header history={history} />
    <MainContent>
      {routes.map((route, i) => route.component && (
        <Switch key={i}>
          <RouteWithSubRoutes {...route} />
        </Switch>
      ))}
    </MainContent>
  </>
);

const MainContent = styled(Layout)`
  margin: 0;
  min-height: 100vh;
  background: transparent !important;
`;
