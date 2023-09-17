import { Head, SectionPage } from '@/components';
import InfiniteList from '@/components/infinite-list';
import ModalCancel from '@/components/my-trip/modal-cancel';
import { renderBgStatus, renderStatus } from '@/components/my-trip/my-trip.helper';
import { cancelTripAtom } from '@/components/my-trip/my-trip.recoil';
import { getCarAvatar, renderCarType, renderTime } from '@/components/search/result/subs/result.helper';
import { PADDING_X } from '@/utils/const';
import { getListSeat, getMyTripPrice, getPaymentMethod, useMediaQuery } from '@/utils/helper';
import { Box, Button, Flex, Grid, GridItem, Icon, Text } from '@chakra-ui/react';
import dayjs from 'dayjs';
import Image from 'next/image';
import { useState } from 'react';
import { FaBus, FaCreditCard, FaMapMarkerAlt, FaMoneyBill, FaUsers } from 'react-icons/fa';
import { MdAirlineSeatReclineExtra } from 'react-icons/md';
import { useSetRecoilState } from 'recoil';

const MyTrip = () => {
  const isMobileAndTablet = useMediaQuery('(max-width: 991px)');
  const setCancelTrip = useSetRecoilState(cancelTripAtom);
  const [dataCount, setDataCount] = useState();

  return (
    <Box>
      <Head title="Chuyến đi của tôi | BOOKING" />
      <SectionPage title="Chuyến đi của tôi" />
      <Flex direction="column" px={PADDING_X} gap={10} py={{ xs: 5, lg: 16 }} bgColor="#f5f5f5">
        {dataCount === 0 && (
          <Flex direction="column" px={PADDING_X} gap={10} py={{ xs: 10, lg: 16 }} bgColor="#f5f5f5">
            <Text>Bạn hiện chưa có chuyến đi nào</Text>
          </Flex>
        )}

        <InfiniteList
          queryKey={['GET_MY_TRIP_LIST']}
          requestConfig={{
            url: '/api/trips/me'
          }}
          getData={(data) => setDataCount(data?.length)}
          renderItem={(item) => {
            const {
              id,
              helpFullname,
              helpPhone,
              price,
              routeCar,
              timeslot,
              goDate,
              fromTransit,
              toTransit,
              status = 'khachmoi',
              paymentType,
              quantity,
              fromTransitNote,
              toTransitNote,
              voucher,
              seats
            } = item;
            const { car, route } = routeCar || {};
            const { carrier, type: carType, seat, subType, url: carAvatar } = car || {};
            const { name: carrierName, id: carrierId, url: carrierAvatar } = carrier || {};
            const { fromHour } = timeslot || {};
            const { fromCity, toCity } = route || {};
            const image = carAvatar || carrierAvatar || `/images/carrier${getCarAvatar(carrierId, carType, subType)}`;

            return (
              <Flex
                key={id}
                w="full"
                bgColor="#FFF"
                py={{ xs: 5, lg: 7, '2xl': 8 }}
                px={{ xs: 5, lg: 7, '2xl': 14 }}
                boxShadow="sm"
                borderRadius={5}
                gap={{ xs: 10, lg: 0 }}
                direction={{ xs: 'column', lg: 'row' }}
              >
                <Grid
                  templateColumns={{ xs: 'repeat(2, 1fr)', lg: 'repeat(7, 1fr)' }}
                  gap={{ xs: 10, lg: 10, '2xl': 10 }}
                  w="full"
                >
                  <GridItem colSpan={{ xs: 7, lg: 3, '2xl': 2 }}>
                    <Flex w="full" pr={10} direction="column" gap={3}>
                      <Flex align="center" gap={2}>
                        <Icon as={FaBus} color="primary.1" />
                        <Text color="primary.1" fontWeight={600} fontSize={15}>
                          Nhà xe
                        </Text>
                      </Flex>
                      <Flex gap={3}>
                        <Image
                          src={image}
                          alt={carType}
                          width={isMobileAndTablet ? 80 : 80}
                          height={isMobileAndTablet ? 50 : 50}
                          style={{ borderRadius: 5 }}
                        />
                        <Flex direction="column">
                          <Text fontSize={15} fontWeight={500}>
                            {carrierName}
                          </Text>
                          <Text color="text.2" fontSize={13}>
                            {renderCarType(seat, carType, subType)}
                          </Text>
                        </Flex>
                      </Flex>
                    </Flex>
                    <Flex direction="column" mt={6} gap={4}>
                      <Flex justify="space-between">
                        <Text fontSize={14}>• Người đi xe:</Text>
                        <Text as="span" ml={2} fontWeight={500} color="primary.2" fontSize={14}>
                          {helpFullname}
                        </Text>
                      </Flex>
                      <Flex justify="space-between">
                        <Text fontSize={14}>• Số điện thoại:</Text>
                        <Text as="span" ml={2} fontWeight={500} color="primary.2" fontSize={14}>
                          {helpPhone}
                        </Text>
                      </Flex>
                      <Flex justify="space-between">
                        <Text fontSize={14}>• Thời gian đi:</Text>
                        <Text as="span" ml={2} fontWeight={500} color="primary.2" fontSize={14}>
                          {renderTime(fromHour)} - {dayjs(goDate).format('DD/MM/YYYY')}
                        </Text>
                      </Flex>

                      <Flex justify="space-between">
                        <Text fontSize={14}>• Trạng thái vé:</Text>
                        <Text
                          as="span"
                          bgColor={renderBgStatus(status)}
                          fontWeight={500}
                          color="#FFF"
                          px={2}
                          py={1}
                          ml={2}
                          fontSize={13}
                        >
                          {renderStatus(status)}
                        </Text>
                      </Flex>
                    </Flex>
                  </GridItem>

                  <GridItem
                    colSpan={{ xs: 7, lg: 4, '2xl': 5 }}
                    borderLeft={{ xs: 'none', lg: '1px solid #e6e6e6' }}
                    pl={{ xs: 0, lg: 10 }}
                  >
                    <Flex w="full" gap={5} direction="column">
                      <Flex align="center" gap={2}>
                        <Icon as={FaMapMarkerAlt} color="primary.1" />
                        <Text color="primary.1" fontWeight={600} fontSize={15}>
                          Lộ trình
                        </Text>
                      </Flex>

                      <Flex align="center" justify="space-between" w="full" pos="relative">
                        <Box w="full" h="1px" bgColor="#CCC" pos="absolute" inset={0} m="auto" zIndex={1} />

                        <Flex
                          direction="column"
                          align="center"
                          gap={2}
                          px={{ xs: 1, lg: 4 }}
                          py={2}
                          bgColor="#FFF"
                          zIndex={5}
                        >
                          <Text fontSize={15} fontWeight={700}>
                            {fromCity}
                          </Text>
                          <Text fontSize={14} textAlign="center">
                            {fromTransit.name}
                          </Text>
                          {!!fromTransitNote && (
                            <Text fontSize={14} textAlign="center">
                              ({fromTransitNote})
                            </Text>
                          )}
                        </Flex>

                        <Text px={{ xs: 2, lg: 4 }} py={2} bgColor="#FFF" zIndex={5} fontSize={14}>
                          đến
                        </Text>

                        <Flex
                          direction="column"
                          align="center"
                          gap={2}
                          px={{ xs: 1, lg: 4 }}
                          py={2}
                          bgColor="#FFF"
                          zIndex={5}
                        >
                          <Text fontSize={15} fontWeight={700} textAlign="center">
                            {toCity}
                          </Text>
                          <Text fontSize={14} textAlign="center">
                            {toTransit.name}
                          </Text>
                          {!!toTransitNote && <Text fontSize={14}>({toTransitNote})</Text>}
                        </Flex>
                      </Flex>

                      <Flex
                        mt={{ xs: 2, lg: 5 }}
                        gap={{ xs: 5, lg: 5, '2xl': 10 }}
                        direction={{ xs: 'column', lg: 'row' }}
                      >
                        <Flex flex={{ xs: 1, lg: 2 / 3 }} gap={{ xs: 10, lg: 5, '2xl': 10 }}>
                          <Flex flex={{ xs: 1 / 2 }} direction="column" gap={5}>
                            <Flex align="center" gap={3}>
                              <Icon as={FaMoneyBill} fontSize={18} color="blue.700" />
                              <Text fontWeight={500} fontSize={14}>
                                {getMyTripPrice(seats, voucher, price)}
                              </Text>
                            </Flex>

                            <Flex align="center" gap={3}>
                              <Icon as={FaCreditCard} fontSize={17} color="blue.700" />
                              <Text fontSize={14}>{getPaymentMethod(paymentType)}</Text>
                            </Flex>
                          </Flex>

                          <Flex flex={{ xs: 1 / 2 }} direction="column" gap={5}>
                            <Flex align="center" gap={3}>
                              <Icon as={FaUsers} fontSize={18} color="blue.700" />
                              <Text fontSize={14}>{quantity} chỗ</Text>
                            </Flex>

                            <Flex align="center" gap={3}>
                              <Icon as={MdAirlineSeatReclineExtra} fontSize={19} color="blue.700" />
                              <Text fontSize={14}>{getListSeat(seats, subType)}</Text>
                            </Flex>
                          </Flex>
                        </Flex>

                        <Flex flex={{ xs: 1, lg: 1 / 3 }} align="center" gap={2} justify="flex-end">
                          {!['yeucauhuy', 'hoanthanh', 'dahuy', 'dachuyenkhoanlai'].includes(status) && (
                            <Button
                              variant="outline"
                              colorScheme="red"
                              size="sm"
                              fontWeight={400}
                              onClick={() => setCancelTrip({ show: true, id })}
                            >
                              Yêu cầu huỷ vé
                            </Button>
                          )}
                        </Flex>
                      </Flex>
                    </Flex>
                  </GridItem>
                </Grid>
              </Flex>
            );
          }}
        />
      </Flex>
      <ModalCancel />
    </Box>
  );
};

export default MyTrip;
