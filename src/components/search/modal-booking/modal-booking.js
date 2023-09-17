import { bookingState } from '@/state-management/booking';
import { useMediaQuery } from '@/utils/helper';
import { Button, Flex, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import { isEmpty } from 'lodash';
import { memo, useCallback, useState } from 'react';
import { FaChevronLeft, FaTimes } from 'react-icons/fa';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { useQueryMyVouchers } from '../search.query';
import StepBar from './component/step-bar';
import { useMutateBooking } from './modal-booking.mutate';
import {
  bookingStepAtom,
  fromTransitNoteAtom,
  seatsAtom,
  selectedTripAtom,
  showBookingAtom,
  toTransitNoteAtom
} from './modal-booking.recoil';
import ModalConfirm from './modal-confirm';
import ModalSuccess from './modal-success';
import Step1 from './step-1';
import Step2 from './step-2';
import Step3 from './step-3';
import ModalSuggest from './step-3/modal-suggest';
import Step4 from './step-4';

const ModalBooking = () => {
  const [showBooking, setShowBooking] = useRecoilState(showBookingAtom);
  const [bookingStep, setBookingStep] = useRecoilState(bookingStepAtom);
  const resetSelectedTrip = useResetRecoilState(selectedTripAtom);
  const resetFromTransitNote = useResetRecoilState(fromTransitNoteAtom);
  const resetToTransitNote = useResetRecoilState(toTransitNoteAtom);
  const resetSeats = useResetRecoilState(seatsAtom);
  const [booking, setBooking] = useRecoilState(bookingState);
  const { voucher } = booking;
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuggestVoucher, setShowSuggestVoucher] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { mutate: bookingMutate } = useMutateBooking();
  const isMobileAndTablet = useMediaQuery('(max-width: 991px)');
  const { data: voucherList = [] } = useQueryMyVouchers();
  const [point, setPoint] = useState();

  const onClose = useCallback(() => {
    setShowBooking(false);
    setBookingStep(1);
    resetSelectedTrip();
    resetFromTransitNote();
    resetToTransitNote();
    resetSeats();
    setBooking((prev) => ({
      ...prev,
      endStop: undefined,
      startStop: undefined,
      helpEmail: '',
      helpFullName: '',
      helpNote: '',
      helpPhone: '',
      paymentMethod: 'chuyenkhoan',
      seatCount: 1,
      startAt: undefined,
      voucher: undefined,
      supporterId: undefined,
      seatType: ''
    }));
  }, [
    resetFromTransitNote,
    resetSeats,
    resetSelectedTrip,
    resetToTransitNote,
    setBooking,
    setBookingStep,
    setShowBooking
  ]);

  const onShowSuccess = useCallback((data) => {
    setShowSuccess(true);
    setPoint(data);
  }, []);

  const onConfirmBooking = useCallback(() => {
    bookingMutate({ onClose, onShowSuccess });
  }, [bookingMutate, onClose, onShowSuccess]);

  return (
    <>
      <Modal isOpen={showBooking} onClose={onClose} size="4xl" closeOnEsc closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <StepBar />
          </ModalHeader>
          <ModalBody bgColor="#e6e6e6" p={{ xs: 1, lg: 6 }}>
            {bookingStep === 1 && <Step1 />}
            {bookingStep === 2 && <Step2 />}
            {bookingStep === 3 && <Step3 />}
            {bookingStep === 4 && <Step4 />}
          </ModalBody>

          <ModalFooter>
            <Flex w="full" py={1}>
              <Flex flex={1 / 3}>
                <Button
                  leftIcon={<FaChevronLeft />}
                  variant="outline"
                  colorScheme="yellow"
                  px={{ xs: 2, lg: 6 }}
                  pl={{ xs: 3 }}
                  onClick={() => setBookingStep((prev) => (prev < 2 ? prev : prev - 1))}
                >
                  {isMobileAndTablet ? '' : 'Quay lại'}
                </Button>
              </Flex>
              <Flex flex={1 / 3} justify="center" gap={12}>
                {bookingStep === 4 ? (
                  <Button colorScheme="yellow" px={12} onClick={() => setShowConfirm(true)}>
                    Xác nhận đặt vé
                  </Button>
                ) : (
                  <Button
                    colorScheme="yellow"
                    px={14}
                    onClick={() => {
                      const hasVoucherCanUse = voucherList?.some((i) => i.canUse);
                      if (hasVoucherCanUse && isEmpty(voucher) && bookingStep === 3) {
                        setShowSuggestVoucher(true);
                        return;
                      }
                      setBookingStep((prev) => (prev < 4 ? prev + 1 : prev));
                    }}
                  >
                    Tiếp tục
                  </Button>
                )}
              </Flex>
              <Flex flex={1 / 3} justify="flex-end">
                <Button
                  leftIcon={<FaTimes color="#c53030" />}
                  variant="outline"
                  colorScheme="red"
                  onClick={onClose}
                  pr={{ xs: 2, lg: undefined }}
                >
                  {isMobileAndTablet ? '' : 'Huỷ bỏ'}
                </Button>
              </Flex>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <ModalSuggest show={showSuggestVoucher} onClose={() => setShowSuggestVoucher(false)} />
      <ModalConfirm show={showConfirm} onClose={() => setShowConfirm(false)} onConfirm={onConfirmBooking} />
      <ModalSuccess show={showSuccess} onClose={() => setShowSuccess(false)} point={point} />
    </>
  );
};

export default memo(ModalBooking);
