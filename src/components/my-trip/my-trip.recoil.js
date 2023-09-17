import { atom } from 'recoil';

export const cancelTripAtom = atom({
  key: 'SHOW_MODAL_CANCEL_TRIP',
  default: {
    show: false,
    id: undefined
  }
});
