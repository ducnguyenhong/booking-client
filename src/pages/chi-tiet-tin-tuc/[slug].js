import Head from '@/components/head';
import { Portal } from '@/layouts';
import { getNewsDetail, useQueryNews } from '@/queries/news.query';
import { transformSlugURL } from '@/utils/helper';
import { Box, Flex, Heading, Icon, Text } from '@chakra-ui/react';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { API } from '@ultra-ui/api';
import dayjs from 'dayjs';
import { isEmpty } from 'lodash';
import { useRouter } from 'next/router';
import { FaCalendarWeek } from 'react-icons/fa';

const NewsDetail = (props) => {
  const { newsDetail } = props;
  const { query } = useRouter();
  const { slug = '' } = query;
  const id = slug.split('.')[1];
  const { data = {}, isLoading, error } = useQueryNews(id);
  const { title, content, createdDate, description } = data;
  const { title: metaTitle, url: metaImage, description: metaDescription } = newsDetail || {};

  return (
    <>
      <Head title={`${metaTitle} | BOOKING`} image={metaImage} description={metaDescription} />

      <Portal isLoading={isLoading} isNoData={!isEmpty(data)} error={error} breadcrumb="Chi tiết tin tức">
        <Box>
          <Heading as="h4" fontSize={24}>
            {title}
          </Heading>

          <Flex mt={3} align="center" gap={2}>
            <Icon as={FaCalendarWeek} fontSize={14} color="text.2" />
            <Text fontSize={14} color="text.2">
              {dayjs(createdDate).format('DD/MM/YYYY')}
            </Text>
          </Flex>

          <Text mt={4} color="text.2" fontSize={14}>
            {description}
          </Text>

          <Box mt={5}>
            <div className="html-content-84-go" dangerouslySetInnerHTML={{ __html: content }} />
          </Box>
        </Box>
      </Portal>
    </>
  );
};

export default NewsDetail;

export async function getStaticProps(context) {
  const queryClient = new QueryClient();
  const { slug } = context.params || {};
  const id = slug.split('.')[1];
  const newsDetail = await API.request({
    baseURL: 'https://api.84go.vn',
    url: `/client/news/${id}`
  });

  await queryClient.prefetchQuery(['GET_NEWS_DETAIL', id], () => getNewsDetail(id));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      newsDetail
    }
  };
}

export async function getStaticPaths() {
  if (process.env.SKIP_BUILD_STATIC_GENERATION) {
    return {
      paths: [],
      fallback: 'blocking'
    };
  }

  const newsList = await API.request({
    baseURL: 'https://api.84go.vn',
    url: '/client/news/list'
  });

  const paths = newsList.content.map((news) => ({
    params: { slug: `${transformSlugURL(news.title)}.${news.id}` }
  }));

  return {
    paths,
    fallback: false
  };
}
