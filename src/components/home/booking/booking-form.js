import { bookingState } from '@/state-management/booking';
import { Box, Button, Flex, Icon, Text } from '@chakra-ui/react';
import { DatePicker } from 'antd';
import locale from 'antd/lib/date-picker/locale/vi_VN';
import dayjs from 'dayjs';
import { identity, isEmpty, pickBy } from 'lodash';
import dynamic from 'next/dynamic';
import { Quicksand } from 'next/font/google';
import { useRouter } from 'next/router';
import { memo, useCallback, useEffect, useState } from 'react';
import { FaInfoCircle, FaRegCalendarAlt } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';
import { useRecoilState } from 'recoil';

const StartPlace = dynamic(() => import('./start-place'), { ssr: false });
const EndPlace = dynamic(() => import('./end-place'), { ssr: false });

const dateFormat = 'DD/MM/YYYY';
const quicksand = Quicksand({ subsets: ['latin', 'vietnamese'] });

const BookingForm = () => {
  const router = useRouter();
  const { startDate: startDateQuery } = router.query;
  const [booking, setBooking] = useRecoilState(bookingState);
  const { isRoundTrip, fromCity = {}, toCity = {}, startDate, endDate } = booking;
  const [needSelectFrom, setNeedSelectFrom] = useState(false);
  const [needSelectTo, setNeedSelectTo] = useState(false);
  const [needSelectTime, setNeedSelectTime] = useState(false);
  const [isChangeDate, setIsChangeDate] = useState(false);

  const onSearch = useCallback(() => {
    if (isEmpty(fromCity)) {
      setNeedSelectFrom(true);
      return;
    }
    if (isEmpty(toCity)) {
      setNeedSelectTo(true);
      return;
    }
    if (isRoundTrip) {
      if (isEmpty(startDate) || isEmpty(endDate)) {
        setNeedSelectTime(true);
        return;
      }
    } else {
      if (!startDate) {
        setNeedSelectTime(true);
        return;
      }
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
    if (
      !startDateQuery &&
      (!startDate || (dayjs(startDate).format('DD/MM/YYYY') !== dayjs().format('DD/MM/YYYY') && !isChangeDate))
    ) {
      setBooking((prev) => ({ ...prev, startDate: dayjs().valueOf() }));
    }
  }, [isChangeDate, setBooking, startDate, startDateQuery]);

  useEffect(() => {
    if (startDateQuery) {
      setBooking((prev) => ({ ...prev, startDate: dayjs(startDateQuery, 'DD-MM-YYYY').valueOf() }));
    }
  }, [setBooking, startDateQuery]);

  return (
    <Box w="full">
      <Flex mt={2} px={{ xs: 2, lg: 10 }} gap={{ xs: 3, lg: 0 }} direction={{ xs: 'column', lg: 'row' }}>
        <Flex
          flex={1 / 3}
          py={3}
          borderRight={needSelectFrom ? undefined : { xs: undefined, lg: 'none' }}
          borderRadius={{ xs: 10, lg: 0 }}
          borderLeftRadius={{ lg: 10 }}
          borderStyle="solid"
          borderWidth={needSelectFrom ? '2px' : '1px'}
          borderColor={needSelectFrom ? 'orange' : '#e6e6e6'}
        >
          <StartPlace setNeedSelect={setNeedSelectFrom} />
        </Flex>
        <Flex
          flex={1 / 3}
          borderStyle="solid"
          borderWidth={needSelectTo ? '2px' : '1px'}
          borderColor={needSelectTo ? 'orange' : '#e6e6e6'}
          py={3}
          borderRadius={{ xs: 10, lg: 0 }}
        >
          <EndPlace setNeedSelect={setNeedSelectTo} />
        </Flex>
        <Flex
          flex={1 / 3}
          borderStyle="solid"
          borderWidth={needSelectTime ? '2px' : '1px'}
          borderColor={needSelectTime ? 'orange' : '#e6e6e6'}
          py={3}
          borderLeft={needSelectTime ? undefined : { xs: undefined, lg: 'none' }}
          borderRadius={{ xs: 10, lg: 0 }}
          borderRightRadius={{ lg: 10 }}
        >
          <Flex direction="column" px={3.5} w="full" className="booking-date-picker">
            <Flex align="center" justify="space-between" mb={1.5}>
              <Flex align="center" gap={2}>
                <Icon as={FaRegCalendarAlt} color="blue.600" fontSize={17} />
                <Text fontWeight={500} fontSize={{ xs: 14, '2xl': 15 }} color="text.2">
                  Thời gian
                </Text>
              </Flex>
              {/* <Flex px={3.5} align="center" gap={3}>
                        <Text fontWeight={500} fontSize={{ xs: 14, '2xl': 15 }} color="text.2">
                          Khứ hồi
                        </Text>
                        <Switch
                          size="md"
                          colorScheme="yellow"
                          isChecked={isRoundTrip}
                          onChange={(e) => setBooking((prev) => ({ ...prev, isRoundTrip: e.target.checked }))}
                        />
                      </Flex> */}
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
                setIsChangeDate(true);
                setNeedSelectTime(!date);
                setBooking((prev) => ({ ...prev, startDate: dayjs(date).valueOf() }));
              }}
            />
            {/* {isRoundTrip ? (
                      <RangePicker
                        className={quicksand.className}
                        format={dateFormat}
                        bordered={false}
                        locale={locale}
                        placeholder={['Ngày đi', 'Ngày về']}
                        defaultValue={[
                          dayjs(dayjs(startDate).format(dateFormat), dateFormat),
                          dayjs(dayjs(endDate).format(dateFormat), dateFormat)
                        ]}
                        onChange={(date) => {
                          setNeedSelectTime(!date);
                          setBooking((prev) => ({
                            ...prev,
                            startDate: date ? dayjs(date[0]).valueOf() : '',
                            endDate: date ? dayjs(date[1]).valueOf() : ''
                          }));
                        }}
                      />
                    ) : (
                      <DatePicker
                        placeholder="Chọn ngày đi"
                        defaultValue={dayjs(dayjs(startDate).format(dateFormat), dateFormat)}
                        bordered={false}
                        className={quicksand.className}
                        locale={locale}
                        format={dateFormat}
                        onChange={(date) => {
                          setNeedSelectTime(!date);
                          setBooking((prev) => ({ ...prev, startDate: dayjs(date).valueOf() }));
                        }}
                      />
                    )} */}
          </Flex>
        </Flex>
      </Flex>

      <Flex
        h="20px"
        mt={1}
        px={{ xs: 2, lg: 10 }}
        gap={{ xs: 3, lg: 0 }}
        direction={{ xs: 'column', lg: 'row' }}
        display={{ xs: 'none', lg: 'flex' }}
      >
        <Flex flex={1 / 3}>
          {needSelectFrom && (
            <Flex align="center" gap={2}>
              <Icon as={FaInfoCircle} color="orange" fontSize={12} />
              <Text color="orange" fontSize={13}>
                Vui lòng chọn nơi xuất phát
              </Text>
            </Flex>
          )}
        </Flex>
        <Flex flex={1 / 3}>
          {needSelectTo && (
            <Flex align="center" gap={2}>
              <Icon as={FaInfoCircle} color="orange" fontSize={12} />
              <Text color="orange" fontSize={13}>
                Vui lòng chọn điểm đến
              </Text>
            </Flex>
          )}
        </Flex>
        <Flex flex={1 / 3}>
          {needSelectTime && (
            <Flex align="center" gap={2}>
              <Icon as={FaInfoCircle} color="orange" fontSize={12} />
              <Text color="orange" fontSize={13}>
                Vui lòng chọn thời gian
              </Text>
            </Flex>
          )}
        </Flex>
      </Flex>

      <Flex justify="center" mt={{ xs: 7, lg: 2, '2xl': 2 }}>
        <Button
          colorScheme="yellow"
          size="md"
          px={14}
          py="22px"
          leftIcon={<FiSearch fontSize={20} />}
          onClick={onSearch}
        >
          Tìm chuyến ngay
        </Button>
      </Flex>
    </Box>
  );
};

export default memo(BookingForm);
