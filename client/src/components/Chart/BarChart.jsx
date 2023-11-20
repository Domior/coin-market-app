import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { Bar } from 'react-chartjs-2';

import { CHART_COLORS, TIME_IN_MILLISECONDS_FOR_PERIOD } from '../../constants/chart';
import { groupChartLabels } from '../../helpers/groupChartLabels';
import { formChartLabels } from '../../helpers/formChartLabels';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, Filler);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      beginAtZero: false,
    },
  },
};

const BarChart = ({ data, days }) => {
  const newData = groupChartLabels(data, TIME_IN_MILLISECONDS_FOR_PERIOD[days]);

  const chartData = {
    labels: formChartLabels(newData, days),
    datasets: [
      {
        data: newData.map(coin => coin.data),
        label: `Price`,
        backgroundColor: newData.map(coin => {
          const [openPrice, closePrice] = coin.data;
          return openPrice > closePrice ? CHART_COLORS.RED.BORDER : CHART_COLORS.GREEN.BORDER;
        }),
      },
    ],
  };

  return (
    <div>
      <Bar options={options} data={chartData} />
    </div>
  );
};

export default BarChart;
