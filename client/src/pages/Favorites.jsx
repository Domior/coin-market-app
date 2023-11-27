import React, { useState, useEffect, useCallback } from 'react';

import { toast } from 'react-toastify';
import { Table } from 'antd';

import Loader from '../components/Loader';

import { CoinsService } from '../services/CoinsService';
import { useDefaultTable } from '../hooks/useDefaultTable';
import { getErrorMessage } from '../helpers/getErrorMessage';

const Favorites = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isFavoriting, setIsFavoriting] = useState(false);

  const [favoriteCoins, setFavoriteCoins] = useState([]);

  const handleFavoriteToggle = useCallback(async ({ id, isFavorite }) => {
    setIsFavoriting(true);
    try {
      const { coinId } = await CoinsService.setFavorite({ coinId: id, isFavorite });
      setFavoriteCoins(prev => prev.filter(item => item.id !== coinId));
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsFavoriting(false);
    }
  }, []);

  const { columns, handleRowClick } = useDefaultTable({ handleFavoriteToggle, isFavoriting });

  const getFavoriteCoinsList = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await CoinsService.getCoins();
      const favorites = data.filter(item => item.isFavorite === true);
      setFavoriteCoins(favorites);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getFavoriteCoinsList();
  }, [getFavoriteCoinsList]);

  if (isLoading) return <Loader />;

  return (
    <div className="w-full max-w-7xl pt-8">
      <Table
        rowKey="id"
        rowClassName="cursor-pointer"
        columns={columns}
        dataSource={favoriteCoins}
        onRow={record => ({
          onClick: () => handleRowClick(record),
        })}
      />
    </div>
  );
};

export default Favorites;
