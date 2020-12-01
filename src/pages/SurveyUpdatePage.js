import React, {useEffect} from 'react';
import Helmet from "react-helmet";
import {useDispatch, useSelector} from "react-redux";

import {Content, AuthBox} from "../components/Layout";
import SurveyForm from "../components/SurveyForm";
import Text from "../components/Text";

import Loading from "../components/Loading";
import * as SurveyActions from "../actions/SurveyActions";

export default ({
  match: {
    params: {
      id,
    },
  },
}) => {
  const dispatch = useDispatch();
  const survey = useSelector(state => state.survey.get("getListSurvey").get(Number(id)));

  useEffect(() => {
    dispatch(SurveyActions.getSurvey(id));
  }, []);

  return (
    <Content className="mt130">
      <Helmet title="Update Survey" />
      <AuthBox>
        {survey ? (
          <>
            <Text size="l" className="mb30">Update Survey</Text>
            <SurveyForm initialValues={survey} />
          </>
        ) : (
          <Loading />
        )}
      </AuthBox>
    </Content>
  );
};
