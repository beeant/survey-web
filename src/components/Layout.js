import styled from "styled-components";

import {media} from "../lib/helpers";

export const Content = styled.div`
  z-index: 1;
  max-width: ${props => props.theme.contentWidth}px;
  width: 100%;
  margin: calc(20px + ${props => props.theme.headerHeight}) auto 0 auto;
  padding: 0;

  ${media.md`
    padding: 0 10px;
  `}
`;

export const AuthBox = styled.div`
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  padding: 30px;
  background: ${props => props.theme.boxBgColor};
  border-radius: 8px;
  max-width: 450px;
  margin: 10px auto;
`;
