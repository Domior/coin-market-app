import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { toast } from 'react-toastify';
import { Avatar, Typography, Badge, Col, Row, Statistic, Popover, Descriptions } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

import Loader from '../components/Loader';

import { CoinsService } from '../services/CoinsService';
import { formatNumber } from '../helpers/formatNumber';
import { COIN_DETAILS } from '../constants/coin';

const { Title, Text } = Typography;

const DEFAULT_CURRENCY = 'usd';

const CoinInfo = ({ id }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [coinDetails, setCoinDetails] = useState(COIN_DETAILS);

  const { image, name, symbol, market_cap_rank, market_data } = coinDetails;

  const items = useMemo(
    () => [
      {
        key: '1',
        label: 'All-Time High',
        children: `$${formatNumber(market_data.ath[DEFAULT_CURRENCY])}`,
      },
      {
        key: '2',
        label: 'All-Time Low',
        children: `$${formatNumber(market_data.atl[DEFAULT_CURRENCY])}`,
      },
      {
        key: '3',
        label: '24h High',
        children: `$${formatNumber(market_data.high_24h[DEFAULT_CURRENCY])}`,
      },
      {
        key: '4',
        label: '24h Low',
        children: `$${formatNumber(market_data.low_24h[DEFAULT_CURRENCY])}`,
      },
      {
        key: '5',
        label: '24h Price Change',
        children: `$${formatNumber(market_data.price_change_24h_in_currency[DEFAULT_CURRENCY])}`,
      },
    ],
    [market_data],
  );

  const getCoinDetails = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await CoinsService.getCoinDetails(id);
      setCoinDetails(data);
    } catch (error) {
      toast.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    getCoinDetails();
  }, [getCoinDetails]);

  if (isLoading || !coinDetails.id) return <Loader />;

  return (
    <Row gutter={64}>
      <Col span={12}>
        <div className="text-right">
          <Badge color="volcano" count={`Rank #${market_cap_rank}`} className="mb-3" />
          <div className="mb-3 flex items-center justify-end">
            <Avatar src={image.thumb} size="large" />
            <Title level={3} className="!mb-0 mx-2">
              {name}
            </Title>
            <Text type="secondary">{symbol.toUpperCase()}</Text>
          </div>
          <Title level={3} className="!mb-5">
            ${formatNumber(market_data.current_price[DEFAULT_CURRENCY])}
          </Title>

          <Row gutter={16}>
            <Col span={12}>
              <Row gutter={[0, 16]}>
                <Col span={24}>
                  <Statistic title="Market Cap" value={market_data.market_cap[DEFAULT_CURRENCY]} prefix="$" />
                </Col>
                <Col span={24}>
                  <Statistic title="Total Volume" value={market_data.total_volume[DEFAULT_CURRENCY]} prefix="$" />
                </Col>
                <Col span={24}>
                  <Statistic
                    title={
                      <div>
                        Fully Diluted Valuation
                        <Popover
                          content={
                            <div className="max-w-md">
                              <Text>
                                Fully Diluted Valuation (FDV) is the theoretical market capitalization of a coin if the entirety of its supply is in
                                circulation, based on its current market price. The FDV value is theoretical as increasing the circulating supply of a
                                coin may impact its market price. Also depending on the tokenomics, emission schedule or lock-up period of a coin's
                                supply, it may take a significant time before its entire supply is released into circulation.
                              </Text>
                            </div>
                          }
                          title="Fully Diluted Valuation (FDV) = Current Price x Total Supply"
                        >
                          <InfoCircleOutlined className="ms-2" />
                        </Popover>
                      </div>
                    }
                    value={market_data.fully_diluted_valuation[DEFAULT_CURRENCY]}
                    prefix="$"
                  />
                </Col>
              </Row>
            </Col>
            <Col span={12}>
              <Row gutter={[0, 16]}>
                <Col span={24}>
                  <Statistic title="Circulating Supply" value={market_data.circulating_supply} />
                </Col>
                <Col span={24}>
                  <Statistic title="Total Supply" value={market_data.total_supply} />
                </Col>
                <Col span={24}>
                  <Statistic title="Max Supply" value={market_data.max_supply} />
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </Col>
      <Col span={12}>
        <Descriptions
          title={
            <Title level={3} className="!mb-0 pt-9">
              Statistics
            </Title>
          }
          items={items}
          column={1}
          contentStyle={{ fontSize: '20px' }}
          labelStyle={{ fontSize: '18px' }}
        />
      </Col>
    </Row>
  );
};

export default CoinInfo;
