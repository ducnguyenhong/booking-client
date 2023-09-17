import { atom } from 'recoil';

export const showBookingAtom = atom({
  key: 'SHOW_MODAL_BOOKING_ATOM',
  default: false
});

export const bookingStepAtom = atom({
  key: 'MODAL_BOOKING_STEP_ATOM',
  default: 1
});

export const selectedTripAtom = atom({
  key: 'MODAL_BOOKING_CURRENT_TRIP_ATOM',
  default: undefined
});

export const fromTransitNoteAtom = atom({
  key: 'MODAL_BOOKING_FROM_TRANSIT_NOTE_ATOM',
  default: ''
});

export const toTransitNoteAtom = atom({
  key: 'MODAL_BOOKING_TO_TRANSIT_NOTE_ATOM',
  default: ''
});

export const showModalVoucherAtom = atom({
  key: 'MODAL_BOOKING_SHOW_MODAL_VOUCHER_ATOM',
  default: ''
});

export const seatsAtom = atom({
  key: 'MODAL_BOOKING_SEATS_ATOM',
  default: []
});
