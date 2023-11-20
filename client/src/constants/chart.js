import { LineChartOutlined, BarChartOutlined } from '@ant-design/icons';

export const CHART_TYPE_NAMES = {
  LINE: 'Line',
  BAR: 'Bar',
};

export const CHART_TYPES = [
  {
    label: CHART_TYPE_NAMES.LINE,
    value: 'Line',
    icon: <LineChartOutlined />,
  },
  {
    label: CHART_TYPE_NAMES.BAR,
    value: 'Bar',
    icon: <BarChartOutlined />,
  },
];

export const PERIODS_CONST = {
  ONE_DAY: '1d',
  SEVEN_DAYS: '7d',
  THIRTY_DAYS: '30d',
  HALF_YEAR: '6m',
  ONE_YEAR: '1y',
};

export const PERIODS_ARRAY = Object.values(PERIODS_CONST);

export const PERIODS_IN_DAYS = {
  [PERIODS_CONST.ONE_DAY]: 1,
  [PERIODS_CONST.SEVEN_DAYS]: 7,
  [PERIODS_CONST.THIRTY_DAYS]: 30,
  [PERIODS_CONST.HALF_YEAR]: 180,
  [PERIODS_CONST.ONE_YEAR]: 365,
};

const oneHourMilliseconds = 60 * 60 * 1000; // 1 hour in milliseconds --- 1 day
const threeHoursMilliseconds = oneHourMilliseconds * 3; // 3 hours in milliseconds
const fourHoursMilliseconds = oneHourMilliseconds * 4; // 4 hours in milliseconds --- 7 days
const eightHoursMilliseconds = oneHourMilliseconds * 8; // 8 hours in milliseconds --- 30 days
const oneDayMilliseconds = oneHourMilliseconds * 24; // 1 day in milliseconds
const threeDaysMilliseconds = oneDayMilliseconds * 3; // 3 days in milliseconds --- 6m
const sevenDaysMilliseconds = oneDayMilliseconds * 7; // 7 days in milliseconds --- 1y
const oneMonthMilliseconds = oneDayMilliseconds * 30; // 30 days in milliseconds

export const TIME_IN_MILLISECONDS_FOR_PERIOD = {
  [PERIODS_IN_DAYS[PERIODS_CONST.ONE_DAY]]: oneHourMilliseconds,
  [PERIODS_IN_DAYS[PERIODS_CONST.SEVEN_DAYS]]: fourHoursMilliseconds,
  [PERIODS_IN_DAYS[PERIODS_CONST.THIRTY_DAYS]]: eightHoursMilliseconds,
  [PERIODS_IN_DAYS[PERIODS_CONST.HALF_YEAR]]: threeDaysMilliseconds,
  [PERIODS_IN_DAYS[PERIODS_CONST.ONE_YEAR]]: sevenDaysMilliseconds,
};

export const CHART_COLORS = {
  BLUE: {
    BORDER: 'rgb(54, 162, 235)',
    BG: 'rgba(54, 162, 235, 0.2)',
  },
  GREEN: {
    BORDER: 'rgba(16, 185, 129)',
    BG: 'rgba(16, 185, 129, 0.2)',
  },
  RED: {
    BORDER: 'rgb(255, 99, 132)',
    BG: 'rgba(255, 99, 132, 0.2)',
  },
};
