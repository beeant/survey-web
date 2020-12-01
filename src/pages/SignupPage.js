import React from 'react';
import Helmet from "react-helmet";

import {Content, AuthBox} from "../components/Layout";
import SignupForm from "../components/SignupForm";

export default () => (
  <Content className="mt130">
    <Helmet title="Sign up" />
    <AuthBox>
      <SignupForm />
    </AuthBox>
  </Content>
);
