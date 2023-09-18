import { showLoginAtom, showMenuMobileAtom, userInfoAtom } from '@/state-management/recoil';
import { Box, Button, Divider, Flex, Icon, Text } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { memo, useCallback } from 'react';
import { HiChevronDoubleLeft, HiChevronDoubleRight, HiOutlineMenu } from 'react-icons/hi';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { MENU_DATA } from './menu.data';
import UserControl from './user-control';

const MenuMobile = () => {
  const setShowLogin = useSetRecoilState(showLoginAtom);
  const userInfo = useRecoilValue(userInfoAtom);
  const { pathname } = useRouter();
  const [showMenuMobile, setShowMenuMobile] = useRecoilState(showMenuMobileAtom);

  const onToggleMenu = useCallback(() => setShowMenuMobile((prev) => !prev), [setShowMenuMobile]);

  return (
    <>
      {showMenuMobile && (
        <Box
          onClick={onToggleMenu}
          pos="fixed"
          top={0}
          left={0}
          w="full"
          h="100vh"
          bgColor="#000"
          opacity={0.6}
          zIndex={1500}
        />
      )}

      <Flex
        align="center"
        bgColor="#fff"
        zIndex={1000}
        justify="space-between"
        h="65px"
        boxShadow="base"
        position="fixed"
        top={0}
        left={0}
        w="full"
        px="15px"
      >
        <Flex flex={1 / 3}>
          <Button
            onClick={onToggleMenu}
            bgColor="transparent"
            p={0}
            minW={0}
            minH={0}
            _hover={{ bgColor: 'transparent' }}
            _active={{ bgColor: 'transparent' }}
          >
            <Icon as={HiOutlineMenu} color="primary.2" fontSize={28} />
          </Button>
        </Flex>

        <Flex flex={1 / 3} justify="center">
          <Link href="/">
            <Image src="/images/logo.png" width={58} height={58} alt="logo" />
          </Link>
        </Flex>

        <Flex flex={1 / 3} justify="flex-end">
          {userInfo ? (
            <UserControl />
          ) : (
            <Button colorScheme="yellow" onClick={() => setShowLogin(true)}>
              Đăng nhập
            </Button>
          )}
        </Flex>
      </Flex>
      <Flex
        direction="column"
        pos="fixed"
        top={0}
        left={0}
        bgColor="#f5f5f5"
        h="100vh"
        overflow="hidden"
        w={showMenuMobile ? 80 : 0}
        display={showMenuMobile ? 'flex' : 'none'}
        transitionDuration="300ms"
        zIndex={2000}
      >
        <Flex
          h="64px"
          w="full"
          bgColor="main.2"
          align="center"
          px={5}
          justify={showMenuMobile ? 'space-between' : 'center'}
        >
          <Link href="/" style={{ width: 'auto', height: 'auto' }} onClick={() => setShowMenuMobile((prev) => !prev)}>
            <Image src="/images/logo.png" width={50} height={50} alt="logo" />
          </Link>

          <Button
            align="center"
            bgColor="transparent"
            _hover={{ bgColor: 'transparent' }}
            _active={{ bgColor: 'transparent' }}
            p={2}
            minW={0}
            data-group
            transitionDuration="300ms"
            onClick={onToggleMenu}
          >
            <Icon
              as={showMenuMobile ? HiChevronDoubleLeft : HiChevronDoubleRight}
              fontSize={21}
              color="#494B74"
              _groupHover={{ color: '#3699FF' }}
              transitionDuration="300ms"
            />
          </Button>
        </Flex>
        <Divider />
        <Flex direction="column">
          {MENU_DATA.map((item) => {
            const { route, title, iconHeight, iconWidth } = item;
            const isActive = pathname === route;
            return (
              <Flex key={route} px={5} py={3} bgColor={isActive ? 'primary.2' : '#FFF'} onClick={onToggleMenu}>
                <Link href={route} style={{ width: '100%' }}>
                  <Flex gap={1.5} align="center">
                    <Text
                      as="span"
                      color={isActive ? '#FFF' : 'text.1'}
                      fontWeight={500}
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
      </Flex>
    </>
  );
};

export default memo(MenuMobile);
