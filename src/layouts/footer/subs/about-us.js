import { Flex, Link, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { memo } from 'react';
import LinkInternal from './link-internal';

const AboutUs = () => {
  return (
    <Flex flex={1 / 4} direction="column">
      <Text fontWeight={700} fontSize={{ xs: 18, lg: 22 }}>
        Về chúng tôi
      </Text>
      <Flex direction="column" mt={5} gap={1.5}>
        <LinkInternal title="• Giới thiệu" href="/gioi-thieu" />
        <LinkInternal title="• Tin tức" href="/tin-tuc" />
      </Flex>

      <Link href="/" isExternal display="block" mt={5}>
        <Image
          src="/images/bo-cong-thuong.png"
          alt="app store"
          width={180}
          height={55}
          style={{ objectFit: 'cover' }}
        />
      </Link>
    </Flex>
  );
};

export default memo(AboutUs);
