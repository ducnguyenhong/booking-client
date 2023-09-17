import InfiniteList from '@/components/infinite-list';
import { bookingState } from '@/state-management/booking';
import { Box, Flex, Text } from '@chakra-ui/react';
import dayjs from 'dayjs';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { memo, useMemo, useState } from 'react';
import { useRecoilValue } from 'recoil';
import ResultItem from './subs/result-item';

const Result = () => {
  const { query } = useRouter();
  const { startDate: startDateQuery, routeId: routeIdQuery } = query;
  const booking = useRecoilValue(bookingState);
  const { toCity, startDate } = booking;
  const [dataCount, setDataCount] = useState();

  const goDate = useMemo(() => {
    if (startDateQuery) {
      return dayjs(startDateQuery, 'DD-MM-YYYY').valueOf();
    }
    return startDate;
  }, [startDate, startDateQuery]);

  const routeId = routeIdQuery || toCity?.value;

  return (
    <Box borderRadius={7} w="full" overflow="hidden">
      {dataCount === 0 ? (
        <Flex direction="column" align="center" gap={5} bgColor="#FFF" py={10} px={5} mb={10}>
          <Image src="/images/404.png" alt="404" width={400} height={300} style={{ objectFit: 'cover' }} />
          <Text fontWeight={600} fontSize={18}>
            Chưa có chuyến đi phù hợp
          </Text>
          <Text textAlign="center">Hãy thử thay đổi thời gian đi, bạn có thể tìm kiếm chuyến đi phù hợp hơn!</Text>
        </Flex>
      ) : (
        <>
          <Box mt={5} bgGradient="linear(to-l, #fef501, #FEF959,#fef501)" px={5} py={4}>
            <Text fontSize={16} fontWeight={600}>
              Đã tìm thấy{' '}
              <Text as="span" fontWeight={700}>
                {dataCount}
              </Text>{' '}
              tuyến xe phù hợp!
            </Text>
          </Box>
          {/* <Flex bgColor="#FFF" px={5} py={5} align="center" gap={7} boxShadow="sm" display={{ xs: 'none', lg: 'flex' }}>
        <Text fontWeight={600}>Sắp xếp theo:</Text>

        <Button
          size="sm"
          bgColor="#cdfdd5"
          color="primary.2"
          _hover={{ bgColor: '#cdfdd5' }}
          _active={{ bgColor: '#cdfdd5' }}
          cursor="default"
        >
          Giá thấp nhất
        </Button>

        <Button
          size="sm"
          bgColor="transparent"
          _hover={{ bgColor: '#f2f2f2' }}
          _active={{ bgColor: '#e6e6e6' }}
          fontWeight={500}
        >
          Thời gian đi ngắn nhất
        </Button>
      </Flex> */}

          <Flex direction="column" gap={7} my={10}>
            <InfiniteList
              queryKey={['GET_TRIP_LIST']}
              requestConfig={{
                url: '/api/routes/search-trip',
                params: { routeId, goDate }
              }}
              renderItem={(item) => <ResultItem item={item} />}
              getData={(data) => setDataCount(data?.length)}
            />
          </Flex>
        </>
      )}
    </Box>
  );
};

export default memo(Result);
