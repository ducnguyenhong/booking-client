import { Flex, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { memo } from 'react';

const Loading = () => {
  return (
    <Flex align="center" direction="column">
      <Image src="/images/loading.svg" width={100} height={50} alt="loading" />
      <Text>Đang tải dữ liệu</Text>
    </Flex>
  );
};

export default memo(Loading);
