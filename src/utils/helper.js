import { createStandaloneToast } from '@chakra-ui/react';
import { isEmpty } from 'lodash';
import { useEffect, useRef, useState } from 'react';

export const formatCurrency = (price) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Number(price));

export const showToast = (config) => {
  const { content, position = 'top-right', status = 'info', duration = 4000, isClosable = true, title } = config;
  const { toast } = createStandaloneToast();

  return toast({
    description: content,
    title,
    position,
    isClosable,
    duration,
    status
  });
};

export const getCustomerName = (fullname = '') => {
  if (!fullname) {
    return '';
  }
  return fullname.split(' ')[fullname.split(' ').length - 1];
};

const attachMediaListener = (query, callback) => {
  try {
    query.addEventListener('change', callback);
    return () => query.removeEventListener('change', callback);
  } catch (e) {
    query.addListener(callback);
    return () => query.removeListener(callback);
  }
};

const getInitialValue = (query, initialValue) => {
  if (typeof initialValue === 'boolean') {
    return initialValue;
  }

  if (typeof window !== 'undefined' && 'matchMedia' in window) {
    return window.matchMedia(query).matches;
  }

  return false;
};

export const useMediaQuery = (query, initialValue = true, getInitialValueInEffect = false) => {
  const [matches, setMatches] = useState(getInitialValueInEffect ? initialValue : getInitialValue(query, initialValue));
  const queryRef = useRef();

  useEffect(() => {
    if ('matchMedia' in window) {
      queryRef.current = window.matchMedia(query);
      setMatches(queryRef.current.matches);
      return attachMediaListener(queryRef.current, (event) => setMatches(event.matches));
    }

    return undefined;
  }, [query]);

  return matches;
};

export const transformURL = (text) => {
  if (!text) {
    return '';
  }
  let slug = text.toLowerCase();
  slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
  slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
  slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
  slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
  slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
  slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
  slug = slug.replace(/đ/gi, 'd');
  slug = slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '');
  slug = slug.replace(/ /gi, '-');
  slug = slug.replace(/\-\-\-\-\-/gi, '-');
  slug = slug.replace(/\-\-\-\-/gi, '-');
  slug = slug.replace(/\-\-\-/gi, '-');
  slug = slug.replace(/\-\-/gi, '-');
  slug = '@' + slug + '@';
  slug = slug.replace(/\@\-|\-\@|\@/gi, '');
  return slug;
};

export const getFinalPrice = (seats = [], voucher, transitPrice, getNumber = false) => {
  if (transitPrice) {
    const dataSeats = seats.map((item) => {
      const currentSeatType = transitPrice.find((i) => i.seatType === item.seatType);
      return { ...item, priceTransit: currentSeatType.price };
    });
    const totalPrice = dataSeats.reduce((prev, curr) => {
      const { priceTransit, quantity } = curr;
      return prev + quantity * priceTransit;
    }, 0);
    if (getNumber) {
      return totalPrice;
    }
    return formatCurrency(totalPrice);
  }

  const totalPrice = seats.reduce((prev, curr) => {
    const { price, quantity } = curr;
    return prev + quantity * price;
  }, 0);

  if (!isEmpty(voucher)) {
    const { price: voucherPrice, priceType } = voucher;
    if (priceType === 'tien') {
      if (getNumber) {
        return totalPrice - Number(voucherPrice) * seats.length;
      }
      return formatCurrency(totalPrice - Number(voucherPrice) * seats.length);
    }
  }

  if (getNumber) {
    return totalPrice;
  }

  return formatCurrency(totalPrice);
};

export const getMyTripPrice = (seats = [], voucher, price) => {
  if (!isEmpty(voucher)) {
    const { price: voucherPrice, priceType } = voucher;
    if (priceType === 'tien') {
      return formatCurrency(price - Number(voucherPrice) * seats.length);
    }
  }

  return formatCurrency(price);
};

export const getPointBooking = (money, voucher, quantity) => {
  if (!isEmpty(voucher)) {
    const { price, priceType } = voucher;
    if (priceType === 'tien') {
      return Math.ceil((Number(money) - Number(price) * quantity) / 100);
    }
    if (priceType === 'phantram') {
      return Math.ceil((Number(money) - (Number(money) / 100) * Number(price)) / 100);
    }
  }

  return Math.ceil(money / 100);
};

export const getPaymentMethod = (method) => {
  if (method === 'chuyenkhoan') {
    return 'Chuyển khoản';
  }
  if (method === 'trasau') {
    return 'Trả khi lên xe';
  }
  return '';
};

export const getSeatType = (subType, seatType) => {
  if (['limousine9', 'limousine11'].includes(subType)) {
    if (seatType === 'dau') {
      return 'Ghế đầu';
    }
    if (seatType === 'giua') {
      return 'Ghế giữa';
    }
    if (seatType === 'cuoi') {
      return 'Ghế cuối';
    }
  }

  if (['khachgiuongnamcabin24dondoi', 'khachgiuongnamcabin22dondoi'].includes(subType)) {
    if (seatType === 'cabindoi') {
      return 'Ghế cabin đôi';
    }
    if (seatType === 'cabindon') {
      return 'Ghế cabin đơn';
    }
  }

  return 'Ghế thường';
};

export const getListSeat = (seats = [], subType) => {
  if (!Array.isArray(seats) || !seats.length) {
    return '';
  }
  return seats.map((item) => `${item.quantity} ${getSeatType(subType, item.price.seatType)}`).join(', ');
};

const getLabelDurationOption = (index) => {
  const hour = Math.floor((5 * (index + 1)) / 60) ? `${Math.floor((5 * (index + 1)) / 60)} giờ ` : '';
  const minute = (5 * (index + 1)) % 60 ? `${(5 * (index + 1)) % 60} phút` : '';
  return `${hour}${minute}`;
};

export const optionsTimeDuration = Array.from(Array(288).keys()).map((_, index) => ({
  value: 5 * (index + 1),
  label: getLabelDurationOption(index)
}));

export const getLabelDuration = (durationTime) =>
  durationTime?.label?.replace('giờ', 'h')?.replace('phút', '')?.split(' ')?.join('');

export const transformSlugURL = (title = '') => {
  let slug = title.toLowerCase();
  slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
  slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
  slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
  slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
  slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
  slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
  slug = slug.replace(/đ/gi, 'd');
  slug = slug.replace(/ /gi, '-');
  slug = slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '');
  slug = slug.replace(/\-\-\-\-\-/gi, '-');
  slug = slug.replace(/\-\-\-\-/gi, '-');
  slug = slug.replace(/\-\-\-/gi, '-');
  slug = slug.replace(/\-\-/gi, '-');
  slug = '@' + slug + '@';
  slug = slug.replace(/\@\-|\-\@|\@/gi, '');
  return slug;
};
