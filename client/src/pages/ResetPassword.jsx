import React, { useState } from 'react';
import { Button, Card, Form, Input, Typography } from 'antd';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { AuthService } from '../services/AuthService';
import { AUTH_LINKS } from '../constants/links';
import { PASSWORD_RULES } from '../constants/validations';
import { getErrorMessage } from '../helpers/getErrorMessage';
import { useQuery } from '../hooks/useQuery';
import { TOKEN_QUERY_KEY } from '../constants/query';

const { Title } = Typography;

const ResetPassword = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const query = useQuery();
  const token = query.get(TOKEN_QUERY_KEY);

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async values => {
    const { password } = values;
    try {
      setIsLoading(true);

      const {
        data: { message },
      } = await AuthService.resetPassword({
        id,
        token,
        password,
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
      <Title className="text-center">Reset password</Title>
      <Form
        name="reset-password"
        labelCol={{
          span: 7,
        }}
        wrapperCol={{
          span: 16,
        }}
        className="mt-10 border"
        onFinish={onSubmit}
        autoComplete="off"
      >
        <Form.Item label="New password" name="password" rules={PASSWORD_RULES}>
          <Input.Password placeholder="Enter password" />
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

export default ResetPassword;
