import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Typography, Avatar, Table } from 'antd';

import Loader from '../components/Loader';

import { CoinsService } from '../services/CoinsService';
import { formatNumber } from '../helpers/formatNumber';
import { stringSort } from '../helpers/stringSort';
import { numberSort } from '../helpers/numberSort';
import { APP_LINKS } from '../constants/links';

const { Text } = Typography;

const REQUEST_INTERVAL = 45000; // 45 seconds

const Dashboard = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const [coins, setCoins] = useState([]);

  const getCoinsList = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await CoinsService.getCoins();

      setCoins(data);
    } catch (error) {
      toast.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getCoinsList();

    const interval = setInterval(() => {
      getCoinsList();
    }, REQUEST_INTERVAL);

    return () => {
      clearInterval(interval);
    };
  }, [getCoinsList]);

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  const columns = [
    {
      title: '#',
      width: '5%',
      dataIndex: 'market_cap_rank',
    },
    {
      title: 'Coin',
      width: '15%',
      render: ({ image, name }) => (
        <div className="flex items-center">
          <Avatar src={image} />
          <Text className="ms-2" strong>
            {name}
          </Text>
        </div>
      ),
      sorter: (a, b) => stringSort(a, b, 'name'),
    },
    {
      title: 'Price',
      width: '15%',
      render: ({ current_price }) => <>${formatNumber(current_price)}</>,
      sorter: (a, b) => numberSort(a, b, 'current_price'),
    },
    {
      title: '24h Volume',
      width: '15%',
      render: ({ total_volume }) => <>${formatNumber(total_volume)}</>,
      sorter: (a, b) => numberSort(a, b, 'total_volume'),
    },
    {
      title: 'Market Cap',
      width: '15%',
      render: ({ market_cap }) => <>${formatNumber(market_cap)}</>,
      sorter: (a, b) => numberSort(a, b, 'market_cap'),
    },
  ];

  const handleRowClick = ({ id }) => navigate(`${APP_LINKS.COIN}/${id}`);

  if (isLoading) return <Loader />;

  return (
    <div className="w-full max-w-7xl pt-8">
      <Table
        rowKey="id"
        rowClassName="cursor-pointer"
        columns={columns}
        dataSource={coins}
        onChange={onChange}
        onRow={record => ({
          onClick: () => handleRowClick(record),
        })}
      />
    </div>
  );
};

export default Dashboard;
