import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {ProfileOutlined} from '@ant-design/icons';
import {Pagination} from "antd";

import * as SurveyActions from "../actions/SurveyActions";
import {history} from "../store/configureStore";

import Survey from "./Survey";
import Text from "./Text";

export default ({
  page = 1,
  limit = 20,
}) => {
  const dispatch = useDispatch();
  const getListSurvey = useSelector(state => state.survey.get("getListSurvey"));
  const surveyPagination = useSelector(state => state.survey.get("surveyPagination"));

  useEffect(() => {
    dispatch(SurveyActions.getSurveyList({page, limit}));
  }, [page, limit]);

  const surveys = getListSurvey.toIndexedSeq().toArray();
  return (
    <div>
      {!surveys.length && (
        <Text size="xxl" color="gray" className="text-center mt30">
          <div><ProfileOutlined /></div>
          <Text size="xs">Survey list is empty, please add some new surveys</Text>
        </Text>
      )}
      {surveys.map((survey) => (
        <Survey survey={survey} key={survey.id} />
      ))}
      {surveyPagination.total > limit && (
        <Pagination
          defaultCurrent={page}
          pageSize={limit}
          onChange={(page, limit) => history.push(`/?page=${page}&limit=${limit}`)}
          total={surveyPagination.total}
        />
      )}
    </div>
  );
};
