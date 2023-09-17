import { Flex, Text } from '@chakra-ui/react';
import { memo } from 'react';
import LinkInternal from './link-internal';

const Support = () => {
  return (
    <Flex flex={1 / 4} direction="column">
      <Text fontWeight={700} fontSize={{ xs: 18, lg: 22 }}>
        Hỗ trợ
      </Text>
      <Flex direction="column" mt={5} gap={1.5}>
        <LinkInternal title="• Hướng dẫn thanh toán" href="/huong-dan-thanh-toan" />
        <LinkInternal title="• Câu hỏi thường gặp" href="/cau-hoi-thuong-gap" />
        <LinkInternal title="• Điều khoản sử dụng" href="/dieu-khoan-su-dung" />
      </Flex>
    </Flex>
  );
};

export default memo(Support);
