import { showForgotPassAtom } from '@/state-management/recoil';
import { showToast } from '@/utils/helper';
import { useMutation } from '@tanstack/react-query';
import { API } from '@ultra-ui/api';
import { useSetRecoilState } from 'recoil';

export const useMutateForgot = () => {
  const setShowForgotPass = useSetRecoilState(showForgotPassAtom);

  return useMutation(
    (variables) => {
      const { phone } = variables;

      return API.request({
        method: 'POST',
        url: '/api/forgot-pass',
        params: { phone }
      });
    },
    {
      onSuccess: (response) => {
        showToast({
          content: 'Quên mật khẩu thành công',
          status: 'info'
        });
        setShowForgotPass(false);
      }
    }
  );
};
