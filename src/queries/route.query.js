import { useQuery } from '@tanstack/react-query';
import { API } from '@ultra-ui/api';

export const useQueryRouteProminent = () => {
  const { data, isInitialLoading } = useQuery(['GET_ROUTE_PROMINENT'], () => {
    return API.request({
      url: '/api/routes/prominent'
    });
  });
  const { content = [] } = data || {};
  return { data: content, isLoading: isInitialLoading };
};
