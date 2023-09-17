import dayjs from 'dayjs';
import { atom, selector } from 'recoil';

export const LS_BOOKING = 'booking';

const bookingAtom = atom({
  key: 'BOOKING_ATOM',
  default: new Promise((resolve) => {
    const defaultValue = {
      fromCity: {},
      toCity: {},
      startAt: undefined, // timeslot id
      startDate: dayjs().valueOf(),
      endDate: undefined,
      carType: undefined,
      seatCount: undefined,
      isRoundTrip: false,
      startStop: undefined,
      endStop: undefined,
      helpFullName: '',
      helpPhone: '',
      helpEmail: '',
      helpNote: '',
      paymentMethod: undefined,
      voucher: undefined,
      supporterId: undefined,
      transitPrice: undefined
    };
    if (typeof window === 'undefined') {
      resolve(defaultValue);
    }
    const booking = localStorage.getItem(LS_BOOKING);
    if (!booking) {
      resolve(defaultValue);
    }
    resolve(JSON.parse(booking));
  })
});

export const bookingState = selector({
  key: 'BOOKING_STATE',

  get: ({ get }) => get(bookingAtom),

  set: ({ set }, newData) => {
    localStorage.setItem(LS_BOOKING, JSON.stringify(newData));
    set(bookingAtom, newData);
  }
});
