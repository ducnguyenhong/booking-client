import Slider from '@/components/slider';
import { useQueryRouteProminent } from '@/queries/route.query';
import { bookingState } from '@/state-management/booking';
import { PADDING_X } from '@/utils/const';
import { AspectRatio, Box, Flex, Heading, Image, Text } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { orderBy } from 'lodash';
import { useRouter } from 'next/router';
import { memo, useCallback } from 'react';
import { useSetRecoilState } from 'recoil';

const RouteList = () => {
  const { data = [] } = useQueryRouteProminent();
  const router = useRouter();
  const dataSort = orderBy(data, (o) => o.hotOrder);
  const setBooking = useSetRecoilState(bookingState);

  const onSearch = useCallback(
    (item) => {
      const { fromCity, toCity } = item;
      const query = {
        from: fromCity.label,
        to: toCity.label,
        startDate: dayjs().format('DD-MM-YYYY')
      };
      setBooking((prev) => ({ ...prev, fromCity, toCity, startDate: dayjs().valueOf() }));

      router.push({
        pathname: '/danh-sach-chuyen-di',
        query
      });
    },
    [router, setBooking]
  );

  return (
    <Box px={PADDING_X} py={{ xs: 10, lg: 20 }} pt={32}>
      <Flex justify="center" gap={4} align="center">
        <Heading
          as="h3"
          fontSize={{ xs: 22, lg: 28 }}
          fontWeight={700}
          bgGradient="linear(to-l, #00b300, #006600)"
          bgClip="text"
        >
          Các tuyến vận tải nổi bật
        </Heading>
      </Flex>

      <Box mt={{ xs: 5, lg: 10 }}>
        <Slider
          data={dataSort}
          renderItem={(item, index) => {
            const { fromCity, toCity, id, url } = item;
            return (
              <Flex
                onClick={() => onSearch(item)}
                key={id}
                borderRadius={7}
                overflow="hidden"
                cursor="pointer"
                data-group
                ml={index === 0 ? '1px' : 4}
                mr={4}
                h="99%"
              >
                <AspectRatio ratio={4 / 3} w="full">
                  <Flex pos="relative">
                    <Image
                      w="full"
                      h="full"
                      src={url}
                      alt="route"
                      objectFit="cover"
                      transitionDuration="300ms"
                      style={{ objectFit: 'cover' }}
                      _groupHover={{ transform: 'scale(1.05)' }}
                    />

                    <Box
                      w="full"
                      h="full"
                      bgGradient="linear(to-b, transparent 60%, cyan.800)"
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
                      px={{ xs: 3, lg: 5 }}
                      py={3}
                      zIndex={4}
                    >
                      <Text fontWeight={700} color="#FFF" fontSize={{ xs: 14, lg: 16 }}>
                        {fromCity} → {toCity}
                      </Text>
                    </Flex>
                  </Flex>
                </AspectRatio>
              </Flex>
            );
          }}
        />
      </Box>
    </Box>
  );
};

export default memo(RouteList);
