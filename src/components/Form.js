import {Form as AntForm} from "antd";
import styled from "styled-components";

const Form = AntForm;

Form.Item = styled(AntForm.Item)`
  .ant-form-item-label, label {
    display: block;
    line-height: 14px !important;
    height: auto !important;
    font-family: ${props => props.theme.fontFamily};
    font-size: 12px;
    font-weight: 600 !important;
    color: #333;
    padding-bottom: 0;
    margin-bottom: 2px;
    text-align: left;
  }
  .ant-form-item-required {
    &:before, &:after {
      content: none;
    }
  }
`;

export default Form;
