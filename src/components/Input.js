import styled from "styled-components";
import {Input, Select as AntSelect} from "antd";

const style = props => `
  font-family: ${props.theme.fontFamily};
  font-size: 15px;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.15), inset 0 1px 0 0 rgba(0, 0, 0, 0.08);
  background-color: rgba(255, 255, 255, 0.7) !important;
  transition: none;
  border: 1px solid transparent !important;
  padding: 7px 14px !important;
  &:focus {
    box-shadow: inset 0 0 0 1px #5426ff, inset 0 1px 0 0 #5426ff !important;
  }

  &:focus-within {
    outline: none;
    box-shadow: inset 0 0 0 1px #5426ff, inset 0 1px 0 0 #5426ff !important;
  }

  .has-error {
    border: 1px solid #f5222d !important;
  }

  input {
    outline: none !important;
  }

`;

const StyledInput = styled(Input)`
  ${props => style(props)}
`;

StyledInput.Password = styled(Input.Password)`
  ${props => style(props)}
`;

export default StyledInput;

export const StyledSelect = styled(AntSelect).attrs({
  getPopupContainer: trigger => trigger.parentNode,
})`
  ${props => style(props)}
  & {
    padding: 0 !important;
    border: 0;
  }
  .ant-select-selector {
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.15), inset 0 1px 0 0 rgba(0, 0, 0, 0.08);
    border: 0 !important;
    min-height: 37px !important;
    height: auto !important;
  }
  &.ant-select-focused {
    .ant-select-selector {
      box-shadow: inset 0 0 0 1px #5426ff, inset 0 1px 0 0 #5426ff !important;
    }
  }

  &.ant-select-multiple {
    .ant-select-selection-item {
      line-height: 20px !important;
    }
  }
  .tag {
    border: 1px solid #333;
    padding: 3px 5px;
  }
`;

export const Select = StyledSelect;
Select.Option = StyledSelect.Option;
