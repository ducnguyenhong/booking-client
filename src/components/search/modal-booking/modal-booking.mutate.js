import { bookingState } from '@/state-management/booking';
import { userInfoAtom } from '@/state-management/recoil';
import { CK_TOKEN } from '@/utils/const';
import { getFinalPrice, showToast } from '@/utils/helper';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { API } from '@ultra-ui/api';
import Cookies from 'js-cookie';
import { isEmpty } from 'lodash';
import { useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { fromTransitNoteAtom, seatsAtom, selectedTripAtom, toTransitNoteAtom } from './modal-booking.recoil';

export const getPriceLimousine = (type, prices) => {
  const priceList = prices.split(',');
  if (type === 'dau') {
    return Number(priceList[0]);
  }
  if (type === 'giua') {
    return Number(priceList[1]);
  }
  if (type === 'cuoi') {
    return Number(priceList[2]);
  }
  return 0;
};

export const getPriceCabin = (type, prices) => {
  const priceList = prices.split(',');
  if (type === 'cabindon') {
    return Number(priceList[0]);
  }
  if (type === 'cabindoi') {
    return Number(priceList[1]);
  }
  return 0;
};

export const useMutateBooking = () => {
  const queryClient = useQueryClient();
  const booking = useRecoilValue(bookingState);
  const {
    helpFullName,
    helpNote,
    helpPhone,
    helpEmail,
    startDate,
    voucher,
    startAt,
    paymentMethod,
    startStop,
    endStop,
    supporterId,
    transitPrice
  } = booking;
  const userInfo = useRecoilValue(userInfoAtom);
  const selectedTrip = useRecoilValue(selectedTripAtom);
  const fromTransitNote = useRecoilValue(fromTransitNoteAtom);
  const toTransitNote = useRecoilValue(toTransitNoteAtom);
  const { id: routeCarId } = selectedTrip || {};
  const seats = useRecoilValue(seatsAtom);
  const seatsParam = useMemo(() => {
    let dataSeats = [];
    if (isEmpty(transitPrice)) {
      dataSeats = seats;
    } else {
      dataSeats = seats.map((item) => {
        const currentSeatType = transitPrice.find((i) => i.seatType === item.seatType);
        return {
          ...item,
          price: currentSeatType.price,
          id: currentSeatType.id
        };
      });
    }
    return dataSeats.map((i) => ({ priceId: i.id, quantity: i.quantity }));
  }, [seats, transitPrice]);

  return useMutation(
    () => {
      return API.request({
        method: 'POST',
        url: '/api/trips',
        headers: {
          Authorization: `Bearer ${Cookies.get(CK_TOKEN)}`
        },
        params: {
          seats: seatsParam,
          helpFullname: helpFullName,
          helpNote,
          helpPhone,
          helpEmail,
          userId: userInfo.id,
          timeslotId: startAt,
          routeCarId,
          goDate: startDate,
          paymentType: paymentMethod,
          voucherId: voucher?.id,
          fromTransitId: startStop,
          toTransitId: endStop,
          supporterId,
          fromTransitNote,
          toTransitNote
        }
      });
    },
    {
      onSuccess: (_, { onClose, onShowSuccess }) => {
        const totalPrice = getFinalPrice(seats, voucher, transitPrice, true);
        queryClient.invalidateQueries(['GET_MY_TRIP_LIST']);
        onClose();
        onShowSuccess(totalPrice / 100);
      },
      onError: (e) =>
        showToast({
          content: `Đặt vé thất bại. ${e.message || e.error}`,
          status: 'error'
        })
    }
  );
};
