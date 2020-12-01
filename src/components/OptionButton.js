import React from "react";
import styled from "styled-components";
import {Progress} from "antd";
import {CheckCircleTwoTone, BorderOutlined} from "@ant-design/icons";

import Text from "./Text";

export default ({
  option,
  totalAnswers,
  audienceAnswer,
  onClick,
}) => {
  const percentage = ((option.Answers.length / totalAnswers) * 100).toFixed(0);
  const isOptionAnswer = audienceAnswer && audienceAnswer.OptionId === option.id;
  return (
    <OptionButton
      onClick={onClick}
      disabled={audienceAnswer}
      className="flex-h flex-center"
    >
      <OptionIcon size="m" className="mr20 flex-v" color="gray">
        {audienceAnswer ? (
          <div className="flex-v text-right">
            <Text bold>{`${percentage}%`}</Text>
            <Text>{isOptionAnswer ? <CheckCircleTwoTone twoToneColor="#52c41a" /> : "　"}</Text>
          </div>
        ) : (
          <BorderOutlined style={{color: "#ddd"}} />
        )}
      </OptionIcon>
      <div className="flex-1 text-left">
        <Text>{option.title}</Text>
        {audienceAnswer && (
          <div className="flex-h">
            <div className="flex-1"><Progress percent={percentage} showInfo={false} /></div>
          </div>
        )}
      </div>
    </OptionButton>
  );
};

const OptionButton = styled.button`
  width: 100%;
  background: white;
  outline: none;
  border: 0;
  padding: 10px 20px;
  border-bottom: 1px solid #ddd;
  min-height: 60px;

  &:enabled {
    &:hover {
      background: #f9f9f9;
      cursor: pointer;
    }
  }

  &:last-child {
    border-bottom: 0;
  }
`;

const OptionIcon = styled.div`
  width: 40px;
  text-align: center;
`;
