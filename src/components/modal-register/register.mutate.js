import { showRegisterAtom } from '@/state-management/recoil';
import { showToast } from '@/utils/helper';
import { useMutation } from '@tanstack/react-query';
import { API } from '@ultra-ui/api';
import { useSetRecoilState } from 'recoil';

export const useMutateRegister = () => {
  const setShowRegister = useSetRecoilState(showRegisterAtom);

  return useMutation(
    (variables) => {
      const { username, password, fullname, email } = variables;

      return API.request({
        method: 'POST',
        url: '/api/auth/register',
        params: { username, password, fullname, email }
      });
    },
    {
      onSuccess: () => {
        showToast({
          content: 'Đăng ký tài khoản thành công',
          status: 'success'
        });
        setShowRegister(false);
      }
    }
  );
};
