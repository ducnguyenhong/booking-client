import { getCarAvatar, renderCarType, renderTime } from '@/components/search/result/subs/result.helper';
import { bookingState } from '@/state-management/booking';
import { Box, Flex, Grid, GridItem, Icon, Text } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { orderBy } from 'lodash';
import Image from 'next/image';
import { memo, useEffect } from 'react';
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from 'react-icons/md';
import { useRecoilState, useRecoilValue } from 'recoil';
import Section from '../../component/section';
import SelectCount from '../../component/select-count';
import { selectedTripAtom } from '../../modal-booking.recoil';

const SelectSlot = () => {
  const selectedTrip = useRecoilValue(selectedTripAtom);
  const [booking, setBooking] = useRecoilState(bookingState);
  const { startAt, startDate } = booking;

  useEffect(() => {
    const { timeslot = [] } = selectedTrip || {};
    if (timeslot.length) {
      const timeslotCanSelect =
        dayjs().format('DD/MM/YYYY') !== dayjs(startDate).format('DD/MM/YYYY')
          ? timeslot
          : timeslot.filter((i) => Number(dayjs().format('HHmm')) < i.fromHour);
      setBooking((prev) => ({ ...prev, startAt: timeslotCanSelect?.[0]?.id }));
    }
  }, [selectedTrip, setBooking, startDate]);

  if (!selectedTrip) {
    return null;
  }

  const { car, timeslot = [] } = selectedTrip;
  const { carrier, seat, type: carType, subType, url: carAvatar } = car || {};
  const { name: carrierName, id: carrierId, url: carrierAvatar } = carrier || {};
  const timeslotSort = orderBy(timeslot, (o) => o.fromHour);
  const image = carAvatar || carrierAvatar || `/images/carrier${getCarAvatar(carrierId, carType, subType)}`;

  return (
    <Flex bgColor="#FFF" borderRadius={7} px={8} py={6} direction="column">
      <Flex>
        <Flex flex={{ xs: 1, lg: 1 / 2 }} direction="column">
          <Flex>
            <Image src={image} alt="carrier" width={120} height={80} style={{ objectFit: 'cover', borderRadius: 5 }} />
            <Flex direction="column" gap={1} px={4}>
              <Text fontSize={15} fontWeight={700}>
                {carrierName}
              </Text>
              <Text mt={1} fontSize={{ xs: 13, lg: 14 }}>
                • {renderCarType(seat, carType, subType)}
              </Text>
              <Text fontSize={{ xs: 13, lg: 14 }}>
                • {carType === 'limousine' ? 'Đưa đón tại nhà' : 'Đưa đón tại các điểm cố định'}
              </Text>
            </Flex>
          </Flex>
        </Flex>

        <Flex flex={1 / 2} display={{ xs: 'none', lg: 'block' }}>
          <SelectCount />
        </Flex>
      </Flex>

      <Box mt={5} display={{ xs: 'block', lg: 'none' }}>
        <SelectCount />
      </Box>

      <Box mt={carType === 'limousine' ? 0 : 5} pt={{ xs: 4, lg: 0 }}>
        <Section title="Chọn giờ đi" />
        <Grid
          rowGap={{ xs: 4, lg: 5 }}
          columnGap={4}
          templateColumns={{ xs: 'repeat(3, 1fr)', lg: 'repeat(5, 1fr)' }}
          mt={3}
        >
          {!!timeslotSort.length &&
            timeslotSort.map((item) => {
              const { id, fromHour } = item;
              const isActive = startAt === id;
              let canSelect = Number(dayjs().format('HHmm')) < fromHour;
              if (dayjs().format('DD/MM/YYYY') !== dayjs(startDate).format('DD/MM/YYYY')) {
                canSelect = true;
              }

              return (
                <GridItem
                  key={id}
                  onClick={() => {
                    if (!canSelect) {
                      return;
                    }
                    setBooking((prev) => ({ ...prev, startAt: id }));
                  }}
                  cursor="pointer"
                >
                  <Flex align="center" gap={2}>
                    <Icon
                      as={isActive ? MdRadioButtonChecked : MdRadioButtonUnchecked}
                      fontSize={20}
                      color={isActive ? 'primary.1' : '#CCC'}
                    />
                    <Text
                      as="span"
                      color="#FFF"
                      bgColor={canSelect ? 'primary.2' : 'gray.400'}
                      w="50px"
                      textAlign="center"
                      fontWeight={500}
                      fontSize={{ xs: 13, lg: 15 }}
                    >
                      {renderTime(fromHour)}
                    </Text>
                  </Flex>
                </GridItem>
              );
            })}
        </Grid>
      </Box>
    </Flex>
  );
};

export default memo(SelectSlot);
