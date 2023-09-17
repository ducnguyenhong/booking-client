import { bookingState } from '@/state-management/booking';
import { useMediaQuery } from '@/utils/helper';
import { Box, Button, Flex, Icon, Text } from '@chakra-ui/react';
import { DatePicker } from 'antd';
import locale from 'antd/lib/date-picker/locale/vi_VN';
import dayjs from 'dayjs';
import { identity, isEmpty, pickBy } from 'lodash';
import dynamic from 'next/dynamic';
import { Quicksand } from 'next/font/google';
import { useRouter } from 'next/router';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { useRecoilState } from 'recoil';

const StartPlace = dynamic(() => import('./start-place'), { ssr: false });
const EndPlace = dynamic(() => import('./end-place'), { ssr: false });

const dateFormat = 'DD/MM/YYYY';
const quicksand = Quicksand({ subsets: ['latin', 'vietnamese'] });

const BookingFilter = () => {
  const router = useRouter();
  const { startDate: startDateQuery } = router.query;
  const [booking, setBooking] = useRecoilState(bookingState);
  const { isRoundTrip, fromCity = {}, toCity = {}, startDate, endDate } = booking;
  const [needSelectFrom, setNeedSelectFrom] = useState(false);
  const [needSelectTo, setNeedSelectTo] = useState(false);
  const isMobile = useMediaQuery('(max-width: 576px)');

  const isDisableSearch = useMemo(() => needSelectFrom || needSelectTo, [needSelectFrom, needSelectTo]);

  const onSearch = useCallback(() => {
    if (isEmpty(fromCity)) {
      setNeedSelectFrom(true);
      return;
    }
    if (isEmpty(toCity)) {
      setNeedSelectTo(true);
      return;
    }

    const query = pickBy(
      {
        from: fromCity.label,
        to: toCity.label,
        routeId: toCity.value,
        startDate: dayjs(startDate).format('DD-MM-YYYY'),
        endDate: isRoundTrip ? dayjs(endDate).format('DD-MM-YYYY') : undefined
      },
      identity
    );
    router.push({
      pathname: '/danh-sach-chuyen-di',
      query
    });
  }, [endDate, fromCity, isRoundTrip, router, startDate, toCity]);

  useEffect(() => {
    if (startDateQuery) {
      setBooking((prev) => ({ ...prev, startDate: dayjs(startDateQuery, 'DD-MM-YYYY').valueOf() }));
    }
  }, [setBooking, startDateQuery]);

  return (
    <Box w="full">
      <Flex mt={{ xs: 0, md: 2 }} gap={{ xs: 3, lg: 0 }} direction={{ xs: 'column', lg: 'row' }}>
        <Flex flex={6 / 7} direction={{ xs: 'column', md: 'row' }} gap={{ xs: 4, md: 0 }}>
          <Flex flex={2 / 6} borderBottom={{ xs: '1px solid #e6e6e6', md: 'none' }} mx={{ xs: 7, md: 0 }}>
            <StartPlace setNeedSelect={setNeedSelectFrom} isMobileInResult={isMobile} />
          </Flex>
          <Flex
            flex={2 / 6}
            borderLeft={{ xs: 'none', md: '1px solid #e6e6e6' }}
            borderRight={{ xs: 'none', md: '1px solid #e6e6e6' }}
            pl={{ xs: 0, md: 2 }}
            borderBottom={{ xs: '1px solid #e6e6e6', md: 'none' }}
            mx={{ xs: 7, md: 0 }}
          >
            <EndPlace setNeedSelect={setNeedSelectTo} isMobileInResult={isMobile} />
          </Flex>
          <Flex flex={2 / 6} pl={{ xs: 0, md: 2 }} mx={{ xs: 7, md: 0 }}>
            <Flex direction="column" px={isMobile ? 0 : 3.5} w="full" className="booking-date-picker">
              <Flex align="center" justify="space-between" mb={1.5}>
                <Flex align="center" gap={2}>
                  <Icon as={FaRegCalendarAlt} color="blue.600" fontSize={17} />
                  <Text fontWeight={500} fontSize={{ xs: 14, '2xl': 15 }} color="text.2">
                    Thời gian
                  </Text>
                </Flex>
              </Flex>
              <DatePicker
                placeholder="Chọn ngày đi"
                value={dayjs(dayjs(startDate).format(dateFormat), dateFormat)}
                bordered={false}
                className={quicksand.className}
                locale={locale}
                disabledDate={(current) => current && current < dayjs().subtract(1, 'days').endOf('day')}
                format={dateFormat}
                onChange={(date) => {
                  setBooking((prev) => ({ ...prev, startDate: dayjs(date || undefined).valueOf() }));
                }}
              />
            </Flex>
          </Flex>
        </Flex>

        <Flex flex={{ xs: 1, lg: 1 / 7 }} justify={{ xs: 'center', lg: 'flex-end' }} align="center">
          <Button colorScheme="blue" onClick={onSearch} px={{ xs: 20, lg: 7, '2xl': 10 }} isDisabled={isDisableSearch}>
            Tìm kiếm
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default memo(BookingFilter);
