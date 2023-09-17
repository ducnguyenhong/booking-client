import { showLoginAtom, userInfoAtom } from '@/state-management/recoil';
import { CK_TOKEN } from '@/utils/const';
import { showToast } from '@/utils/helper';
import { useMutation } from '@tanstack/react-query';
import { API } from '@ultra-ui/api';
import Cookies from 'js-cookie';
import { useSetRecoilState } from 'recoil';

export const useMutateLogin = () => {
  const setUserInfo = useSetRecoilState(userInfoAtom);
  const setShowLogin = useSetRecoilState(showLoginAtom);

  return useMutation(
    (variables) => {
      const { username, password } = variables;
      return API.request({
        method: 'POST',
        url: '/api/auth/login',
        params: {
          username,
          password
        }
      });
    },
    {
      onSuccess: (response) => {
        const { token, user } = response || {};
        Cookies.set(CK_TOKEN, token);
        setUserInfo(user);
        showToast({
          content: 'Đăng nhập thành công',
          status: 'success'
        });
        setShowLogin(false);
      },
      onError: (e) => {
        showToast({
          content: e.message || e.error,
          status: 'error'
        });
      }
    }
  );
};
