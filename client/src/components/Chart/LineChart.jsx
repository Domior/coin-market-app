import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { Line } from 'react-chartjs-2';

import { CHART_COLORS } from '../../constants/chart';
import { formChartLabels } from '../../helpers/formChartLabels';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  elements: {
    point: {
      radius: 1,
    },
  },
};

const LineChart = ({ data, days }) => {
  const chartData = {
    labels: formChartLabels(data, days),
    datasets: [
      {
        data: data.map(coin => coin[1]),
        label: `Price`,
        borderColor: CHART_COLORS.BLUE.BORDER,
        backgroundColor: CHART_COLORS.BLUE.BG,
        fill: true,
      },
    ],
  };

  return (
    <div>
      <Line options={options} data={chartData} />
    </div>
  );
};

export default LineChart;
