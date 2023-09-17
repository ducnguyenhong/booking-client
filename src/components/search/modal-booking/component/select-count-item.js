import { formatCurrency, showToast } from '@/utils/helper';
import { Flex, Icon, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { memo, useCallback } from 'react';
import { FiMinusCircle, FiPlusCircle } from 'react-icons/fi';
import { useRecoilState } from 'recoil';
import { seatsAtom } from '../modal-booking.recoil';

const SelectCountItem = ({ item }) => {
  const { value, label, image, price, maxCount, id } = item;
  const [seats, setSeats] = useRecoilState(seatsAtom);
  const currentSeat = seats.find((i) => i.seatType === value);
  const { quantity = 0 } = currentSeat || {};

  const onMinus = useCallback(() => {
    if (quantity === 0) {
      return;
    }
    if (currentSeat) {
      const oldSeats = seats.filter((i) => i.seatType !== value);
      setSeats([...oldSeats, { seatType: value, quantity: quantity - 1, price, id }]);
      return;
    }
    setSeats([...seats, { seatType: value, quantity: quantity - 1, price, id }]);
  }, [currentSeat, id, price, quantity, seats, setSeats, value]);

  const onPlus = useCallback(() => {
    if (quantity + 1 > maxCount) {
      showToast({
        content: `Tối đa ${maxCount} chỗ loại ghế này`
      });
      return;
    }
    if (currentSeat) {
      const oldSeats = seats.filter((i) => i.seatType !== value);
      setSeats([...oldSeats, { seatType: value, quantity: quantity + 1, price, id }]);
      return;
    }
    setSeats([...seats, { seatType: value, quantity: quantity + 1, price, id }]);
  }, [currentSeat, id, maxCount, price, quantity, seats, setSeats, value]);

  return (
    <Flex direction="column" flex={1 / 3}>
      <Flex
        border="1px solid"
        borderColor={quantity > 0 ? 'primary.1' : '#FFF'}
        direction="column"
        align="center"
        gap={1}
        py={2}
        borderRadius={5}
        cursor="pointer"
      >
        {!!image && <Image src={image} alt={value} width={20} height={20} />}
        <Text fontWeight={400} fontSize={13}>
          {label}
        </Text>
        <Text fontWeight={500}>{formatCurrency(price)}</Text>
      </Flex>
      <Flex align="center" gap={2} justify="center" mt={2}>
        <button onClick={onMinus}>
          <Icon as={FiMinusCircle} fontSize={22} color="primary.2" />
        </button>
        <Text fontSize={17} mt={-2} fontWeight={600}>
          {quantity}
        </Text>
        <button onClick={onPlus}>
          <Icon as={FiPlusCircle} fontSize={22} color="primary.2" />
        </button>
      </Flex>
    </Flex>
  );
};

export default memo(SelectCountItem);
