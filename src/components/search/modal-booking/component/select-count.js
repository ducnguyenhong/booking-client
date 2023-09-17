import { Flex, Text } from '@chakra-ui/react';
import { memo, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { seatsAtom, selectedTripAtom } from '../modal-booking.recoil';
import ModalLimousine from './modal-limousine';
import Section from './section';
import SelectCountItem from './select-count-item';

const SelectCount = () => {
  const selectedTrip = useRecoilValue(selectedTripAtom);
  const { car, carPrices = [] } = selectedTrip || {};
  const { seat, subType, subSeat = '' } = car || {};
  const [showDiagram, setShowDiagram] = useState(false);
  const [seats, setSeats] = useRecoilState(seatsAtom);
  const subSeatList = subSeat.split(',');
  const priceList = carPrices.filter((i) => !i.transitId);

  useEffect(() => {
    if (['limousine9', 'limousine11'].includes(subType)) {
      if (seats.every((i) => !i.quantity)) {
        const defaultSeatType = priceList.find((i) => i.seatType === 'dau');
        setSeats([{ seatType: 'dau', quantity: 1, price: defaultSeatType?.price, id: defaultSeatType?.id }]);
      }
      return;
    }
    if (['khachgiuongnamcabin24dondoi', 'khachgiuongnamcabin22dondoi'].includes(subType)) {
      if (seats.every((i) => !i.quantity)) {
        const defaultSeatType = priceList.find((i) => i.seatType === 'cabindon');
        setSeats([{ seatType: 'cabindon', quantity: 1, price: defaultSeatType?.price, id: defaultSeatType?.id }]);
      }
      return;
    }
    if (seats.every((i) => !i.quantity)) {
      const defaultSeatType = priceList[0];
      setSeats([{ seatType: 'normal', quantity: 1, price: defaultSeatType?.price, id: defaultSeatType?.id }]);
    }
  }, [priceList, seats, setSeats, subType]);

  if (!selectedTrip) {
    return null;
  }

  const LIMOUSINE_SEAT = [
    {
      value: 'dau',
      label: 'Ghế đầu',
      image: '/images/slot-top.png',
      price: priceList.find((i) => i.seatType === 'dau')?.price,
      id: priceList.find((i) => i.seatType === 'dau')?.id,
      maxCount: Number(subSeatList[0])
    },
    {
      value: 'giua',
      label: 'Ghế giữa',
      image: '/images/slot-center.png',
      price: priceList.find((i) => i.seatType === 'giua')?.price,
      id: priceList.find((i) => i.seatType === 'giua')?.id,
      maxCount: Number(subSeatList[1])
    },
    {
      value: 'cuoi',
      label: 'Ghế cuối',
      image: '/images/slot-bottom.png',
      price: priceList.find((i) => i.seatType === 'cuoi')?.price,
      id: priceList.find((i) => i.seatType === 'cuoi')?.id,
      maxCount: Number(subSeatList[2])
    }
  ];

  const CABIN_SEAT = [
    {
      value: 'cabindon',
      label: 'Cabin đơn',
      price: priceList.find((i) => i.seatType === 'cabindon')?.price,
      id: priceList.find((i) => i.seatType === 'cabindon')?.id,
      maxCount: seat
    },
    {
      value: 'cabindoi',
      label: 'Cabin đôi',
      price: priceList.find((i) => i.seatType === 'cabindoi')?.price,
      id: priceList.find((i) => i.seatType === 'cabindoi')?.id,
      maxCount: seat
    }
  ];

  const NORMAL_SEAT = {
    value: 'normal',
    label: 'Ghế thường',
    price: priceList[0]?.price,
    id: priceList[0]?.id,
    maxCount: seat
  };

  return (
    <Flex direction="column" justify="center" gap={2} w="full">
      <Flex align="center" justify="space-between">
        <Section title="Chọn ghế" />

        {['limousine9', 'limousine11'].includes(subType) && (
          <Flex cursor="pointer" onClick={() => setShowDiagram(true)}>
            <Text color="primary.2" fontWeight={500} fontSize={14} textDecor="underline">
              Xem sơ đồ xe
            </Text>
          </Flex>
        )}
      </Flex>

      {['limousine9', 'limousine11'].includes(subType) && (
        <Flex align="center" gap={5} mb={1}>
          {LIMOUSINE_SEAT.map((item) => (
            <SelectCountItem item={item} key={item.value} />
          ))}
        </Flex>
      )}

      {['khachgiuongnamcabin24dondoi', 'khachgiuongnamcabin22dondoi'].includes(subType) && (
        <Flex align="center" gap={5} mb={1}>
          {CABIN_SEAT.map((item) => (
            <SelectCountItem item={item} key={item.value} />
          ))}
        </Flex>
      )}

      {!['khachgiuongnamcabin24dondoi', 'khachgiuongnamcabin22dondoi', 'limousine9', 'limousine11'].includes(
        subType
      ) && (
        <Flex align="center" gap={5} mb={1} justify="center">
          <SelectCountItem item={NORMAL_SEAT} />
        </Flex>
      )}

      {/* <Flex align="center" justify="center" gap={5}>
        <Text fontWeight={600}>Số lượng</Text>
        <Flex align="center" gap={3} justify="center" mt={2}>
          <button onClick={onMinus}>
            <Icon as={FiMinusCircle} fontSize={27} color="primary.2" />
          </button>
          <Text fontSize={20} mt={-2} fontWeight={600}>
            {seatCount}
          </Text>
          <button onClick={onPlus}>
            <Icon as={FiPlusCircle} fontSize={27} color="primary.2" />
          </button>
        </Flex>
      </Flex> */}

      <ModalLimousine show={showDiagram} onClose={() => setShowDiagram(false)} />
    </Flex>
  );
};

export default memo(SelectCount);
