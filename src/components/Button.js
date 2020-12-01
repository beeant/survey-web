import React from "react";
import styled from "styled-components";
import {LoadingOutlined} from "@ant-design/icons";

export default ({
  className,
  htmlType,
  children,
  loading,
  ...props
}) => (
  <StyledButton
    {...props}
    loading={loading}
    type={htmlType}
    className={className}
  >
    <div className="flex-h flex-center">
      {!!loading && (<div className="flex-v mr5"><LoadingOutlined /></div>)}
      <div>{children}</div>
    </div>
  </StyledButton>
);

const StyledButton = styled.button`
  font-family: ${props => props.theme.fontFamily} !important;
  display: inline-block;
  border: 0;
  font-style: normal;
  font-weight: 600;
  outline: none;
  cursor: pointer;
  white-space: nowrap;
  border-radius: 5px;

  color: white !important;
  background-color: rgb(84, 105, 212);
  &:hover {
    transition: all 0.1s; 
    box-shadow: 0px 0px 5px rgb(84, 105, 212);
  }

  &:active {
    opacity: 0.8;
  }

  ${props => !!props.disabled && `
    opacity: 0.5;
  `}

  ${props => ({
    m: `
      font-size: 16px;
      line-height: 24px;
      padding: 10px 16px;
    `,
    s: `
      font-size: 12px;
      line-height: 14px;
      padding: 4px 9px;
    `,
    xs: `
      font-size: 10px;
      line-height: 12px;
      padding: 2px 9px;
    `,

    default: `
      padding: 7px 15px;
      font-size: 14px;
      line-height: 24px !important;
    `,
  })[props.size || "default"]}
`;
