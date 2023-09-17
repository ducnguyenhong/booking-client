import { CK_TOKEN } from '@/utils/const';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { API } from '@ultra-ui/api';
import Cookies from 'js-cookie';

export const useQueryMyVouchers = () => {
  const queryClient = useQueryClient();
  const dataClient = queryClient.getQueryData(['GET_MY_VOUCHER_LIST']);
  const token = Cookies.get(CK_TOKEN);

  const { isInitialLoading, data, error } = useQuery(
    ['GET_MY_VOUCHER_LIST'],
    () =>
      API.request({
        url: '/api/vouchers/me',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }),
    { enabled: !dataClient && !!token }
  );
  if (dataClient) {
    const content = Array.isArray(dataClient) && dataClient.length ? dataClient : dataClient?.content;
    return { data: content, isLoading: false, error: null };
  }
  const { content = [] } = data || {};
  return { data: content, isLoading: isInitialLoading, error };
};

export const useQueryBankAccount = (enabled) => {
  return useQuery(
    ['GET_BANK_ACCOUNT'],
    () =>
      API.request({
        url: '/api/bank-account'
      }),
    { enabled }
  );
};
