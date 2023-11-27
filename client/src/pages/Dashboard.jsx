import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import { Table } from 'antd';

import Loader from '../components/Loader';

import { CoinsService } from '../services/CoinsService';
import { useDefaultTable } from '../hooks/useDefaultTable';
import { getErrorMessage } from '../helpers/getErrorMessage';

const REQUEST_INTERVAL = 45000; // 45 seconds

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isFavoriting, setIsFavoriting] = useState(false);

  const [coins, setCoins] = useState([]);

  const handleFavoriteToggle = useCallback(async ({ id, isFavorite }) => {
    setIsFavoriting(true);
    try {
      const { coinId } = await CoinsService.setFavorite({ coinId: id, isFavorite });

      setCoins(prev => {
        return prev.map(coin => {
          if (coin.id === coinId) {
            return { ...coin, isFavorite: !isFavorite };
          }
          return coin;
        });
      });
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsFavoriting(false);
    }
  }, []);

  const { columns, handleRowClick } = useDefaultTable({ handleFavoriteToggle, isFavoriting });

  const getCoinsList = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await CoinsService.getCoins();

      setCoins(data);
    } catch (error) {
      toast.error(getErrorMessage(error));
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

  if (isLoading) return <Loader />;

  return (
    <div className="w-full max-w-7xl pt-8">
      <Table
        rowKey="id"
        rowClassName="cursor-pointer"
        columns={columns}
        dataSource={coins}
        onRow={record => ({
          onClick: () => handleRowClick(record),
        })}
      />
    </div>
  );
};

export default Dashboard;
