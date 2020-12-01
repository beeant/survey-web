import React, {useRef, useState} from 'react';
import {useDispatch} from "react-redux";
import {Form, Row, Col} from "antd";

import Button from "./Button";
import Input from "./Input";
import Text from "./Text";

import {fillField, formHasError} from "../lib/helpers";
import {history} from "../store/configureStore";
import * as AuthActions from "../actions/AuthActions";

export default () => {
  const dispatch = useDispatch();
  const [submitting, setSubmitting] = useState(false);
  const formRef = useRef();

  const handleSubmit = () => {
    const {
      validateFields,
    } = formRef.current;

    setSubmitting(true);
    validateFields().then(async (values) => {
      await dispatch(AuthActions.postSignin(values));
      setSubmitting(false);

      dispatch(AuthActions.getMe());
      history.push("/");
    }).catch(() => {
      setSubmitting(false);
    });
  };

  return (
    <Form onFinish={handleSubmit} ref={formRef}>
      <Row type="flex">
        <Col xs={24} className="mb30">
          <Text size="l">Sign in</Text>
        </Col>
        <Col xs={24} sm={24} className="pb30 pt20">
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
              autoComplete="new-password"
              type="email"
              className="fill"
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
            className="fill"
          >
            <Input.Password
              autoComplete="new-password"
              type="password"
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
                    loading={submitting ? 1 : 0}
                    type="primary"
                    htmlType="submit"
                    className="fill"
                    width="220px"
                    bold
                  >
                    Sign in
                  </Button>
                </div>
              )}
            </Form.Item>
          </div>
        </Col>
      </Row>
    </Form>
  );
};
