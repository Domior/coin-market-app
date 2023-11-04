import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Button, Modal } from 'antd';
import { toast } from 'react-toastify';

import { AuthService } from '../services/AuthService';
import { SessionStorageService } from '../services/SessionStorageService';
import { AUTH_LINKS } from '../constants/links';
import { ACCESS_TOKEN_KEY } from '../constants/storage';
import { getErrorMessage } from '../helpers/getErrorMessage';

const { Title, Text } = Typography;

const Header = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleLogOut = async () => {
    try {
      const {
        data: { message },
      } = await AuthService.logOut();

      toast.success(message);
      SessionStorageService.removeItem(ACCESS_TOKEN_KEY);
      navigate(AUTH_LINKS.LOGIN);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      toggleModal();
    }
  };

  return (
    <div className="px-8 py-4 w-full flex items-center justify-center shadow">
      <Title level={2} className="text-center !mb-0 mx-auto">
        Coin market app
      </Title>
      <Button onClick={toggleModal}>Log out</Button>
      <Modal title={<Title level={4}>Log out</Title>} okText="Yes" open={isModalOpen} onOk={handleLogOut} onCancel={toggleModal}>
        <Text>Are you sure you want to log out?</Text>
      </Modal>
    </div>
  );
};

export default Header;
