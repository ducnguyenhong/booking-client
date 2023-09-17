import { FaBusAlt, FaCarSide } from 'react-icons/fa';

export const CAR_TYPE_DATA = [
  {
    name: 'Xe Limousine',
    description: 'Đưa đón tại nhà',
    type: 'limousine',
    image: '/images/limousine.png'
  },
  {
    name: 'Xe khách',
    description: 'Đưa đón điểm cố định',
    type: 'khach',
    image: '/images/coach.png'
  },
  {
    name: 'Xe ghép',
    description: 'Sắp ra mắt',
    type: 'ghep',
    image: '/images/compound.png'
  }
];

export const TAB_DATA = [
  {
    icon: FaBusAlt,
    title: 'Đặt vé xe khách',
    tab: 0,
    iconSize: 15
  },
  {
    icon: FaCarSide,
    title: 'Thuê xe',
    tab: 1,
    iconSize: 17
  }
  // {
  //   icon: FaTrain,
  //   title: 'Tàu hoả',
  //   tab: 2,
  //   iconSize: 15
  // }
];
