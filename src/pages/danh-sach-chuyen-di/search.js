import { Head } from '@/components';
import BookingFilter from '@/components/home/booking/booking-filter';
import { ModalBooking, Result } from '@/components/search';
import { showBookingAtom } from '@/components/search/modal-booking/modal-booking.recoil';
import { Flex } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useResetRecoilState } from 'recoil';

const Search = () => {
  const { query } = useRouter();
  const { from: fromCity, to: toCity, activeForm, startDate: startDateQuery } = query;
  const [isClient, setIsClient] = useState(false);
  const [showForm, setShowForm] = useState(activeForm === 'true');
  const resetShowBooking = useResetRecoilState(showBookingAtom);
  const router = useRouter();
  const queryClient = useQueryClient();

  const onGoBack = useCallback(() => router.push('/'), [router]);

  useEffect(() => {
    return () => {
      queryClient.resetQueries(['GET_TRIP_LIST']);
      resetShowBooking();
    };
  }, [queryClient, resetShowBooking]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Flex direction="column" bgColor="#f5f5f5">
      <Head title="Danh sách chuyến đi | BOOKING" />
      <Flex
        bgColor="#fff"
        px={{ xs: '0px', lg: '180px', '2xl': '350px' }}
        justify="space-between"
        py={4}
        gap={2}
        mb={5}
      >
        <Flex w="full" justify="center" direction="column" align={{ xs: 'flex-start', lg: 'center' }}>
          <BookingFilter />
        </Flex>
      </Flex>

      <Flex px={{ xs: '15px', lg: '180px', '2xl': '350px' }} gap={8}>
        {/* <Flex flex={2 / 7} display={{ xs: 'none', lg: 'flex' }}>
          <Filter />
        </Flex>
        <Flex flex={{ xs: 1, lg: 5 / 7 }}>
          <Result />
        </Flex> */}
        <Result />
      </Flex>
      <ModalBooking />
    </Flex>
  );
};

export default Search;

// export async function getStaticProps() {
//   const queryClient = new QueryClient();

//   await queryClient.prefetchQuery(['GET_TRIP_LIST', 0, 10], getTripList(0, 10));

//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient)
//     }
//   };
// }
