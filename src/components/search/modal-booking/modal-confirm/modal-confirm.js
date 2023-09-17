import { Button, Modal, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from '@chakra-ui/react';
import { memo, useCallback } from 'react';

const ModalConfirm = (props) => {
  const { show, onClose, onConfirm } = props;

  const onConfirmModal = useCallback(() => {
    onClose();
    onConfirm();
  }, [onClose, onConfirm]);

  return (
    <Modal isCentered isOpen={show} onClose={onClose} size="xl" closeOnEsc closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader pt={10} mb={5}>
          <Text textAlign="center">Bạn có chắc chắn muốn đặt vé xe?</Text>
        </ModalHeader>
        <ModalFooter gap={8} justifyContent="center" pb={10}>
          <Button variant="outline" colorScheme="yellow" onClick={onClose} w={40}>
            Huỷ bỏ
          </Button>

          <Button colorScheme="yellow" onClick={onConfirmModal} w={40}>
            Đặt vé
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default memo(ModalConfirm);
