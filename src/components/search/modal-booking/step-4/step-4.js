import { bookingState } from '@/state-management/booking';
import { getFinalPrice } from '@/utils/helper';
import { Box, Flex, Icon, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { memo } from 'react';
import { FaInfoCircle } from 'react-icons/fa';
import { useRecoilValue } from 'recoil';
import { useQueryBankAccount } from '../../search.query';
import Section from '../component/section';
import { seatsAtom, selectedTripAtom } from '../modal-booking.recoil';

const Step4 = () => {
  const booking = useRecoilValue(bookingState);
  const { paymentMethod, voucher, transitPrice } = booking;
  const selectedTrip = useRecoilValue(selectedTripAtom);
  const { data: bankAccount = {}, isInitialLoading: loadingBankAccount } = useQueryBankAccount(
    paymentMethod === 'chuyenkhoan'
  );
  const seats = useRecoilValue(seatsAtom);
  const price = getFinalPrice(seats, voucher, transitPrice);

  if (!paymentMethod || !selectedTrip) {
    return null;
  }

  if (paymentMethod === 'trasau') {
    return (
      <Box px={8} py={12} borderRadius={7} bgColor="#FFF">
        <Flex align="center" gap={2} justify="center">
          <Icon as={FaInfoCircle} color="primary.2" />
          <Text color="primary.2" fontWeight={500} fontSize={17}>
            Quý khách vui lòng thanh toán cho lái xe sau khi lên xe
          </Text>
        </Flex>

        <Flex gap={2} justify="center" mt={10}>
          <Flex border="1px solid #e6e6e6" direction="column" borderRadius={5} px={10} py={5} align="center">
            <Text color="text.2" fontWeight={500}>
              Số tiền
            </Text>
            <Text color="blue.700" fontWeight={700} fontSize={24}>
              {price}
            </Text>
          </Flex>
        </Flex>

        <Flex justify="center" mt={10}>
          <Text fontWeight={500}>Cảm ơn quý khách đã lựa chọn BOOKING!</Text>
        </Flex>
      </Box>
    );
  }

  const { bankname, number: bankNumber, fullname: bankFullName, content: bankContent, url } = bankAccount;

  return (
    <Box px={{ xs: 5, lg: 10 }} py={{ xs: 5, lg: 12 }} borderRadius={7} bgColor="#FFF">
      <Flex align="center" gap={2}>
        <Icon as={FaInfoCircle} color="primary.2" />
        <Text color="primary.2" fontWeight={500} fontSize={{ xs: 14, lg: 17 }}>
          Quý khách vui lòng chuyển khoản ngân hàng để thanh toán vé đã đặt
        </Text>
      </Flex>

      <Box mt={10}>
        <Section title="Thông tin người nhận" />
        <Flex align="center" gap={10} direction={{ xs: 'column', lg: 'row' }}>
          <Flex
            flex={1 / 2}
            direction="column"
            gap={4}
            mt={6}
            w={{ xs: '100%', lg: '50%' }}
            mx="auto"
            border="1px solid #e6e6e6"
            borderRadius={5}
            p={5}
          >
            <Flex align="center" justify="space-between">
              <Text color="text.2">Ngân hàng:</Text>
              <Text fontWeight={600} fontSize={17}>
                {bankname}
              </Text>
            </Flex>
            <Flex align="center" justify="space-between">
              <Text color="text.2">Số TK:</Text>
              <Text fontWeight={600} fontSize={17}>
                {bankNumber}
              </Text>
            </Flex>
            <Flex align="center" justify="space-between">
              <Text color="text.2">Chủ TK:</Text>
              <Text fontWeight={600} fontSize={17}>
                {bankFullName}
              </Text>
            </Flex>
            <Flex align="center" justify="space-between">
              <Text color="text.2">Số tiền:</Text>
              <Text fontWeight={600} fontSize={17}>
                {price}
              </Text>
            </Flex>
            <Flex align="center" justify="space-between">
              <Text color="text.2">Nội dung:</Text>
              <Text fontWeight={600} fontSize={17}>
                {bankContent}
              </Text>
            </Flex>
          </Flex>

          <Flex flex={1 / 2} justify="center" align="center">
            <Image src={url} alt="qr code" width={200} height={200} />
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default memo(Step4);
