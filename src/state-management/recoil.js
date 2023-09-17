import { atom } from 'recoil';

export const showLoginAtom = atom({
  key: 'SHOW_MODAL_LOGIN_ATOM',
  default: false
});

export const showRegisterAtom = atom({
  key: 'SHOW_MODAL_REGISTER_ATOM',
  default: false
});

export const showForgotPassAtom = atom({
  key: 'SHOW_MODAL_FORGOT_PASS_ATOM',
  default: false
});

export const showMenuMobileAtom = atom({
  key: 'SHOW_MENU_MOBILE_ATOM',
  default: false
});

export const userInfoAtom = atom({
  key: 'USER_INFO_ATOM',
  default: undefined
});
