import Head from '@/components/head/head';
import { Portal } from '@/layouts';
import { getVoucherDetail, useQueryVoucher } from '@/queries/voucher.query';
import { transformSlugURL } from '@/utils/helper';
import { Box, Button, Flex, Heading, Image, Text } from '@chakra-ui/react';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { API } from '@ultra-ui/api';
import dayjs from 'dayjs';
import { isEmpty } from 'lodash';
import { useRouter } from 'next/router';

const PromotionDetail = (props) => {
  const { voucherDetail } = props;
  const router = useRouter();
  const { query } = router;
  const { slug = '' } = query;
  const id = slug.split('.')[1];
  const { data = {}, isLoading, error } = useQueryVoucher(id);
  const { title, content, url, expiredDate, description, howtouse } = data;
  const { title: metaTitle, url: metaImage, description: metaDescription } = voucherDetail || {};

  return (
    <>
      <Head title={`${metaTitle} | BOOKING`} image={metaImage} description={metaDescription} />
      <Portal isLoading={isLoading} isNoData={!isEmpty(data)} error={error} breadcrumb="Chi tiết voucher">
        <Box>
          <Image
            w="full"
            h={{ xs: '200px', lg: '450px', '2xl': '550px' }}
            src={url}
            borderRadius={5}
            alt={title}
            objectFit="cover"
          />

          <Flex
            direction="column"
            gap={3}
            justify="center"
            align="center"
            boxShadow="base"
            pos="relative"
            borderRadius={5}
            top={{ xs: -10, lg: -20 }}
            mx={{ xs: 4, lg: 16 }}
            bgGradient="linear(to-l, #089306, #008000)"
            zIndex={5}
            p={{ xs: 3, lg: 7 }}
          >
            <Heading as="h4" color="#FFF" fontSize={{ xs: 16, lg: 24 }}>
              {title}
            </Heading>
            {!!expiredDate ? (
              <>
                <Text color="#FFF" fontSize={{ xs: 13, lg: 16 }}>
                  HSD: {dayjs(expiredDate).format('DD/MM/YYYY')}
                </Text>
                <Text color="#FFF" fontSize={{ xs: 13, lg: 16 }} borderRadius={10} px={8} py={1.5}>
                  Hết hạn sau 1 ngày
                </Text>
              </>
            ) : (
              <Text fontSize={{ xs: 13, lg: 16 }} color="#FFF">
                {description}
              </Text>
            )}
          </Flex>

          {/* <Flex direction="column" gap={3} border="1px solid #e6e6e6" p={6} borderRadius={5}>
          <Text borderLeft="3px solid #089706" pl={3} fontSize={18} fontWeight={600} textTransform="uppercase">
            Áp dụng
          </Text>

          <Flex direction="column" gap={1}>
            <Text>• Khách hàng đặt vé xe khách</Text>
            <Text>• Khách hàng đi nội thành Hà Nội</Text>
          </Flex>
        </Flex> */}

          <Flex direction="column" gap={3} border="1px solid #e6e6e6" p={6} borderRadius={5} mt={10}>
            <Text borderLeft="3px solid #089706" pl={3} fontSize={18} fontWeight={600} textTransform="uppercase">
              Chi tiết
            </Text>

            <Flex direction="column" gap={1}>
              <Box
                fontSize={{ xs: 14, lg: 16 }}
                className="html-content-84-go"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </Flex>
          </Flex>

          {!!howtouse && (
            <Flex direction="column" gap={3} border="1px solid #e6e6e6" p={6} borderRadius={5} mt={10}>
              <Text borderLeft="3px solid #089706" pl={3} fontSize={18} fontWeight={600} textTransform="uppercase">
                Hướng dẫn sử dụng
              </Text>

              <Flex direction="column" gap={1}>
                <Box
                  fontSize={{ xs: 14, lg: 16 }}
                  className="html-content-84-go"
                  dangerouslySetInnerHTML={{ __html: howtouse }}
                />
              </Flex>
            </Flex>
          )}

          <Flex justify="center" mt={10}>
            <Button colorScheme="yellow" px={12} onClick={() => router.push('/')}>
              Sử dụng ngay
            </Button>
          </Flex>
        </Box>
      </Portal>
    </>
  );
};

export default PromotionDetail;

export async function getStaticProps(context) {
  const queryClient = new QueryClient();
  const { slug } = context.params || {};
  const id = slug.split('.')[1];
  const voucherDetail = await API.request({
    baseURL: 'https://api.84go.vn',
    url: `/client/voucher/${id}`
  });

  await queryClient.prefetchQuery(['GET_VOUCHER_DETAIL', id], () => getVoucherDetail(id));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      voucherDetail
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

  const voucherList = await API.request({
    baseURL: 'https://api.84go.vn',
    url: '/client/voucher/list'
  });

  const paths = voucherList.content.map((voucher) => ({
    params: { slug: `${transformSlugURL(voucher.title)}.${voucher.id}` }
  }));

  return {
    paths,
    fallback: false
  };
}
