import React, { useState } from 'react';
import { Button, Card, Form, Input, Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { AuthService } from '../services/AuthService';
import { AUTH_LINKS } from '../constants/links';
import { EMAIL_RULES } from '../constants/validations';
import { getErrorMessage } from '../helpers/getErrorMessage';

const { Title } = Typography;

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async values => {
    const { email } = values;
    try {
      setIsLoading(true);

      const {
        data: { message },
      } = await AuthService.forgotPassword({
        email,
      });

      toast.success(message);
      navigate(AUTH_LINKS.LOGIN);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card style={{ width: 500 }}>
      <Title className="text-center">Forgot password</Title>
      <Form
        name="forgot-password"
        labelCol={{
          span: 5,
        }}
        wrapperCol={{
          span: 16,
        }}
        className="mt-10 border"
        onFinish={onSubmit}
        autoComplete="off"
      >
        <Form.Item label="Email" name="email" rules={EMAIL_RULES}>
          <Input placeholder="Enter email" />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 9,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit" className="w-[120px]" loading={isLoading}>
            Submit
          </Button>
        </Form.Item>
        <Link to={AUTH_LINKS.LOGIN} className="w-full inline-block text-center underline">
          Back to login
        </Link>
      </Form>
    </Card>
  );
};

export default ForgotPassword;
