import { useNavigate } from 'react-router-dom';
import { Typography, Avatar } from 'antd';
import { StarOutlined, StarFilled } from '@ant-design/icons';

import { APP_LINKS } from '../constants/links';
import { formatNumber } from '../helpers/formatNumber';
import { stringSort } from '../helpers/stringSort';
import { numberSort } from '../helpers/numberSort';

const { Text } = Typography;

export const useDefaultTable = ({ handleFavoriteToggle, isFavoriting }) => {
  const navigate = useNavigate();

  const columns = [
    {
      title: '#',
      width: '5%',
      render: ({ id, market_cap_rank, isFavorite }) => {
        const StarIcon = isFavorite ? StarFilled : StarOutlined;
        return (
          <div className="flex items-center">
            <StarIcon
              style={{ color: '#facc15' }}
              onClick={event => {
                event.stopPropagation();
                if (isFavoriting) return;
                handleFavoriteToggle({ id, isFavorite });
              }}
            />
            <span className="ms-2">{market_cap_rank}</span>
          </div>
        );
      },
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

  return { columns, handleRowClick };
};
