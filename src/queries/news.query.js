import { useQuery } from '@tanstack/react-query';
import { API } from '@ultra-ui/api';

export const getNewsList = (page = 1, size = 10) => {
  return API.request({
    url: '/api/news',
    params: {
      page: page - 1,
      size
    }
  });
};

export const getNewsDetail = (id) => {
  return API.request({
    url: `/api/news/${id}`
  });
};

export const useQueryNewsList = (page = 1, size = 10) => {
  const { data, isInitialLoading, error } = useQuery(['GET_NEWS_LIST', page, size], () => getNewsList(page, size));
  const { content = [] } = data || {};
  return { data: content, isLoading: isInitialLoading, error };
};

export const useQueryNews = (id) => {
  const { data, isInitialLoading, error } = useQuery(['GET_NEWS_DETAIL', id], () => getNewsDetail(id), {
    enabled: !!id
  });
  return { data, isLoading: isInitialLoading, error };
};
