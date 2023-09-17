import { CARRIER_AVATAR } from '@/utils/const';
import { formatCurrency } from '@/utils/helper';
import { max, min } from 'lodash';

export const renderCarType = (seat, type, subType) => {
  if (type === 'khach') {
    if (subType === 'khachgiuongnam34') {
      return 'Xe khách giường nằm 34 chỗ';
    }
    if (subType === 'khachgiuongnam44') {
      return 'Xe khách giường nằm 44 chỗ';
    }
    if (subType === 'khachgiuongnam20vip') {
      return 'Xe khách giường nằm 20 chỗ VIP';
    }
    if (subType === 'khachgiuongnamcabin24dondoi') {
      return 'Xe giường nằm cabin (đơn-đôi) 24 chỗ';
    }
    if (subType === 'khachgiuongnamcabin24doi') {
      return 'Xe giường nằm cabin (đôi) 24 chỗ';
    }
    if (subType === 'khachgiuongnamcabin34don') {
      return 'Xe giường nằm cabin (đơn) 34 chỗ';
    }
    if (subType === 'khachgiuongnamcabin22dondoi') {
      return 'Xe giường nằm cabin (đơn-đôi) 22 chỗ';
    }
    if (subType === 'khachgiuongnamcabin22doi') {
      return 'Xe giường nằm cabin (đôi) 22 chỗ';
    }
    if (subType === 'khachgiuongnam40') {
      return 'Xe giường nằm 40 chỗ';
    }
    if (subType === 'khachghengoi29') {
      return 'Xe khách 29 chỗ ngồi';
    }
    if (subType === 'khachghengoi45') {
      return 'Xe khách 45 chỗ ngồi';
    }
  }
  if (type === 'limousine') {
    if (subType === 'limousine9') {
      return 'Xe Limousine 9 chỗ';
    }
    if (subType === 'limousine11') {
      return 'Xe Limousine 11 chỗ';
    }
    if (subType === 'limousine13') {
      return 'Xe Limousine 13 chỗ';
    }
    if (subType === 'limousine27') {
      return 'Xe Limousine 27 chỗ';
    }
    if (subType === 'limousine28') {
      return 'Xe Limousine 28 chỗ';
    }
    if (subType === 'limousine29') {
      return 'Xe Limousine 29 chỗ';
    }
  }
  return '';
};

export const renderTime = (time) => {
  if (!time) {
    return '';
  }
  const strTime = `${time}`.length === 3 ? `0${time}` : `${time}`;
  return `${strTime[0]}${strTime[1]}:${strTime[2]}${strTime[3]}`;
};

export const renderPrice = (carPrices) => {
  if (!Array.isArray(carPrices) || !carPrices.length) {
    return '';
  }
  const prices = carPrices.filter((i) => !i.transitId).map((i) => i.price);
  if (prices.length === 1) {
    return formatCurrency(prices[0]);
  }
  const priceMax = max(prices);
  const priceMin = min(prices);
  if (priceMax === priceMin) {
    return formatCurrency(priceMax);
  }
  return `${formatCurrency(priceMin)} → ${formatCurrency(priceMax)}`;
};

export const renderFullPrice = (price) => {
  if (!price) {
    return '';
  }
  const prices = price.split(',');
  if (prices.length === 1) {
    return formatCurrency(prices[0]);
  }
  return `${formatCurrency(prices[0])} - ${formatCurrency(prices[1])} - ${formatCurrency(prices[2])}`;
};

export const getCarAvatar = (id, type, subType) => {
  const currentCarrier = CARRIER_AVATAR.find((i) => i.id === id) || {};
  const carrierAvatar = currentCarrier[subType];
  if (carrierAvatar) {
    return carrierAvatar;
  }
  return type === 'limousine' ? currentCarrier['defaultL'] : currentCarrier['defaultK'];
};

export const CAR_UTILS = [
  {
    title: 'Wifi',
    icon: '/images/wifi.png'
  },
  {
    title: 'Nước uống',
    icon: '/images/water-bottles.png'
  },
  {
    title: 'Khăn lau',
    icon: '/images/wet-towel.png'
  },
  {
    title: 'Điều hoà',
    icon: '/images/air-conditioner.png'
  },
  {
    title: 'Sạc pin',
    icon: '/images/charge-phone.png'
  }
];

export const getTransitCoach = (transit = [], type, cityLabel) => {
  const priorityListStart = transit.filter((i) => i.type === 'diemdon').map((i) => i.priority);
  const priorityListEnd = transit.filter((i) => i.type === 'diemtra').map((i) => i.priority);
  const value = type === 'max' ? max(priorityListEnd) : min(priorityListStart);
  const transitLabel = transit
    .filter((i) => i.type === (type === 'max' ? 'diemtra' : 'diemdon'))
    .find((i) => i.priority === value)?.name;
  return transitLabel ? `${transitLabel}, ${cityLabel}` : cityLabel;
};
