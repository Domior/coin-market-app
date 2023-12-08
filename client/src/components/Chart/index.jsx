import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Segmented } from 'antd';

import LineChart from './LineChart';
import BarChart from './BarChart';

import { CHART_TYPES, CHART_TYPE_NAMES, PERIODS_ARRAY, PERIODS_IN_DAYS, REQUEST_NEW_DATA_DELAY } from '../../constants/chart';
import { SocketService } from '../../services/SocketService';
import { SOCKET_EVENTS } from '../../constants/socket';

const Chart = () => {
  const { id } = useParams();

  const [coinChartData, setCoinChartData] = useState(null);
  const [chartType, setChartType] = useState(CHART_TYPES[0].label);
  const [period, setPeriod] = useState(PERIODS_ARRAY[0]);

  const requestChartData = useCallback(() => {
    SocketService.emit(SOCKET_EVENTS.GET_CHART_DATA, { id, days: PERIODS_IN_DAYS[period] });
  }, [id, period]);

  useEffect(() => {
    requestChartData();

    const interval = setInterval(requestChartData, REQUEST_NEW_DATA_DELAY);

    return () => {
      clearInterval(interval);
      SocketService.disconnect();
    };
  }, [requestChartData]);

  useEffect(() => {
    SocketService.on(SOCKET_EVENTS.RECEIVE_CHART_DATA, data => setCoinChartData(data));
  }, []);

  useEffect(() => {
    SocketService.on(SOCKET_EVENTS.RECEIVE_CHART_DATA_ERROR, message => toast.error(message));
  }, []);

  if (!coinChartData) return null;

  return (
    <div className="m-auto pt-8 max-w-7xl">
      <div className="px-2 flex flex-col items-end gap-y-2 ">
        <Segmented options={PERIODS_ARRAY} value={period} onChange={setPeriod} className="w-fit" />
        <Segmented options={CHART_TYPES} value={chartType} onChange={setChartType} className="w-fit" />
      </div>

      {chartType === CHART_TYPE_NAMES.LINE ? (
        <LineChart data={coinChartData.prices} days={PERIODS_IN_DAYS[period]} />
      ) : (
        <BarChart data={coinChartData.prices} days={PERIODS_IN_DAYS[period]} />
      )}
    </div>
  );
};

export default Chart;
