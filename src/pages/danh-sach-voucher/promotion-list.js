import { Portal } from '@/layouts';
import { useQueryVoucherList } from '@/queries/voucher.query';
import { transformSlugURL } from '@/utils/helper';
import { AspectRatio, Box, Button, Flex, Grid, GridItem, Icon, Image, Text } from '@chakra-ui/react';
import { isEmpty } from 'lodash';
import Link from 'next/link';
import { FaChevronRight } from 'react-icons/fa';

const PromotionList = () => {
  const { data = [], isLoading, error } = useQueryVoucherList(1, 8);

  return (
    <Portal isLoading={isLoading} isNoData={!isEmpty(data)} error={error} title="Danh sách voucher">
      <Grid templateColumns="repeat(4, 1fr)" gap={12} mt={10}>
        {data.map((item) => {
          const { id, title, description, url, isComingSoon } = item;

          return (
            <GridItem
              w="full"
              key={id}
              boxShadow="base"
              borderRadius={10}
              overflow="hidden"
              bgColor="#FFF"
              transitionDuration="300ms"
              _hover={{ boxShadow: 'lg' }}
              data-group
            >
              <Link
                href={isComingSoon ? '/' : `/chi-tiet-voucher/${transformSlugURL(title)}.${id}`}
                style={{ width: '100%' }}
              >
                <Box w="full">
                  <AspectRatio w="full" ratio={16 / 9}>
                    <Image w="full" h="full" src={url} alt="route" style={{ objectFit: 'cover' }} />
                  </AspectRatio>
                  <Flex direction="column" px={5} py={4} gap={3}>
                    <Text
                      fontWeight={700}
                      fontSize={18}
                      noOfLines={2}
                      lineHeight="20px"
                      _groupHover={{ color: 'primary.1' }}
                      transitionDuration="250ms"
                    >
                      {title}
                    </Text>
                    <Text fontWeight={500} noOfLines={3} fontSize={15} color="text.2" lineHeight="19px">
                      {description}
                    </Text>
                    <Flex align="center" gap={1} mt={3}>
                      <Text color="primary.2" fontSize={15} fontWeight={500}>
                        Xem chi tiết
                      </Text>
                      <Icon as={FaChevronRight} color="primary.2" fontSize={11} />
                    </Flex>
                  </Flex>
                </Box>
              </Link>
            </GridItem>
          );
        })}
      </Grid>

      <Flex justify="center" mt={10}>
        <Button colorScheme="yellow" variant="outline" px={14}>
          Xem thêm
        </Button>
      </Flex>
    </Portal>
  );
};

export default PromotionList;

// export async function getStaticProps() {
//   const queryClient = new QueryClient();

//   await queryClient.prefetchQuery(['GET_VOUCHER_LIST', 1, 8], getVoucherList(1, 8));

//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient)
//     }
//   };
// }