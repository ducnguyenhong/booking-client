import { bookingState } from '@/state-management/booking';
import { showToast } from '@/utils/helper';
import { Flex, Icon, Text } from '@chakra-ui/react';
import { isEmpty } from 'lodash';
import { memo } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import Select from 'react-select';
import { useRecoilState } from 'recoil';
import { useQueryCityTo } from './booking.query';

const EndPlace = (props) => {
  const { setNeedSelect, isMobileInResult } = props;
  const [booking, setBooking] = useRecoilState(bookingState);
  const { toCity, fromCity } = booking;
  const { data: cityToList } = useQueryCityTo();

  return (
    <Flex className="booking-84go-select-location" px={isMobileInResult ? 0 : 3.5} w="full" direction="column" gap={1}>
      <Flex align="center" gap={2}>
        <Icon as={FaMapMarkerAlt} color="red.600" fontSize={16} />
        <Text fontWeight={500} fontSize={{ xs: 14, '2xl': 15 }} color="text.2">
          Điểm đến
        </Text>
      </Flex>
      <Select
        key={Math.random()}
        options={cityToList}
        value={!isEmpty(toCity) ? toCity : undefined}
        placeholder="Chọn..."
        onChange={(data) => {
          const { label, isNoSeats } = data;
          if (isNoSeats) {
            showToast({
              status: 'error',
              content: `Các chuyến đi từ ${fromCity?.label} đến ${label} hiện đã hết chỗ. Bạn vui lòng thử chọn chuyến đi khác hoặc quay lại vào thời gian khác.`,
              duration: 8000
            });
            return;
          }
          setNeedSelect(false);
          setBooking((prev) => ({ ...prev, toCity: data }));
        }}
      />
    </Flex>
  );
};

export default memo(EndPlace);
