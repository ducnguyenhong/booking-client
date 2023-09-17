import { useQuery } from '@tanstack/react-query';
import { API } from '@ultra-ui/api';

const COMING_SOON_VOUCHER = [
  {
    id: 'cs1',
    title: 'Hãy chờ đón các voucher sắp ra mắt',
    description: 'Cùng chờ đón các voucher hot sẽ ra mắt trong thời gian tới nhé',
    url: 'https://img.freepik.com/free-vector/realistic-coming-soon-background_52683-58486.jpg?w=1380&t=st=1692605296~exp=1692605896~hmac=0f94da066644115796081f9522646be1b7e2be595253b20c845850c586d102bf',
    isComingSoon: true
  },
  {
    id: 'cs2',
    title: 'Hãy chờ đón các voucher sắp ra mắt',
    description: 'Cùng chờ đón các voucher hot sẽ ra mắt trong thời gian tới nhé',
    url: 'https://img.freepik.com/free-vector/realistic-coming-soon-background_52683-58486.jpg?w=1380&t=st=1692605296~exp=1692605896~hmac=0f94da066644115796081f9522646be1b7e2be595253b20c845850c586d102bf',
    isComingSoon: true
  },
  {
    id: 'cs3',
    title: 'Hãy chờ đón các voucher sắp ra mắt',
    description: 'Cùng chờ đón các voucher hot sẽ ra mắt trong thời gian tới nhé',
    url: 'https://img.freepik.com/free-vector/realistic-coming-soon-background_52683-58486.jpg?w=1380&t=st=1692605296~exp=1692605896~hmac=0f94da066644115796081f9522646be1b7e2be595253b20c845850c586d102bf',
    isComingSoon: true
  },
  {
    id: 'cs4',
    title: 'Hãy chờ đón các voucher sắp ra mắt',
    description: 'Cùng chờ đón các voucher hot sẽ ra mắt trong thời gian tới nhé',
    url: 'https://img.freepik.com/free-vector/realistic-coming-soon-background_52683-58486.jpg?w=1380&t=st=1692605296~exp=1692605896~hmac=0f94da066644115796081f9522646be1b7e2be595253b20c845850c586d102bf',
    isComingSoon: true
  }
];

export const getVoucherList = (page = 1, size = 10) => {
  return API.request({
    url: '/api/vouchers',
    params: {
      page: page - 1,
      size
    }
  }).then((response) => {
    if (response?.content?.length < 4) {
      const content = [...response.content, ...COMING_SOON_VOUCHER];
      content.length = 4;
      return { content };
    }
    return response;
  });
};

export const getVoucherDetail = (id) => {
  return API.request({
    url: `/api/vouchers/${id}`
  });
};

export const useQueryVoucherList = (page = 1, size = 10) => {
  const { data, isInitialLoading, error } = useQuery(['GET_VOUCHER_LIST', page, size], () =>
    getVoucherList(page, size)
  );
  const { content = [] } = data || {};
  return { data: content, isLoading: isInitialLoading, error };
};

export const useQueryVoucher = (id) => {
  const { data, isInitialLoading, error } = useQuery(['GET_VOUCHER_DETAIL', id], () => getVoucherDetail(id), {
    enabled: !!id
  });
  return { data, isLoading: isInitialLoading, error };
};
