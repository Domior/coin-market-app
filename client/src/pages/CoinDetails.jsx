import React from 'react';
import { useParams } from 'react-router-dom';
import { LeftOutlined } from '@ant-design/icons';
import { Button } from 'antd';

import { useGoBack } from '../hooks/useGoBack';

const CoinDetails = () => {
  const { id } = useParams();

  const { goBack } = useGoBack();

  return (
    <div className="w-full p-5">
      <Button type="link" onClick={goBack} icon={<LeftOutlined />}>
        Back to Dashboard
      </Button>

      <p className="text-center">CoinDetails - {id}</p>
    </div>
  );
};

export default CoinDetails;
