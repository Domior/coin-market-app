import React from 'react';
import { Button, Card, Form, Input, Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { AuthService } from '../services/AuthService';
import { SessionStorageService } from '../services/SessionStorageService';
import { AUTH_LINKS, APP_LINKS } from '../constants/links';
import { ACCESS_TOKEN_KEY } from '../constants/storage';
import { EMAIL_RULES, PASSWORD_RULES } from '../constants/validations';
import { getErrorMessage } from '../helpers/getErrorMessage';

const { Title } = Typography;

const LogIn = () => {
  const navigate = useNavigate();

  const onSubmit = async values => {
    const { email, password } = values;
    try {
      const {
        data: { message, token },
      } = await AuthService.logIn({
        email,
        password,
      });

      SessionStorageService.setItem(ACCESS_TOKEN_KEY, token);
      toast.success(message);
      navigate(APP_LINKS.DASHBOARD);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <Card style={{ width: 500 }}>
      <Title className="text-center">Log in</Title>
      <Form
        name="login"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        className="mt-10 border"
        onFinish={onSubmit}
        autoComplete="off"
      >
        <Form.Item label="Email" name="email" rules={EMAIL_RULES}>
          <Input />
        </Form.Item>

        <Form.Item label="Password" name="password" rules={PASSWORD_RULES}>
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 9,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit" className="w-[120px]">
            Submit
          </Button>
        </Form.Item>
        <Link to={AUTH_LINKS.SIGNUP} className="w-full inline-block text-center underline">
          Don't have an account? Sign up
        </Link>
      </Form>
    </Card>
  );
};

export default LogIn;
