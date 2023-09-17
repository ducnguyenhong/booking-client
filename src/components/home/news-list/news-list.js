import { useQueryNewsList } from '@/queries/news.query';
import { PADDING_X } from '@/utils/const';
import { transformSlugURL } from '@/utils/helper';
import { AspectRatio, Box, Flex, Grid, GridItem, Heading, Image, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { memo } from 'react';

const NewsList = () => {
  const { data: newsList = [] } = useQueryNewsList(1, 5);
  const firstNews = newsList[0] || {};

  return (
    <Box px={PADDING_X} py={{ xs: 10, lg: 20 }}>
      <Flex justify="center" gap={4} align="center" pos="relative">
        <Heading
          as="h3"
          fontSize={{ xs: 22, lg: 28 }}
          fontWeight={700}
          bgGradient="linear(to-l, #00b300, #006600)"
          bgClip="text"
        >
          Tin tức mới
        </Heading>

        <Box display={{ xs: 'none', lg: 'block' }}>
          <Link href="/danh-sach-tin-tuc" style={{ position: 'absolute', top: 10, right: 0 }}>
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

      <Grid
        templateColumns={{ xs: 'repeat(2, 1fr)', lg: 'repeat(7, 1fr)' }}
        mt={{ xs: 5, lg: 10 }}
        gap={{ xs: 5, '2xl': 8 }}
      >
        <GridItem colSpan={{ xs: 2, lg: 4 }}>
          <Link
            href={`/chi-tiet-tin-tuc/${transformSlugURL(firstNews.title)}.${firstNews.id}`}
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
                  src={firstNews.url}
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
                  {firstNews.title}
                </Text>
                <Text
                  fontWeight={400}
                  color="#f5f5f5"
                  fontSize={{ xs: 14, lg: 15, '2xl': 16 }}
                  noOfLines={{ xs: 1, lg: 2 }}
                >
                  {firstNews.description}
                </Text>
              </Flex>
            </Flex>
          </Link>
        </GridItem>
        <GridItem colSpan={{ xs: 2, lg: 3 }}>
          <Grid templateColumns={{ xs: 'repeat(1, 1fr)', lg: 'repeat(2, 1fr)' }} gap={{ xs: 5, '2xl': 8 }}>
            {newsList.slice(1, 5).map((item) => {
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
        <Link href="/danh-sach-tin-tuc">
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

export default memo(NewsList);
