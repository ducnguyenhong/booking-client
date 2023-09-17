import { bookingState } from '@/state-management/booking';
import { Flex, Text } from '@chakra-ui/react';
import { isEmpty } from 'lodash';
import { memo } from 'react';
import Select from 'react-select';
import { useRecoilState } from 'recoil';
import { useQueryCityFrom } from './booking.query';

const StartPlace = (props) => {
  const { setNeedSelect, isMobileInResult } = props;
  const [booking, setBooking] = useRecoilState(bookingState);
  const { fromCity } = booking;
  const { data: cityFromList } = useQueryCityFrom();

  return (
    <>
      <Flex
        w="full"
        direction="column"
        gap={1}
        px={isMobileInResult ? 0 : 3.5}
        className="booking-84go-select-location"
      >
        <Flex align="center" gap={2}>
          <Flex w={4} h={4} bgColor="primary.1" borderRadius="full" align="center" justify="center">
            <Flex w={1.5} h={1.5} bgColor="#FFF" borderRadius="full" />
          </Flex>
          <Text fontWeight={500} fontSize={{ xs: 14, '2xl': 15 }} color="text.2">
            Nơi xuất phát
          </Text>
        </Flex>
        <Select
          options={cityFromList}
          value={!isEmpty(fromCity) ? fromCity : undefined}
          placeholder="Chọn..."
          onChange={(data) => {
            setNeedSelect(false);
            setBooking((prev) => ({ ...prev, fromCity: data, toCity: undefined }));
          }}
        />
      </Flex>
    </>
  );
};

export default memo(StartPlace);
