import { Button, Flex, Modal, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { memo } from 'react';

const ModalSuccess = (props) => {
  const { show, onClose, point } = props;
  const router = useRouter();

  return (
    <Modal
      isOpen={show}
      onClose={onClose}
      size={{ xs: 'sm', md: '2xl', lg: '4xl' }}
      closeOnEsc
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader pt={10} mb={5}>
          <Flex justify="center">
            <Image src="/images/booking-success.png" alt="success" width={500} height={350} />
          </Flex>
          <Text textAlign="center" mt={5} fontSize={{ xs: 15, lg: 18 }}>
            Chúc mừng bạn đặt vé xe thành công!
          </Text>
          <Text textAlign="center" mt={3} fontSize={{ xs: 15, lg: 18 }}>
            Bạn sẽ có thêm{' '}
            <Text as="span" color="red" fontSize={{ xs: 15, lg: 18 }}>
              {point}
            </Text>{' '}
            điểm tích luỹ.
            <br />
            Điểm tích luỹ có thể sử dụng cho các chuyến đi tiếp theo.
          </Text>
        </ModalHeader>
        <ModalFooter gap={8} justifyContent="center" pb={10}>
          <Button
            variant="outline"
            colorScheme="yellow"
            onClick={() => {
              onClose();
              router.push('/');
            }}
            w={40}
          >
            Về trang chủ
          </Button>

          <Button
            colorScheme="yellow"
            onClick={() => {
              onClose();
              router.push('/chuyen-di-cua-toi');
            }}
            w={40}
          >
            Xem vé của tôi
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default memo(ModalSuccess);
