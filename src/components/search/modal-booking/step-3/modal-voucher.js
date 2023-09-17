import { bookingState } from '@/state-management/booking';
import { showToast } from '@/utils/helper';
import {
  Box,
  Button,
  Divider,
  Flex,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text
} from '@chakra-ui/react';
import Image from 'next/image';
import { memo, useCallback, useEffect, useState } from 'react';
import { BsBookmarkCheckFill } from 'react-icons/bs';
import { useRecoilState } from 'recoil';
import { useQueryMyVouchers } from '../../search.query';

const getSubDescription = (eventType) => {
  if (eventType === 'dangky') {
    return '* Áp dụng cho hình thức chuyển khoản thanh toán';
  }
  if (eventType === 'dangky20k') {
    return '* Áp dụng cho hình thức chuyển khoản thanh toán';
  }
  return '';
};

const ModalVoucher = (props) => {
  const { show, onClose } = props;
  const { data = [] } = useQueryMyVouchers();
  const [booking, setBooking] = useRecoilState(bookingState);
  const { voucher, paymentMethod } = booking;
  const [currentVoucher, setCurrentVoucher] = useState(voucher);

  useEffect(() => {
    setCurrentVoucher(voucher);
  }, [voucher]);

  const onConfirm = useCallback(() => {
    setBooking((prev) => ({ ...prev, voucher: currentVoucher }));
    onClose();
  }, [currentVoucher, onClose, setBooking]);

  return (
    <Modal isOpen={show} onClose={onClose} size="2xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text textAlign="center">Chọn mã giảm giá</Text>
        </ModalHeader>
        <Divider />
        <ModalCloseButton />
        <ModalBody py={10}>
          <Flex direction="column" gap={5}>
            {Array.isArray(data) &&
              !!data.length &&
              data.map((item, index) => {
                const { id, title, content, canUse, price, priceType, eventType } = item;
                const isActive = currentVoucher?.id === id;
                const canUseVoucher = canUse && paymentMethod === 'chuyenkhoan';

                return (
                  <Flex
                    key={id}
                    opacity={canUse ? 1 : 0.4}
                    border={canUse && isActive ? '2px solid #089706' : '1px solid #e6e6e6'}
                    borderRadius={5}
                    bgColor={canUse ? '#FFF' : '#e6e6e6'}
                    cursor="pointer"
                    px={4}
                    py={3}
                    gap={4}
                    pos="relative"
                    overflow="hidden"
                    onClick={() => {
                      if (!canUseVoucher) {
                        return;
                      }
                      if (paymentMethod !== 'chuyenkhoan') {
                        showToast({
                          content: 'Chỉ áp dụng cho hình thức chuyển khoản thanh toán',
                          duration: 5000
                        });
                        return;
                      }
                      setCurrentVoucher(isActive ? undefined : { id, title, price, priceType, eventType });
                    }}
                  >
                    {isActive && canUseVoucher && (
                      <Box pos="absolute" top={-0.5} right={-1}>
                        <Icon as={BsBookmarkCheckFill} color="primary.1" fontSize={24} />
                      </Box>
                    )}
                    <Image src="/images/voucher.png" alt="voucher" width={70} height={35} />
                    <Flex direction="column" gap={1.5}>
                      <Text fontWeight={600}>{title}</Text>
                      <Text
                        fontSize={14}
                        color="text.2"
                        noOfLines={2}
                        dangerouslySetInnerHTML={{ __html: content }}
                      ></Text>
                      <Text fontSize={14} color="orange">
                        {getSubDescription(eventType)}
                      </Text>
                    </Flex>
                  </Flex>
                );
              })}
          </Flex>
        </ModalBody>

        <Divider />
        <ModalFooter gap={4} justifyContent="center">
          <Button colorScheme="yellow" onClick={onConfirm} px={10}>
            Xác nhận
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default memo(ModalVoucher);
