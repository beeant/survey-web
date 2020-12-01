import React, {useRef, useState, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Form} from "antd";

import Button from "./Button";
import {Select} from "./Input";

import * as AudienceActions from "../actions/AudienceActions";

import {fillField, formHasError} from "../lib/helpers";

export default ({
  questionId,
  initialValues,
  onCancel,
}) => {
  const dispatch = useDispatch();
  const [submitting, setSubmitting] = useState(0);
  const getAudienceList = useSelector(state => state.audience.get("getAudienceList"));
  const formRef = useRef();

  const handleSubmit = () => {
    const {
      validateFields,
    } = formRef.current;

    setSubmitting(1);
    validateFields().then(async (values) => {
      await dispatch(AudienceActions.postAudienceInvite({
        ...values,
        questionId,
      }));
      setSubmitting(0);
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

  const getAudiences = async () => {
    await dispatch(AudienceActions.getAudienceList());
  };

  useEffect(async () => {
    getAudiences();
  }, []);

  const audiences = getAudienceList.toIndexedSeq().toArray();

  return (
    <Form
      onFinish={handleSubmit}
      ref={formRef}
      initialValues={initialValues}
    >
      <div xs={24} sm={24} className="pb30 pt20">
        <Form.Item
          {...fillField}
          name="emails"
          label="EMAIL ADDRESSES"
        >
          <Select
            mode="tags"
            placeholder="Please select"
          >
            {audiences.map((audience) => (
              <Select.Option key={audience.email}>{audience.email}</Select.Option>
            ))}
          </Select>
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
                  Invite
                </Button>
              </div>
            )}
          </Form.Item>
        </div>
      </div>
    </Form>
  );
};
