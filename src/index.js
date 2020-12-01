import React from 'react';
import ReactDOM from 'react-dom';
import { ConnectedRouter } from 'connected-react-router';
import {Provider} from "react-redux";
import {ThemeProvider} from "styled-components";

import 'antd/dist/antd.css';

import App from './App';
import configureStore, {history} from "./store/configureStore";
import routes from "./routes";
import theme from "./styles/theme";

const store = configureStore();

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App routes={routes} />
      </ConnectedRouter>
    </Provider>
  </ThemeProvider>,
  (document.getElementById('root'): any),
);
