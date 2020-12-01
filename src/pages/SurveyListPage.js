import React from 'react';
import Helmet from "react-helmet";

import {Content} from "../components/Layout";
import SurveyList from "../components/SurveyList";
import {getQuery} from "../lib/helpers";
import {history} from "../store/configureStore";

export default () => {
  const query = getQuery(history.location);
  const {
    limit,
    page = 1,
  } = query;

  return (
    <Content className="mt130">
      <Helmet title="Surveys" />
      <SurveyList
        limit={limit}
        page={page}
      />
    </Content>
  );
};
