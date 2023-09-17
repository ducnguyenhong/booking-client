import { API } from '@ultra-ui/api';
import isEmpty from 'lodash/isEmpty';

export const getInfiniteData = (infiniteData) => {
  if (isEmpty(infiniteData?.pages)) {
    return [];
  }

  return infiniteData.pages.flat();
};

export const getInfiniteList = (page = 0, requestConfig) => {
  const { url, params } = requestConfig;

  return API.request({
    url,
    params: {
      ...params,
      page,
      size: 10
    }
  }).then((response) => {
    if (!Array.isArray(response?.content) || !response?.content.length) {
      return [];
    }
    return response.content;
  });
};
