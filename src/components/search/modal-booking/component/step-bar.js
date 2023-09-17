import { useMediaQuery } from '@/utils/helper';
import {
  Box,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper
} from '@chakra-ui/react';
import { memo } from 'react';
import { useRecoilValue } from 'recoil';
import { bookingStepAtom } from '../modal-booking.recoil';

const StepBar = () => {
  const bookingStep = useRecoilValue(bookingStepAtom);
  const isMobileAndTablet = useMediaQuery('(max-width: 991px)');
  const steps = [{ title: 'Điểm đón/trả' }, { title: 'Thông tin' }, { title: 'Xác nhận' }, { title: 'Thanh toán' }];

  return (
    <Stepper index={bookingStep - 1} colorScheme="yellow">
      {steps.map((step, index) => {
        if (isMobileAndTablet && index !== bookingStep - 1) {
          return null;
        }
        return (
          <Step key={index}>
            <StepIndicator>
              <StepStatus complete={<StepIcon />} incomplete={<StepNumber />} active={<StepNumber />} />
            </StepIndicator>

            <Box flexShrink="0">
              <StepTitle>{step.title}</StepTitle>
              <StepDescription>{step.description}</StepDescription>
            </Box>

            <StepSeparator />
          </Step>
        );
      })}
    </Stepper>
  );
};

export default memo(StepBar);
