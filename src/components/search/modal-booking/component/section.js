import { Box, Flex, Text } from '@chakra-ui/react';
import { memo } from 'react';

const Section = ({ title }) => {
  return (
    <Flex align="center" gap={2}>
      <Box h="19px" w="3px" bgColor="primary.1" />
      <Text fontWeight={700} fontSize={14} textTransform="uppercase">
        {title}
      </Text>
    </Flex>
  );
};

export default memo(Section);
