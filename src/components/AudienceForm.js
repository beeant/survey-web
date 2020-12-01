import React, {useRef, useState} from 'react';
import {useDispatch} from "react-redux";
import {Form} from "antd";

import Button from "./Button";
import Input from "./Input";

import * as AudienceActions from "../actions/AudienceActions";
import * as SurveyActions from "../actions/SurveyActions";

import {fillField, formHasError} from "../lib/helpers";

export default ({
  initialValues,
  questionId,
  onCancel,
}) => {
  const dispatch = useDispatch();
  const [submitting, setSubmitting] = useState(0);
  const formRef = useRef();

  const handleSubmit = () => {
    const {
      validateFields,
    } = formRef.current;

    setSubmitting(1);
    validateFields().then(async (values) => {
      await dispatch(AudienceActions.postAudience(values));
      setSubmitting(0);
      await dispatch(SurveyActions.getSurvey(questionId));
      AudienceActions.setAudience(values);
      if (onCancel) {
        onCancel();
      }
    }).catch(() => {
      setSubmitting(0);
      if (onCancel) {
        onCancel();
      }
    });
  };

  return (
    <Form
      onFinish={handleSubmit}
      ref={formRef}
      initialValues={initialValues}
    >
      <div xs={24} sm={24} className="pb30 pt20">
        <Form.Item
          noStyle
          name="OptionId"
          rules={[{
            required: true,
            message: "OptionId is required",
          }]}
        >
          <Input type="hidden" />
        </Form.Item>

        <Form.Item
          {...fillField}
          name="name"
          label="NAME"
          rules={[{
            required: true,
            message: "NAME is required",
          }]}
        >
          <Input
            autoCorrect="off"
            autoCapitalize="none"
            autoComplete={1}
            className="fill"
          />
        </Form.Item>
        <Form.Item
          {...fillField}
          name="email"
          label="EMAIL"
          rules={[{
            type: "email",
            required: true,
            message: "EMAIL is required",
          }]}
        >
          <Input
            inputMode="email"
            autoCorrect="off"
            autoCapitalize="none"
            autoComplete={1}
            type="email"
            className="fill"
          />
        </Form.Item>

        <div className="text-center">
          <Form.Item noStyle shouldUpdate={() => true}>
            {({getFieldsError}) => (
              <div>
                <Button
                  background="primary"
                  disabled={submitting || formHasError(getFieldsError())}
                  loading={submitting}
                  type="primary"
                  htmlType="submit"
                  className="fill"
                  width="220px"
                  bold
                >
                  Submit
                </Button>
              </div>
            )}
          </Form.Item>
        </div>
      </div>
    </Form>
  );
};
