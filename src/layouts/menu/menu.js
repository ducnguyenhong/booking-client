import { showLoginAtom, userInfoAtom } from '@/state-management/recoil';
import { PADDING_X } from '@/utils/const';
import { useMediaQuery } from '@/utils/helper';
import { Button, Flex, Text } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { memo } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import MenuMobile from './subs/menu-mobile';
import { MENU_DATA } from './subs/menu.data';
import UserControl from './subs/user-control';

const Menu = () => {
  const setShowLogin = useSetRecoilState(showLoginAtom);
  const userInfo = useRecoilValue(userInfoAtom);
  const { pathname } = useRouter();
  const isMobileAndTablet = useMediaQuery('(max-width: 991px)');

  if (isMobileAndTablet) {
    return <MenuMobile />;
  }

  return (
    <Flex
      align="center"
      bgColor="#FFF"
      zIndex={1000}
      justify="space-between"
      h="65px"
      boxShadow="base"
      position="fixed"
      top={0}
      left={0}
      w="full"
      px={PADDING_X}
    >
      <Link href="/">
        <Image src="/images/logo.png" width={58} height={58} alt="logo" />
      </Link>

      <Flex align="center" gap={7}>
        <Flex>
          {MENU_DATA.map((item) => {
            const { route, title, icon, iconHeight, iconWidth } = item;
            const isActive = pathname === route;
            return (
              <Flex key={route} mx={5}>
                <Link href={route}>
                  <Flex gap={1.5} align="center">
                    <Image
                      src={icon}
                      alt={title}
                      width={iconWidth}
                      height={iconHeight}
                      style={{ width: iconWidth, height: iconHeight }}
                    />
                    <Text
                      as="span"
                      color={isActive ? 'primary.2' : 'text.1'}
                      fontWeight={600}
                      _hover={{ color: 'primary.2' }}
                      transitionDuration="250ms"
                    >
                      {title}
                    </Text>
                  </Flex>
                </Link>
              </Flex>
            );
          })}
        </Flex>
        {userInfo ? (
          <UserControl />
        ) : (
          <Button colorScheme="yellow" onClick={() => setShowLogin(true)}>
            Đăng nhập
          </Button>
        )}
      </Flex>
    </Flex>
  );
};

export default memo(Menu);
