import React from 'react';
import { useParams } from 'react-router-dom';
import { LeftOutlined } from '@ant-design/icons';

import { Button } from 'antd';

import Chart from '../components/Chart';
import CoinInfo from '../components/CoinInfo';

import { useGoBack } from '../hooks/useGoBack';

const CoinDetails = () => {
  const { id } = useParams();

  const { goBack } = useGoBack();

  return (
    <div className="w-full p-8">
      <Button type="link" onClick={goBack} icon={<LeftOutlined />}>
        Back to Dashboard
      </Button>

      <CoinInfo id={id} />

      <Chart />
    </div>
  );
};

export default CoinDetails;
