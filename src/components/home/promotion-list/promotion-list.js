import Slider from '@/components/slider';
import { useQueryVoucherList } from '@/queries/voucher.query';
import { PADDING_X } from '@/utils/const';
import { transformSlugURL } from '@/utils/helper';
import { AspectRatio, Box, Flex, Grid, GridItem, Heading, Icon, Image, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { memo } from 'react';
import { FaChevronRight } from 'react-icons/fa';

const PromotionList = () => {
  const { data: voucherList = [] } = useQueryVoucherList(1, 5);
  const firstVoucher = voucherList[0] || {};

  return (
    <Box px={PADDING_X} py={{ xs: 10, lg: 20 }} bgColor="#FAFAFA">
      <Flex justify="center" gap={2.5} align="center" pos="relative">
        <Heading
          as="h3"
          fontSize={{ xs: 22, lg: 28 }}
          fontWeight={700}
          bgGradient="linear(to-l, #00b300, #006600)"
          bgClip="text"
        >
          Ưu đãi HOT, tham gia ngay!
        </Heading>
        <Box display={{ xs: 'none', lg: 'block' }}>
          <Link href="/danh-sach-voucher" style={{ position: 'absolute', top: 10, right: 0 }}>
            <Text
              color="primary.2"
              fontSize={16}
              fontWeight={600}
              transitionDuration="250ms"
              borderBottom="1px solid"
              borderColor="primary.1"
              _hover={{ color: 'primary.1' }}
            >
              Xem tất cả
            </Text>
          </Link>
        </Box>
      </Flex>

      <Box mt={{ xs: 5, lg: 10 }} display={{ xs: 'none', md: 'block' }}>
        <Slider
          data={voucherList}
          renderItem={(item, index) => {
            const { id, title, description, url, isComingSoon } = item;

            return (
              <Box
                key={id}
                boxShadow="base"
                borderRadius={10}
                overflow="hidden"
                bgColor="#FFF"
                transitionDuration="300ms"
                _hover={{ boxShadow: 'lg' }}
                ml={index === 0 ? '1px' : 4}
                mr={4}
                data-group
                h="99%"
              >
                <Link
                  href={isComingSoon ? '/' : `/chi-tiet-voucher/${transformSlugURL(title)}.${id}`}
                  style={{ width: '100%' }}
                >
                  <Box w="full">
                    <AspectRatio w="full" ratio={16 / 9}>
                      <Image w="full" h="full" src={url} alt="route" style={{ objectFit: 'cover' }} />
                    </AspectRatio>
                    <Flex direction="column" px={{ xs: 3, lg: 5 }} py={{ xs: 3, lg: 4 }} gap={{ xs: 1, lg: 1 }}>
                      <Text
                        fontWeight={700}
                        fontSize={{ xs: 15, lg: 18 }}
                        noOfLines={2}
                        h="48px"
                        lineHeight={{ xs: '19px', lg: '24px' }}
                        _groupHover={{ color: 'primary.1' }}
                        transitionDuration="250ms"
                      >
                        {title}
                      </Text>
                      <Text
                        h={{ xs: '40px', lg: '48px' }}
                        fontSize={{ xs: 13, lg: 15 }}
                        color="text.2"
                        mt={{ xs: 1, lg: 3 }}
                        noOfLines={2}
                      >
                        {description}
                      </Text>
                      <Flex align="center" gap={1} mt={{ xs: 2, lg: 3 }}>
                        <Text color="primary.2" fontSize={{ xs: 14, lg: 15 }} fontWeight={500}>
                          Xem chi tiết
                        </Text>
                        <Icon as={FaChevronRight} color="primary.2" fontSize={11} />
                      </Flex>
                    </Flex>
                  </Box>
                </Link>
              </Box>
            );
          }}
        />
      </Box>

      <Grid
        templateColumns={{ xs: 'repeat(2, 1fr)', lg: 'repeat(7, 1fr)' }}
        mt={{ xs: 5, lg: 10 }}
        gap={{ xs: 5, '2xl': 8 }}
        display={{ xs: 'grid', md: 'none' }}
      >
        <GridItem colSpan={{ xs: 2, lg: 4 }}>
          <Link
            href={
              firstVoucher.isComingSoon
                ? '/'
                : `/chi-tiet-voucher/${transformSlugURL(firstVoucher.title)}.${firstVoucher.id}`
            }
            style={{ width: '100%' }}
          >
            <Flex
              pos="relative"
              boxShadow="sm"
              _hover={{ boxShadow: 'md' }}
              transitionDuration="300ms"
              borderRadius={10}
              overflow="hidden"
              h="100%"
            >
              <AspectRatio h="100%" w="100%" ratio={{ xs: 4 / 3, lg: 16 / 9 }}>
                <Image
                  w="full"
                  h="full"
                  src={firstVoucher.url}
                  alt="route"
                  objectFit="cover"
                  transitionDuration="300ms"
                  border="1px solid #e6e6e6"
                  style={{ objectFit: 'cover' }}
                  _groupHover={{ transform: 'scale(1.05)' }}
                />
              </AspectRatio>

              <Box
                w="full"
                h="full"
                bgGradient="linear(to-b, transparent 40%, #262626)"
                pos="absolute"
                top={0}
                left={0}
                zIndex={2}
              />

              <Flex
                justify="center"
                mt={4}
                direction="column"
                pos="absolute"
                bottom={0}
                left={0}
                p={{ xs: 3, lg: 6 }}
                zIndex={4}
                gap={2}
              >
                <Text fontWeight={700} color="#FFF" fontSize={{ xs: 16, lg: 17, '2xl': 18 }} noOfLines={2}>
                  {firstVoucher.title}
                </Text>
                <Text
                  fontWeight={400}
                  color="#f5f5f5"
                  fontSize={{ xs: 14, lg: 15, '2xl': 16 }}
                  noOfLines={{ xs: 1, lg: 2 }}
                >
                  {firstVoucher.description}
                </Text>
              </Flex>
            </Flex>
          </Link>
        </GridItem>
        <GridItem colSpan={{ xs: 2, lg: 3 }}>
          <Grid templateColumns={{ xs: 'repeat(1, 1fr)', lg: 'repeat(2, 1fr)' }} gap={{ xs: 5, '2xl': 8 }}>
            {voucherList.slice(1, 5).map((item) => {
              const { id, title, url } = item;

              return (
                <GridItem
                  key={id}
                  boxShadow="sm"
                  _hover={{ boxShadow: 'md' }}
                  transitionDuration="300ms"
                  borderRadius={10}
                  overflow="hidden"
                >
                  <Link href={`/chi-tiet-tin-tuc/${transformSlugURL(title)}.${id}`} style={{ width: '100%' }}>
                    <Flex direction={{ xs: 'row', lg: 'column' }} w="full">
                      <AspectRatio w={{ xs: 32, lg: 'full' }} ratio={{ xs: 4 / 3, lg: 16 / 9 }}>
                        <Image border="1px solid #e6e6e6" w="full" h="full" src={url} alt="route" objectFit="cover" />
                      </AspectRatio>
                      <Flex
                        direction="column"
                        flex={1}
                        px={{ xs: 3, '2xl': 5 }}
                        py={{ xs: 3, '2xl': 4 }}
                        bgColor="#f9f9f9"
                      >
                        <Text
                          fontWeight={700}
                          fontSize={{ xs: 15, '2xl': 16 }}
                          lineHeight={{ xs: '19px', '2xl': '22px' }}
                          noOfLines={2}
                          h={{ xs: '40px', lg: '48px' }}
                        >
                          {title}
                        </Text>
                      </Flex>
                    </Flex>
                  </Link>
                </GridItem>
              );
            })}
          </Grid>
        </GridItem>
      </Grid>

      <Flex justify="center" display={{ xs: 'flex', lg: 'none' }} mt={5}>
        <Link href="/danh-sach-voucher">
          <Text
            color="primary.2"
            fontSize={16}
            fontWeight={600}
            transitionDuration="250ms"
            borderBottom="1px solid"
            borderColor="primary.1"
            _hover={{ color: 'primary.1' }}
          >
            Xem thêm
          </Text>
        </Link>
      </Flex>
    </Box>
  );
};

export default memo(PromotionList);
