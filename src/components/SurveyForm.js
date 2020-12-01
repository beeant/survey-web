import React, {useRef, useState} from 'react';
import {useDispatch} from "react-redux";
import {Row, Col, message} from "antd";

import Form from "./Form";
import Button from "./Button";
import Input from "./Input";
import {history} from "../store/configureStore";

import {fillField, formHasError} from "../lib/helpers";
import * as SurveyActions from "../actions/SurveyActions";

export default ({
  initialValues,
}) => {
  const dispatch = useDispatch();
  const [submitting, setSubmitting] = useState(0);
  const formRef = useRef();
  const handleSubmit = async () => {
    const {
      validateFields,
    } = formRef.current;
    setSubmitting(1);
    try {
      const values = await validateFields();
      await (values.id ? (
        dispatch(SurveyActions.putSurvey({
          id: values.id,
          title: values.title,
          Options: values.Options.map((Option) => ({
            id: Option.id,
            title: Option.title,
          })),
        }, values.id))
      ) : (
        dispatch(SurveyActions.postSurvey(values))
      ));
      setSubmitting(0);

      if (initialValues && initialValues.id) {
        message.success("Survey has been updated");
      } else {
        message.success("New survey has been created");
      }
      history.push("/");
    } catch (err) {
      setSubmitting(0);
    }
  };

  return (
    <Form onFinish={handleSubmit} ref={formRef} initialValues={initialValues}>
      <Row type="flex">
        <Col xs={24} sm={24} className="pb50 pt20">
          <div>
            <Form.Item noStyle name="id">
              <Input type="hidden" />
            </Form.Item>

            <Form.Item
              {...fillField}
              name="title"
              label="QUESTION"
              rules={[{
                required: true,
                message: "QUESTION is required",
              }]}
            >
              <Input
                className="fill"
                autoCorrect="off"
                autoCapitalize="none"
              />
            </Form.Item>
            <Form.List
              name="Options"
              rules={[{
                required: true,
                message: "OPTIONS is required",
              }]}
            >
              {(fields, { add }, { errors }) => (
                <>
                  {fields.map((field, index) => (
                    <Form.Item
                      {...fillField}
                      key={index}
                      name={[field.key, "title"]}
                      label={(
                        <div className="flex-h">
                          <div className="flex-1">{`OPTION ${index + 1}`}</div>
                          <div>
                            <Button
                              htmlType="button"
                              size="xs"
                              onClick={() => {
                                const {
                                  current: {
                                    getFieldsValue,
                                    setFieldsValue,
                                  },
                                } = formRef;
                                const Options = getFieldsValue().Options || [];
                                Options.splice(index, 1);
                                setFieldsValue({Options});
                              }}
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                      )}
                      rules={[{
                        required: true,
                        message: "OPTION is required",
                      }]}
                    >
                      <Input
                        className="fill"
                        autoCorrect="off"
                        autoCapitalize="none"
                      />
                    </Form.Item>
                  ))}
                  <div className="text-center mt10">
                    <Button
                      size="s"
                      htmlType="button"
                      onClick={() => {
                        add();
                      }}
                    >
                      Add Option
                    </Button>
                  </div>
                  <Form.ErrorList errors={errors} />
                </>
              )}
            </Form.List>
          </div>

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
                {initialValues && initialValues.id ? "Update Survey" : "Create Survey"}
              </Button>
            )}
          </Form.Item>

        </Col>
      </Row>
    </Form>
  );
};
