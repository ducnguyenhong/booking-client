import { Flex } from '@chakra-ui/react';
import { memo } from 'react';
import SelectPUDO from './select-pudo';
import SelectSlot from './select-slot';

const Step1 = () => {
  return (
    <Flex direction="column" gap={6}>
      <SelectSlot />
      <SelectPUDO />
    </Flex>
  );
};

export default memo(Step1);
