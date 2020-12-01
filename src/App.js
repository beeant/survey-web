import React from 'react';
import Helmet from "react-helmet";

import {Layout, ConfigProvider} from "antd";
import enUS from 'antd/lib/locale-provider/en_US';
import {Switch } from 'react-router-dom';

import GlobalStyle from "./styles/GlobalStyle";

import {
  RouteWithSubRoutes,
} from "./lib/helpers";
import routes from "./routes";

export default () => (
  <ConfigProvider locale={enUS}>
    <GlobalStyle />
    <Layout className="App">
      <Helmet
        defaultTitle="Survey"
        titleTemplate="%s - Survey"
      />
      {routes.map((route, i) => (
        <Switch key={i}>
          <RouteWithSubRoutes
            key={i}
            {...route}
          />
        </Switch>
      ))}
    </Layout>
  </ConfigProvider>
);
