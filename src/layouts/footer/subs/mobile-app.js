import { Flex, Link, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { memo } from 'react';

const MobileApp = () => {
  return (
    <Flex flex={1 / 4} direction="column">
      <Text fontWeight={700} fontSize={{ xs: 18, lg: 22 }}>
        Tải ứng dụng{' '}
        <Text as="span" color="primary.1">
          BOOKING
        </Text>
      </Text>
      <Flex direction="column" mt={6} gap={3}>
        <Link href="/" isExternal>
          <Image
            src="/images/download-app-store.png"
            alt="app store"
            width={150}
            height={50}
            style={{ objectFit: 'cover' }}
          />
        </Link>
        <Link href="/" isExternal>
          <Image
            src="/images/download-google-play.png"
            alt="google play"
            width={150}
            height={50}
            style={{ objectFit: 'cover' }}
          />
        </Link>
      </Flex>
    </Flex>
  );
};

export default memo(MobileApp);
