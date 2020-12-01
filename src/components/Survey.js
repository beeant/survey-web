import React, {useState} from 'react';
import styled from "styled-components";
import {Modal} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {ExclamationCircleOutlined} from "@ant-design/icons";

import Text from "./Text";
import Loading from "./Loading";
import Button from "./Button";
import AudienceForm from "./AudienceForm";
import SurveyInviteForm from "./SurveyInviteForm";
import OptionButton from "./OptionButton";

import * as AudienceActions from "../actions/AudienceActions";
import {history} from "../store/configureStore";
import * as SurveyActions from "../actions/SurveyActions";

export default ({
  survey,
}) => {
  const dispatch = useDispatch();
  const [submitting, setSubmitting] = useState(false);
  const [modal, setModal] = useState(false);
  const [inviteModal, setInviteModal] = useState(false);
  const getMe = useSelector(state => state.auth.get("getMe"));

  const handleClick = async (option) => {
    setSubmitting(true);
    const {name, email} = AudienceActions.getAudience();
    const values = {OptionId: option.id, email, name};
    if (!name || !email) {
      setModal(values);
    } else {
      await dispatch(AudienceActions.postAudience(values));
      await dispatch(SurveyActions.getSurvey(survey.id));
      AudienceActions.setAudience(values);
    }
    setSubmitting(false);
  };

  const {email} = AudienceActions.getAudience();
  let audienceAnswer;
  const totalAnswers = survey.Options.reduce((acc, Option) => {
    if (!audienceAnswer) {
      audienceAnswer = Option.Answers.find((answer) => answer.Audience.email === email);
    }
    return acc + Option.Answers.length;
  }, 0);

  const remove = () => {
    Modal.confirm({
      title: 'Do you want to delete these items?',
      icon: <ExclamationCircleOutlined />,
      onOk: async () => {
        await dispatch(SurveyActions.deleteSurvey(survey.id));
      },
      onCancel() {
      },
    });
  };

  return (
    <SurveyWrapper>
      {submitting && <Loading />}
      <Question className="flex-h flex-center">
        <Text size="m" className="flex-1">{survey.title}</Text>
      </Question>
      <Modal
        onCancel={() => setModal(false)}
        title="Enter your name and email to participate"
        visible={modal}
        footer={false}
      >
        {modal && (
          <AudienceForm
            initialValues={modal}
            questionId={survey.id}
            onCancel={() => setModal(false)}
          />
        )}
      </Modal>
      <Modal
        onCancel={() => setModal(false)}
        title="Invite by email"
        visible={inviteModal}
        footer={false}
      >
        {inviteModal && (
          <SurveyInviteForm
            initialValues={inviteModal}
            questionId={survey.id}
            onCancel={() => setInviteModal(false)}
          />
        )}
      </Modal>

      {survey.Options.map((option) => (
        <OptionButton
          option={option}
          totalAnswers={totalAnswers}
          audienceAnswer={audienceAnswer}
          onClick={() => {
            handleClick(option);
          }}
          key={option.id}
        />
      ))}
      {(audienceAnswer || getMe) && (
        <div className="ph30 pv10 text-center flex-h">
          {audienceAnswer && (<Text className="mr5" color="gray">{`${totalAnswers} answers`}</Text>)}
          {getMe && (
            <div className="flex-h flex-end flex-1">
              <div className="mr5">
                <Button
                  size="s"
                  onClick={() => history.push(`/survey/${survey.id}`)}
                >
                  Details
                </Button>
              </div>
              <div className="mr5">
                <Button
                  size="s"
                  onClick={() => history.push(`/survey/${survey.id}/update`)}
                >
                  Edit
                </Button>
              </div>
              <div>
                <Button
                  size="s"
                  onClick={remove}
                >
                  Delete
                </Button>
              </div>
              <div>
                <Button
                  size="s"
                  onClick={() => setInviteModal(true)}
                >
                  Dispatch by Email
                </Button>
              </div>

            </div>
          )}
        </div>
      )}
    </SurveyWrapper>
  );
};

const SurveyWrapper = styled.div`
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  background: ${props => props.theme.boxBgColor};
  border-radius: 3px;
  margin-bottom: 30px;
  position: relative;
`;

const Question = styled.div`
  border-bottom: 1px solid #ccc;
  padding: 20px 20px;
`;
