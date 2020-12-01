import React, {useEffect} from "react";
import Helmet from "react-helmet";
import {useDispatch, useSelector} from "react-redux";

import {Content} from "../components/Layout";
import Loading from "../components/Loading";
import Survey from "../components/Survey";
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
      {survey && <Helmet title={survey.title} />}
      {survey ? <Survey survey={survey} /> : <Loading />}
    </Content>
  );
};
