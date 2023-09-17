import { bookingState } from '@/state-management/booking';
import { useQuery } from '@tanstack/react-query';
import { API } from '@ultra-ui/api';
import { isEmpty } from 'lodash';
import { useRecoilValue } from 'recoil';

export const useQueryCityFrom = () => {
  const { isInitialLoading, data } = useQuery(
    ['GET_CITY_LIST_FROM'],
    () =>
      API.request({
        url: '/api/routes/search-from'
      }).then((response) => {
        if (!Array.isArray(response) || !response.length) {
          return [];
        }
        return response.map((item) => ({ value: item, label: item }));
      })
    // { enabled: show }
  );
  return { isLoading: isInitialLoading, data };
};

export const useQueryCityTo = () => {
  const booking = useRecoilValue(bookingState);
  const { fromCity } = booking;

  const { isInitialLoading, data } = useQuery(
    ['GET_CITY_LIST_TO', fromCity?.label],
    () =>
      API.request({
        url: '/api/routes/search-to',
        params: {
          from: fromCity?.label
        }
      }).then((response) => {
        if (!Array.isArray(response) || !response.length) {
          return [];
        }
        return response.map((item) => ({ value: item.id, label: item.toCity, isNoSeats: item.isNoSeats }));
      }),
    { enabled: !isEmpty(fromCity?.label) }
  );
  return { isLoading: isInitialLoading, data };
};
