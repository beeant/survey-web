import React from 'react';
import Helmet from "react-helmet";

import {Content, AuthBox} from "../components/Layout";
import SurveyForm from "../components/SurveyForm";
import Text from "../components/Text";

export default () => (
  <Content className="mt130">
    <Helmet title="Create Survey" />
    <AuthBox>
      <Text size="l" className="mb30">Create Survey</Text>
      <SurveyForm />
    </AuthBox>
  </Content>
);
