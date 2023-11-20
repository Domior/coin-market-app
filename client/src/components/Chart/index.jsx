import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Segmented } from 'antd';

import LineChart from './LineChart';
import BarChart from './BarChart';
import Loader from '../Loader';

import { CoinsService } from '../../services/CoinsService';
import { CHART_TYPES, CHART_TYPE_NAMES, PERIODS_ARRAY, PERIODS_IN_DAYS } from '../../constants/chart';

const Chart = () => {
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [coinChartData, setCoinChartData] = useState(null);
  const [chartType, setChartType] = useState(CHART_TYPES[0].label);
  const [period, setPeriod] = useState(PERIODS_ARRAY[0]);

  const getCoinChart = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await CoinsService.getCoinChart(id, { days: PERIODS_IN_DAYS[period] });
      setCoinChartData(data);
    } catch (error) {
      toast.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [period]);

  useEffect(() => {
    getCoinChart();
  }, [getCoinChart]);

  console.log(chartType);

  if (isLoading || !coinChartData) return <Loader />;

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
