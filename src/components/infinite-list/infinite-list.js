import { showToast } from '@/utils/helper';
import { Flex } from '@chakra-ui/react';
import { useInfiniteQuery } from '@tanstack/react-query';
import isEmpty from 'lodash/isEmpty';
import { Fragment, memo, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import Loading from '../loading';
import { getInfiniteData, getInfiniteList } from './infinite-list.query';

const InfiniteList = (props) => {
  const {
    queryKey,
    queryOptions = {},
    requestConfig,
    renderItem,
    getNextPageParam,
    EmptyComponent,
    ErrorComponent,
    getData
  } = props;
  const { ref: loadMoreRef, inView } = useInView();
  const { defaultPage = 0, defaultSize = 10 } = requestConfig;
  const { cacheTime, enabled } = queryOptions;

  const {
    data: infiniteData,
    error,
    isLoading,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage
  } = useInfiniteQuery(queryKey, ({ pageParam }) => getInfiniteList(pageParam || defaultPage, requestConfig), {
    onError: (e) => {
      showToast({
        status: 'error',
        description: `Lấy dữ liệu thất bại. ${e.message || e.error}`
      });
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage?.length < defaultSize) {
        return undefined;
      }

      if (getNextPageParam) {
        return getNextPageParam(lastPage, allPages);
      }

      return allPages.length + defaultPage;
    },
    cacheTime,
    enabled
  });

  const dataList = getInfiniteData(infiniteData);

  useEffect(() => {
    if (typeof infiniteData !== 'undefined') {
      getData && getData(dataList);
    }
  }, [dataList, getData, infiniteData]);

  useEffect(() => {
    if (!hasNextPage) {
      return;
    }
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, inView]);

  if (isLoading) {
    return (
      <Flex direction="column" w="full" overflow="hidden">
        <Loading />
      </Flex>
    );
  }

  if (isEmpty(dataList)) {
    return EmptyComponent || null;
  }

  if (error) {
    return ErrorComponent || null;
  }

  return (
    <>
      {dataList.map((item, index) => (
        <Fragment key={index}>{renderItem(item)}</Fragment>
      ))}

      {hasNextPage && (
        <Flex ref={loadMoreRef} alignItems="center" justifyContent="center" mt={2} mb={4} minH="1px" flexShrink={0}>
          {(isFetching || isFetchingNextPage) && (
            <Flex direction="column" w="full">
              <Loading />
            </Flex>
          )}
        </Flex>
      )}
    </>
  );
};

export default memo(InfiniteList);
