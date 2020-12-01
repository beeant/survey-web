import React from 'react';
import Helmet from "react-helmet";

import {Content, AuthBox} from "../components/Layout";
import SigninForm from "../components/SigninForm";

export default () => (
  <Content className="mt130">
    <Helmet title="Sign in" />
    <AuthBox>
      <SigninForm />
    </AuthBox>
  </Content>
);
