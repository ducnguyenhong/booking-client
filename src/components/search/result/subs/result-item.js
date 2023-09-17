import { selectedTripAtom, showBookingAtom } from '@/components/search/modal-booking/modal-booking.recoil';
import { showLoginAtom, userInfoAtom } from '@/state-management/recoil';
import { CK_TOKEN } from '@/utils/const';
import { getLabelDuration, optionsTimeDuration, useMediaQuery } from '@/utils/helper';
import { Box, Button, Flex, Grid, GridItem, Icon, Text } from '@chakra-ui/react';
import dayjs from 'dayjs';
import Cookies from 'js-cookie';
import { isEmpty, orderBy } from 'lodash';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { memo, useCallback, useMemo } from 'react';
import { FaCreditCard, FaMapMarkerAlt, FaTicketAlt } from 'react-icons/fa';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { CAR_UTILS, getCarAvatar, getTransitCoach, renderCarType, renderPrice, renderTime } from './result.helper';

const ResultItem = ({ item }) => {
  const setShowBooking = useSetRecoilState(showBookingAtom);
  const setSelectedTrip = useSetRecoilState(selectedTripAtom);
  const { query } = useRouter();
  const { startDate: startDateQuery } = query;
  const userInfo = useRecoilValue(userInfoAtom);
  const token = Cookies.get(CK_TOKEN);
  const setShowLogin = useSetRecoilState(showLoginAtom);
  const isMobileAndTablet = useMediaQuery('(max-width: 991px)');
  const isSmallLaptop = useMediaQuery('(min-width: 991px) and (max-width : 1480px)');

  const hasSlot = useMemo(() => {
    if (item?.isNoSeats) {
      return false;
    }
    if (item?.car?.carrier?.isNoSeats) {
      return false;
    }
    return true;
  }, [item?.car?.carrier?.isNoSeats, item?.isNoSeats]);

  const hasTimeSlotActive = useMemo(() => {
    if (dayjs().format('DD-MM-YYYY') !== startDateQuery) {
      return true;
    }
    const { timeslot = [] } = item || {};
    const timeSlotCanSelect = timeslot.filter((i) => Number(dayjs().format('HHmm')) < i.fromHour);
    return !!timeSlotCanSelect.length;
  }, [item, startDateQuery]);

  const onSelectTrip = useCallback(() => {
    if (isEmpty(userInfo) || !token) {
      setShowLogin(true);
      return;
    }

    setSelectedTrip(item);
    setShowBooking(true);
  }, [item, setSelectedTrip, setShowBooking, setShowLogin, token, userInfo]);

  if (isEmpty(item)) {
    return null;
  }

  const { car, timeslot = [], transit, id, route, carPrices } = item;
  const { fromCity, toCity, duration } = route;
  const { carrier, seat, type: carType, subType, url: carAvatar } = car || {};
  const { name: carrierName, id: carrierId, url: carrierAvatar } = carrier || {};
  const durationTime = optionsTimeDuration.find((i) => i.value === duration) || {};
  const timeslotSort = orderBy(timeslot, (o) => o.fromHour);

  const image = carAvatar || carrierAvatar || `/images/carrier${getCarAvatar(carrierId, carType, subType)}`;

  return (
    <Flex
      key={id}
      px={5}
      py={4}
      bgColor="#FFF"
      borderRadius={7}
      overflow="hidden"
      boxShadow="sm"
      _hover={{ boxShadow: 'lg' }}
      transitionDuration="250ms"
    >
      <Box display={{ xs: 'none', lg: 'block' }}>
        <Image
          src={image}
          alt="carrier"
          width={isSmallLaptop ? 160 : 200}
          height={isSmallLaptop ? 160 : 200}
          style={{
            borderRadius: 5,
            objectFit: 'cover',
            width: isSmallLaptop ? 160 : 200,
            height: isSmallLaptop ? 110 : 133
          }}
        />

        <Box mt={5}>
          <Flex align="center" gap={2}>
            <Box w="2px" h="18px" bgColor="primary.1" />
            <Text fontSize={15} fontWeight={500}>
              Tiện ích trên xe:
            </Text>
          </Flex>
          <Flex gap={4} mt={3} justify="center">
            {CAR_UTILS.map((item) => (
              <Image src={item.icon} width={22} height={22} alt={item.title} title={item.title} key={item.title} />
            ))}
          </Flex>
        </Box>
      </Box>

      <Flex direction="column" flex={1} px={{ xs: 0, lg: 5 }}>
        <Flex justify="space-between">
          <Flex gap={{ xs: 3, lg: 0 }}>
            {isMobileAndTablet && (
              <Image
                src={image}
                alt="carrier"
                width={90}
                height={60}
                style={{ borderRadius: 5, objectFit: 'cover', width: 90, height: 60 }}
              />
            )}
            <Box h="full">
              <Text fontWeight={600} fontSize={17}>
                {carrierName}
              </Text>
              <Text color="text.2" fontSize={14}>
                {renderCarType(seat, carType, subType)}
              </Text>
              {/* <Flex gap={1} align="center">
              <Text fontWeight={600} fontSize={15}>
                {carrierVote}
              </Text>
              <Icon as={FaStar} color="#FFBF12" mt={-1} />
              <Text fontSize={13} color="text.2">
                ({carrierVoteCount} đánh giá)
              </Text>
            </Flex> */}
            </Box>
          </Flex>

          <Flex direction="column" display={{ xs: 'none', lg: 'flex' }}>
            <Flex align="center" gap={2}>
              <Icon as={FaTicketAlt} color="primary.2" />
              <Text fontSize={14} color="primary.2" fontWeight={500}>
                Xác nhận vé nhanh chóng
              </Text>
            </Flex>
            <Flex align="center" gap={2} mt={1}>
              <Icon as={FaCreditCard} color="primary.2" />
              <Text fontSize={14} color="primary.2" fontWeight={500}>
                Không cần thanh toán trước
              </Text>
            </Flex>
            {/* <Text mt={2}>
              Còn{' '}
              <Text as="span" fontWeight={600}>
                {5}
              </Text>{' '}
              chỗ trống
            </Text> */}
          </Flex>
        </Flex>

        <Flex direction="column" display={{ xs: 'flex', lg: 'none' }} mt={3}>
          <Flex align="center" gap={2}>
            <Icon as={FaTicketAlt} color="primary.2" />
            <Text fontSize={14} color="primary.2" fontWeight={500}>
              Xác nhận vé nhanh chóng
            </Text>
          </Flex>
          <Flex align="center" gap={2} mt={1}>
            <Icon as={FaCreditCard} color="primary.2" />
            <Text fontSize={14} color="primary.2" fontWeight={500}>
              Không cần thanh toán trước
            </Text>
          </Flex>
          {/* <Text mt={2}>
              Còn{' '}
              <Text as="span" fontWeight={600}>
                {5}
              </Text>{' '}
              chỗ trống
            </Text> */}
        </Flex>

        {isMobileAndTablet && (
          <Box mt={3}>
            <Flex align="center" gap={2}>
              <Box w="2px" h="18px" bgColor="primary.1" />
              <Text fontSize={15} fontWeight={500}>
                Tiện ích trên xe:
              </Text>
            </Flex>
            <Flex gap={4} mt={3} justify="center">
              {CAR_UTILS.map((item) => (
                <Image src={item.icon} width={22} height={22} alt={item.title} title={item.title} key={item.title} />
              ))}
            </Flex>
          </Box>
        )}

        <Flex mt={3} gap={2} flex={1} direction="column" w="full">
          <Flex align="center" gap={2}>
            <Box w="2px" h="18px" bgColor="primary.1" />
            <Text fontSize={15} fontWeight={500}>
              Các giờ xe đi:
            </Text>
          </Flex>
          <Grid
            templateColumns={{ xs: 'repeat(4, 1fr)', lg: 'repeat(5, 1fr)', '2xl': 'repeat(6, 1fr)' }}
            w="full"
            rowGap={4}
            mt={2}
          >
            {!!timeslotSort.length &&
              timeslotSort.map((item, index) => {
                let isActive = Number(dayjs().format('HHmm')) < item.fromHour;
                if (dayjs().format('DD-MM-YYYY') !== startDateQuery) {
                  isActive = true;
                }
                return (
                  <GridItem key={index} mb={2}>
                    <Flex>
                      <Text
                        as="span"
                        fontWeight={500}
                        fontSize={{ xs: 14, lg: 14 }}
                        color="#FFF"
                        px={2}
                        py={0.5}
                        bgColor={isActive ? 'primary.2' : 'gray.400'}
                      >
                        {renderTime(item.fromHour)}{' '}
                      </Text>
                    </Flex>
                  </GridItem>
                );
              })}
          </Grid>
        </Flex>

        <Flex justify="space-between" mt={4}>
          <Flex align="center" gap={4}>
            <Flex direction="column" align="center" justify="center" gap={2} h="full">
              <Text color="text.2" fontSize={13}>
                {getLabelDuration(durationTime)}
              </Text>
            </Flex>

            <Flex direction="column" gap={1}>
              <Flex align="center" gap={4}>
                <Flex w={4} h={4} bgColor="primary.1" borderRadius="full" align="center" justify="center">
                  <Flex w={1.5} h={1.5} bgColor="#FFF" borderRadius="full" />
                </Flex>
                <Text fontWeight={500} color="#4d4d4d" fontSize={{ xs: 14, lg: 15 }} noOfLines={2}>
                  {carType === 'khach' ? getTransitCoach(transit, 'min', fromCity) : fromCity}
                </Text>
              </Flex>

              <Flex align="center" gap={4}>
                <Flex gap={1} direction="column" ml={2}>
                  {[1, 2, 3].map((item) => (
                    <Box key={item} w="1px" h="4px" bgColor="#CCC" />
                  ))}
                </Flex>
                <Flex gap={1} direction="column">
                  {[1, 2, 3].map((item) => (
                    <Box key={item} w="1px" h="4px" bgColor="#FFF" />
                  ))}
                </Flex>
              </Flex>

              <Flex align="center" gap={4}>
                <Icon as={FaMapMarkerAlt} color="red.600" fontSize={16} />
                <Text fontWeight={500} color="#4d4d4d" fontSize={{ xs: 14, lg: 15 }} noOfLines={2}>
                  {carType === 'khach' ? getTransitCoach(transit, 'max', toCity) : toCity}
                </Text>
              </Flex>
            </Flex>
            {/* <Flex direction="column" align="center" justify="space-between" h="full" py={1}>
              
              
            </Flex>
            <Flex direction="column" justify="space-between" h="full">
              
             
            </Flex> */}
          </Flex>

          <Flex direction="column" justify="space-between" align="flex-end" gap={4}>
            <Text fontWeight={700} fontSize={{ xs: 15, lg: 18 }} color="blue.700">
              {renderPrice(carPrices)}
            </Text>

            <Button
              colorScheme="yellow"
              px={{ xs: 6, lg: 10 }}
              onClick={onSelectTrip}
              isDisabled={!hasTimeSlotActive || !hasSlot}
            >
              Đặt vé
            </Button>
          </Flex>
        </Flex>
        {!hasTimeSlotActive && (
          <Text mt={3} color="red">
            Đã quá thời gian xuất phát của nhà xe
          </Text>
        )}
        {!hasSlot && (
          <Text mt={3} color="red">
            Đã hết chỗ
          </Text>
        )}
      </Flex>
    </Flex>
  );
};

export default memo(ResultItem);
