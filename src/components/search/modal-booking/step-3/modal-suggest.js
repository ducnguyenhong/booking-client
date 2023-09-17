import {
  Button,
  Divider,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text
} from '@chakra-ui/react';
import { memo } from 'react';
import { useSetRecoilState } from 'recoil';
import { bookingStepAtom, showModalVoucherAtom } from '../modal-booking.recoil';

const ModalSuggest = (props) => {
  const { show, onClose } = props;
  const setBookingStep = useSetRecoilState(bookingStepAtom);
  const setShowModalVoucher = useSetRecoilState(showModalVoucherAtom);

  return (
    <Modal isOpen={show} onClose={onClose} size="2xl" isCentered closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text textAlign="center">Bạn có voucher chưa sử dụng</Text>
        </ModalHeader>
        <Divider />
        <ModalBody py={10}>
          <Flex justify="center">
            <Text textAlign="center" fontWeight={600} fontSize={16}>
              Bạn đang có voucher chưa sử dụng. Sử dụng ngay để được giảm giá vé nhé!
            </Text>
          </Flex>
        </ModalBody>

        <Divider />
        <ModalFooter gap={8} justifyContent="center">
          <Button
            colorScheme="yellow"
            variant="outline"
            onClick={() => {
              onClose();
              setBookingStep(4);
            }}
            px={10}
          >
            Không sử dụng
          </Button>
          <Button
            colorScheme="yellow"
            onClick={() => {
              onClose();
              setShowModalVoucher(true);
            }}
            px={10}
          >
            Sử dụng ngay
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default memo(ModalSuggest);
