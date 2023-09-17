import { showToast } from '@/utils/helper';
import { Button, Modal, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { API } from '@ultra-ui/api';
import { memo, useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { cancelTripAtom } from '../my-trip.recoil';

const ModalCancel = () => {
  const [cancelTrip, setCancelTrip] = useRecoilState(cancelTripAtom);
  const { show, id } = cancelTrip;
  const queryClient = useQueryClient();

  const onClose = useCallback(() => {
    setCancelTrip({ show: false, id: undefined });
  }, [setCancelTrip]);

  const { mutate: cancelMutate, isLoading } = useMutation(
    () =>
      API.request({
        url: '/api/trips/cancel',
        params: { id },
        method: 'PATCH'
      }),
    {
      onSuccess: () => {
        showToast({
          status: 'success',
          content: 'Gửi yêu cầu huỷ vé thành công'
        });
        queryClient.refetchQueries(['GET_MY_TRIP_LIST']);
        onClose();
      },
      onError: (e) => {
        showToast({
          status: 'error',
          content: `Gửi yêu cầu thất bại. ${e.message || e.error}`
        });
        onClose();
      }
    }
  );

  const onConfirm = useCallback(() => {
    cancelMutate();
  }, [cancelMutate]);

  return (
    <Modal isCentered isOpen={show} onClose={onClose} size="xl" closeOnEsc closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader pt={10} mb={5}>
          <Text textAlign="center">Bạn có chắc chắn muốn huỷ vé xe này?</Text>
        </ModalHeader>
        <ModalFooter gap={8} justifyContent="center" pb={10}>
          <Button variant="outline" colorScheme="red" onClick={onClose} w={40}>
            Đóng
          </Button>

          <Button colorScheme="red" onClick={onConfirm} w={40} isLoading={isLoading}>
            Huỷ vé
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default memo(ModalCancel);
