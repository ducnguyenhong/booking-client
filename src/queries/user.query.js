import { userInfoAtom } from '@/state-management/recoil';
import { CK_TOKEN } from '@/utils/const';
import { showToast } from '@/utils/helper';
import { useQuery } from '@tanstack/react-query';
import { API } from '@ultra-ui/api';
import Cookies from 'js-cookie';
import { useSetRecoilState } from 'recoil';

export const useQueryUserInfo = () => {
  const token = Cookies.get(CK_TOKEN);
  const setUserInfo = useSetRecoilState(userInfoAtom);

  const { data, isInitialLoading, error } = useQuery(
    ['GET_USER_INFO'],
    () => {
      return API.request({
        url: '/api/auth/user-info'
      })
        .then((response) => {
          setUserInfo(response);
          return response;
        })
        .catch((e) => {
          showToast({
            status: 'error',
            content: `Lấy thông tin người dùng thất bại. ${e.message || e.error}`
          });
          return {};
        });
    },
    { enabled: !!token }
  );
  return { isLoading: isInitialLoading, data, error };
};
