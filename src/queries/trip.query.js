import { CK_TOKEN } from '@/utils/const';
import { useQuery } from '@tanstack/react-query';
import { API } from '@ultra-ui/api';
import Cookies from 'js-cookie';

export const getTripList = (page = 0, size = 10, routeId) => {
  return API.request({
    url: '/api/routes/search-trip',
    params: { routeId, page, size }
  });
};

export const useQueryTripList = (page = 0, size = 10, routeId) => {
  const { data, isInitialLoading, error } = useQuery(
    ['GET_TRIP_LIST', page, size, routeId],
    () => getTripList(page, size, routeId),
    { enabled: !!routeId }
  );
  const { content = [] } = data || {};
  return { data: content, isLoading: isInitialLoading, error };
};

export const useQueryMyTrip = () => {
  const { data, isInitialLoading, error } = useQuery(['GET_MY_TRIP_LIST'], () =>
    API.request({
      url: '/api/trips/me',
      headers: {
        Authorization: `Bearer ${Cookies.get(CK_TOKEN)}`
      }
    })
  );
  const { content = [] } = data || {};
  return { data: content, isLoading: isInitialLoading, error };
};
