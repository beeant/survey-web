import React, {useRef, useState} from 'react';
import {useDispatch} from "react-redux";
import {Row, Col} from "antd";
import {Link} from "react-router-dom";

import Form from "./Form";
import Button from "./Button";
import Input from "./Input";
import Text from "./Text";

import {fillField, formHasError} from "../lib/helpers";
import * as AuthActions from "../actions/AuthActions";

export default () => {
  const dispatch = useDispatch();
  const [submitting, setSubmitting] = useState(0);
  const [success, setSuccess] = useState(0);
  const formRef = useRef();
  const handleSubmit = async () => {
    const {
      validateFields,
      setFields,
    } = formRef.current;
    setSubmitting(1);
    try {
      const values = await validateFields();
      const result = await dispatch(AuthActions.postSignup(values));
      setSubmitting(0);

      if (result.error) {
        const errors = [];
        Object.keys(result.meta).forEach((key) => {
          errors.push({
            value: values[key],
            errors: [result.meta[key]],
            name: key,
          });
        });
        setFields(errors);
      }
      if (result.success) {
        setSuccess(1);
      }
    } catch (err) {
      setSubmitting(0);
    }
  };

  if (success) {
    return (
      <div>
        <Text size="l" className="mb30">Thank you for signing up!</Text>
        <Text className="mb30">You can now sign in.</Text>
        <Button as={Link} className="fill" to="/signin">Sign in</Button>
      </div>
    );
  }

  return (
    <Form onFinish={handleSubmit} ref={formRef}>
      <Row type="flex">
        <Col xs={24} className="mb30">
          <Text size="l">Sign up</Text>
        </Col>

        <Col xs={24} sm={24} className="pb50 pt20">
          <div>
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
                className="fill"
                inputMode="email"
                autoCorrect="off"
                autoCapitalize="none"
                autoComplete="username"
              />
            </Form.Item>
            <Form.Item
              {...fillField}
              name="password"
              label="PASSWORD"
              rules={[{
                required: true,
                message: "PASSWORD is required",
              }]}
            >
              <Input.Password autoComplete="new-password" className="fill" />
            </Form.Item>

            <Form.Item
              {...fillField}
              name="password_confirmation"
              label="PASSWORD CONFIRMATION"
              dependencies={['password']}
              rules={[{
                required: true,
                message: "PASSWORD CONFIRMATION is required",
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("PASSWORD CONFIRMATION does not match"),
                  );
                },
              })]}
            >
              <Input.Password autoComplete="new-password" className="fill" />
            </Form.Item>
            <Form.Item noStyle shouldUpdate={() => true}>
              {({getFieldsError}) => (
                <Button
                  background="primary"
                  type="primary"
                  htmlType="submit"
                  className="fill text-center mt20"
                  loading={submitting}
                  disabled={submitting || formHasError(getFieldsError())}
                  bold
                >
                  Sign up
                </Button>
              )}
            </Form.Item>
          </div>
        </Col>
      </Row>
    </Form>
  );
};
