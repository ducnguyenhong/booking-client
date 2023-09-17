import { PADDING_X } from '@/utils/const';
import { Box, Flex, Heading } from '@chakra-ui/react';
import { memo } from 'react';

const Service = () => {
  return (
    <Box px={PADDING_X} mt={28}>
      <Flex justify="center">
        <Heading as="h3" fontSize={25} color="text.1" fontWeight={700}>
          Ưu đãi HOT
        </Heading>
      </Flex>
    </Box>
  );
};

export default memo(Service);
