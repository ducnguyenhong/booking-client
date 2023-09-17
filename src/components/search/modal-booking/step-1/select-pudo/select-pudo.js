import { bookingState } from '@/state-management/booking';
import { Box, Flex } from '@chakra-ui/react';
import { orderBy } from 'lodash';
import { memo, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import PudoList from '../../component/pudo-list';
import Section from '../../component/section';
import { selectedTripAtom } from '../../modal-booking.recoil';

const SelectPUDO = () => {
  const selectedTrip = useRecoilValue(selectedTripAtom);
  const [booking, setBooking] = useRecoilState(bookingState);
  const { startStop, endStop } = booking;

  useEffect(() => {
    if (selectedTrip) {
      const { transit = [], carPrices = [] } = selectedTrip;
      const transitPrices = carPrices.filter((i) => !!i.transitId);
      if (transit.length) {
        const transitSort = orderBy(transit, (o) => o.order);
        const transitFrom = transitSort.filter((i) => i.type === 'diemdon');
        const transitTo = transitSort.filter((i) => i.type === 'diemtra');
        const lastTransit = transitTo[transitTo.length - 1];
        setBooking((prev) => ({
          ...prev,
          startStop: transitFrom[0].id,
          endStop: lastTransit.id,
          transitPrice: lastTransit.type === 'diemtrungchuyen' ? transitPrices : undefined
        }));
      }
    }
  }, [selectedTrip, setBooking]);

  if (!selectedTrip) {
    return null;
  }

  const { transit = [] } = selectedTrip;
  const transitPrices = transit.find((i) => i.type === 'diemtrungchuyen' && endStop === i.id)?.prices || [];
  const transitSort = orderBy(transit, (o) => o.order);

  return (
    <Flex bgColor="#FFF" px={8} py={6} borderRadius={7} direction={{ xs: 'column', lg: 'row' }} gap={{ xs: 5, lg: 14 }}>
      <Flex flex={1 / 2} direction="column" gap={4}>
        <Section title="Chọn điểm đón" />
        <Box>
          <PudoList
            data={transitSort.filter((i) => i.type === 'diemdon')}
            currentStop={startStop}
            onChange={(data) => setBooking((prev) => ({ ...prev, startStop: data.id }))}
            isFrom
          />
        </Box>
      </Flex>

      <Flex flex={1 / 2} direction="column" gap={4}>
        <Section title="Chọn điểm trả khách" />
        <Box>
          <PudoList
            data={transitSort.filter((i) => ['diemtra', 'diemtrungchuyen'].includes(i.type))}
            currentStop={endStop}
            transitPrices={transitPrices}
            onChange={(data) => {
              if (data.type === 'diemtrungchuyen') {
                setBooking((prev) => ({
                  ...prev,
                  endStop: data.id,
                  transitPrice: transit.find((i) => i.type === 'diemtrungchuyen' && data.id === i.id)?.prices
                }));
                return;
              }
              setBooking((prev) => ({ ...prev, endStop: data.id, transitPrice: undefined }));
            }}
            isTo
          />
        </Box>
      </Flex>
    </Flex>
  );
};

export default memo(SelectPUDO);
