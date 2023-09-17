import { bookingState } from '@/state-management/booking';
import { formatCurrency, getFinalPrice, getSeatType, showToast } from '@/utils/helper';
import { Box, Flex, Icon, Input, Text } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { isEmpty } from 'lodash';
import Image from 'next/image';
import { memo, useEffect, useMemo } from 'react';
import { FaCalendarAlt, FaChevronRight, FaMapMarkerAlt } from 'react-icons/fa';
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from 'react-icons/md';
import { useRecoilState, useRecoilValue } from 'recoil';
import { getCarAvatar, renderCarType, renderTime } from '../../result/subs/result.helper';
import Section from '../component/section';
import { seatsAtom, selectedTripAtom, showModalVoucherAtom } from '../modal-booking.recoil';
import ModalVoucher from './modal-voucher';

const Step3 = () => {
  const [showModalVoucher, setShowModalVoucher] = useRecoilState(showModalVoucherAtom);
  const selectedTrip = useRecoilValue(selectedTripAtom);
  const [booking, setBooking] = useRecoilState(bookingState);
  const {
    seatCount,
    startAt,
    startStop,
    endStop,
    fromCity,
    toCity,
    helpFullName,
    helpPhone,
    helpEmail,
    helpNote,
    paymentMethod,
    voucher,
    startDate,
    transitPrice
  } = booking;
  const { car, timeslot = [], transit = [] } = selectedTrip || {};
  const { carrier, seat, type: carType, subType, url: carAvatar } = car || {};
  const { name: carrierName, id: carrierId, url: carrierAvatar } = carrier || {};
  const seats = useRecoilValue(seatsAtom);

  const dataSeats = useMemo(() => {
    if (!transitPrice) {
      return seats;
    }
    return seats.map((item) => {
      const currentSeatType = transitPrice.find((i) => i.seatType === item.seatType);
      return { ...item, price: currentSeatType.price };
    });
  }, [seats, transitPrice]);

  const PAYMENT_METHOD = [
    {
      label: 'Chuyển khoản ngân hàng',
      value: 'chuyenkhoan'
    },
    {
      label: 'Thanh toán khi lên xe',
      value: 'trasau'
    }
  ];

  useEffect(() => {
    if (!booking.paymentMethod) {
      setBooking((prev) => ({ ...prev, paymentMethod: 'chuyenkhoan' }));
    }
  }, [booking.paymentMethod, setBooking]);

  if (!selectedTrip) {
    return null;
  }

  const starTime = timeslot.find((i) => i.id === startAt);
  const { fromHour } = starTime || {};
  const startPlace = transit.find((i) => i.id === startStop);
  const endPlace = transit.find((i) => i.id === endStop);

  const image = carAvatar || carrierAvatar || `/images/carrier${getCarAvatar(carrierId, carType, subType)}`;

  return (
    <Box>
      <Box p={6} borderRadius={7} bgColor="#FFF">
        <Flex align="center" gap={3}>
          <Section title="Thông tin vé xe" />
          <Text mt={-0.5}>({seatCount} ghế)</Text>
        </Flex>
        <Flex mt={4} direction={{ xs: 'column', lg: 'row' }} gap={{ xs: 5, lg: 0 }}>
          <Flex flex={1 / 2}>
            <Image src={image} alt="carrier" width={120} height={80} style={{ objectFit: 'cover', borderRadius: 5 }} />
            <Box px={4}>
              <Text fontSize={15} fontWeight={600}>
                {carrierName}
              </Text>
              <Text color="text.2" fontSize={14}>
                {renderCarType(seat, carType, subType)}
              </Text>
            </Box>
          </Flex>

          <Flex align="center" gap={6} h="110px" flex={1 / 2} justify={{ xs: 'center', lg: 'flex-start' }}>
            <Flex direction="column" align="center" gap={1} h="full">
              <Flex align="center" gap={2}>
                <Icon as={FaCalendarAlt} color="text.2" />{' '}
                <Text fontSize={14} fontWeight={600}>
                  {renderTime(fromHour)}
                </Text>
              </Flex>
              <Text fontWeight={600} fontSize={14}>
                {dayjs(startDate).format('DD/MM/YYYY')}
              </Text>
            </Flex>
            <Flex direction="column" align="center" justify="space-between" h="full" py={1}>
              <Flex w={4} h={4} bgColor="primary.1" borderRadius="full" align="center" justify="center">
                <Flex w={1.5} h={1.5} bgColor="#FFF" borderRadius="full" />
              </Flex>
              <Flex gap={1} direction="column">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <Box key={item} w="1px" h="4px" bgColor="#CCC" />
                ))}
              </Flex>
              <Icon as={FaMapMarkerAlt} color="red.600" fontSize={16} />
            </Flex>
            <Flex direction="column" justify="space-between" h="full">
              <Flex direction="column">
                <Text fontWeight={600} color="#4d4d4d" mt={-2} fontSize={14}>
                  {startPlace?.name}
                </Text>
                <Text color="text.2" fontSize={14} mt={-0.5}>
                  {fromCity?.label}
                </Text>
              </Flex>
              <Flex direction="column" mt={{ xs: 2, lg: 10 }}>
                <Text fontWeight={600} color="#4d4d4d" fontSize={14}>
                  {endPlace?.name}
                </Text>
                <Text color="text.2" fontSize={14} mt={-0.5}>
                  {toCity?.label}
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Box>

      <Box p={6} borderRadius={7} bgColor="#FFF" mt={6}>
        <Flex direction={{ xs: 'column', lg: 'row' }} gap={10}>
          <Flex flex={{ xs: 1, lg: 3 / 5 }} direction="column">
            <Section title="Thông tin liên hệ" />

            <Flex
              direction="column"
              mt={3}
              gap={2}
              mx="auto"
              border="1px solid #e6e6e6"
              borderRadius={5}
              p={5}
              w="full"
            >
              <Flex align="center" justify="space-between">
                <Text fontSize={15} color="text.2">
                  Tên
                </Text>
                <Text fontSize={15} fontWeight={600}>
                  {helpFullName}
                </Text>
              </Flex>
              <Flex align="center" justify="space-between">
                <Text fontSize={15} color="text.2">
                  SĐT
                </Text>
                <Text fontSize={15} fontWeight={600}>
                  {helpPhone}
                </Text>
              </Flex>
              <Flex align="center" justify="space-between">
                <Text fontSize={15} color="text.2">
                  Email
                </Text>
                <Text fontSize={15} fontWeight={600}>
                  {helpEmail}
                </Text>
              </Flex>
              <Flex align="center" justify="space-between">
                <Text fontSize={15} color="text.2">
                  Ghi chú
                </Text>
                <Text fontSize={15} fontWeight={600}>
                  {helpNote}
                </Text>
              </Flex>
            </Flex>
          </Flex>

          <Flex flex={{ xs: 1, lg: 2 / 5 }} direction="column">
            <Section title="Mã giới thiệu (Nếu có)" />

            <Input
              mt={3}
              placeholder="Nhập mã giới thiệu của cộng tác viên"
              py={6}
              color="primary.1"
              textAlign="center"
              fontSize={15}
              onChange={(e) => setBooking((prev) => ({ ...prev, supporterId: e.target.value.trim() }))}
            />
          </Flex>
        </Flex>
      </Box>

      <Box p={6} borderRadius={7} bgColor="#FFF" mt={6} pb={12}>
        <Section title="Thông tin thanh toán" />
        <Flex mt={4} align="center" gap={{ xs: 8, lg: 14 }} direction={{ xs: 'column', lg: 'row' }}>
          <Flex flex={{ xs: 1, lg: 1 / 3 }} w={'100%'} gap={4} direction="column">
            {PAYMENT_METHOD.map((item) => {
              const { value, label } = item;
              const isActive = value === paymentMethod;
              return (
                <Flex
                  key={value}
                  align="center"
                  gap={3}
                  cursor="pointer"
                  onClick={() => {
                    if (!!voucher && ['dangky20k', 'dangky'].includes(voucher.eventType) && value === 'trasau') {
                      showToast({
                        content: 'Không thể áp dụng voucher đã chọn',
                        status: 'error',
                        duration: 5000
                      });
                      setBooking((prev) => ({ ...prev, paymentMethod: value, voucher: undefined }));
                      return;
                    }
                    setBooking((prev) => ({ ...prev, paymentMethod: value }));
                  }}
                >
                  <Icon
                    as={isActive ? MdRadioButtonChecked : MdRadioButtonUnchecked}
                    fontSize={24}
                    color={isActive ? 'primary.1' : '#CCC'}
                  />
                  <Text fontWeight={600} fontSize={14}>
                    {label}
                  </Text>
                </Flex>
              );
            })}
          </Flex>

          <Flex
            flex={2 / 3}
            align={{ xs: 'flex-start', lg: 'center' }}
            w={'100%'}
            direction={{ xs: 'column', lg: 'row' }}
            gap={{ xs: 8, lg: 0 }}
          >
            <Flex flex={{ xs: 1, lg: 1 / 2 }} justify={{ xs: 'flex-start', lg: 'center' }}>
              <Flex gap={2} cursor="pointer" onClick={() => setShowModalVoucher(true)}>
                {!isEmpty(voucher) ? (
                  <Flex direction="column" gap={0.5} align="center">
                    <Text fontSize={13}>Đã chọn voucher</Text>
                    <Text fontWeight={600} color="primary.1" noOfLines={2} textAlign="center">
                      {voucher.title}
                    </Text>
                  </Flex>
                ) : (
                  <Flex align="center" gap={2} borderBottom="1px solid #089706">
                    <Text fontWeight={600} color="primary.1">
                      Chọn mã giảm giá
                    </Text>
                    <Icon as={FaChevronRight} color="primary.1" fontSize={13} />
                  </Flex>
                )}
              </Flex>
            </Flex>

            <Flex
              flex={{ xs: 1, lg: 1 / 2 }}
              align={{ xs: 'flex-start', lg: 'flex-end' }}
              gap={2}
              direction="column"
              justify="space-between"
            >
              <Text fontSize={16} fontWeight={600}>
                Tổng cộng
              </Text>
              {dataSeats.map((item) => {
                const { seatType, price, quantity } = item;
                return (
                  <Flex key={seatType} justify="space-between" align="center" gap={4}>
                    <Text color="text.2" fontSize={13}>
                      {getSeatType(subType, seatType)}
                    </Text>
                    <Text>
                      {formatCurrency(price)} x {quantity}
                    </Text>
                  </Flex>
                );
              })}
              <Flex direction="column" align={{ xs: 'flex-start', lg: 'flex-end' }}>
                {!isEmpty(voucher) && <Text>- {`${formatCurrency(voucher.price)} x ${seats.length}`}</Text>}
                <Text fontSize={18} fontWeight={700} color="blue.700" mt={1}>
                  {getFinalPrice(seats, voucher, transitPrice)}
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Box>

      <ModalVoucher show={showModalVoucher} onClose={() => setShowModalVoucher(false)} />
    </Box>
  );
};

export default memo(Step3);
