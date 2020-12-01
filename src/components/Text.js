import styled from "styled-components";

const sizes = {
  xxs: `
    font-size: 12px !important;
    line-height: 20px;
  `,
  xs: `
    font-size: 14px !important;
    line-height: 22px;
  `,
  s: `
    font-size: 16px !important;
    line-height: 24px;
  `,
  m: `
    font-size: 20px !important;
    line-height: 28px;
  `,
  l: `
    font-size: 24px !important;
    line-height: 32px;
  `,
  xl: `
    font-size: 30px !important;
    line-height: 38px;
  `,
  xxl: `
    font-size: 58px !important;
    line-height: 66px;
  `,
};

export default styled.div`
  ${props => (props.color && `color: ${props.color};`)}
  ${props => (props.bold && "font-weight: 800;")}

  ${props => sizes[props.size || "xs"]};
`;
