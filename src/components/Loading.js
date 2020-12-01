import React from "react";
import styled from "styled-components";
import {LoadingOutlined} from "@ant-design/icons";

import Text from "./Text";

export default () => (
  <LoadingWrapper className="flex-v flex-center p15">
    <Text size="xl"><LoadingOutlined /></Text>
  </LoadingWrapper>
);

const LoadingWrapper = styled.div`
  text-align: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.5);
`;
