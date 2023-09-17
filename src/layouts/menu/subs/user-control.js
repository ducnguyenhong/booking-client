import { bookingState } from '@/state-management/booking';
import { userInfoAtom } from '@/state-management/recoil';
import { CK_TOKEN } from '@/utils/const';
import { getCustomerName, showToast, useMediaQuery } from '@/utils/helper';
import {
  Button,
  Flex,
  Icon,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Text,
  useDisclosure
} from '@chakra-ui/react';
import Cookies from 'js-cookie';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { memo, useCallback } from 'react';
import { FaBell, FaBus, FaCaretDown, FaUserCircle } from 'react-icons/fa';
import { useRecoilState, useResetRecoilState } from 'recoil';

const UserControl = () => {
  const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);
  const resetBooking = useResetRecoilState(bookingState);
  const { onClose } = useDisclosure();
  const isMobileAndTablet = useMediaQuery('(max-width: 991px)');
  const router = useRouter();
  const { fullname, username } = userInfo || {};

  const ROUTE_DATA = [
    {
      icon: FaBell,
      title: 'Thông báo',
      route: '/thong-bao'
    },
    {
      icon: FaUserCircle,
      title: 'Thông tin cá nhân',
      route: '/thong-tin-ca-nhan'
    },
    {
      icon: FaBus,
      title: 'Chuyến đi của tôi',
      route: '/chuyen-di-cua-toi'
    }
  ];

  const onLogout = useCallback(() => {
    onClose();
    setUserInfo(null);
    resetBooking();
    localStorage.removeItem('booking');
    Cookies.remove(CK_TOKEN);
    showToast({
      content: 'Đăng xuất thành công',
      status: 'success'
    });
    router.push('/');
  }, [onClose, resetBooking, router, setUserInfo]);

  return (
    <Popover closeOnEsc onClose={onClose} autoFocus={false}>
      <PopoverTrigger>
        <Button bgColor="transparent" _hover={{ bgColor: 'transparent' }} _active={{ bgColor: 'transparent' }} px={0}>
          <Flex align="center" gap={2}>
            <Image width={32} height={32} src={'/images/user.png'} alt="user" style={{ borderRadius: 9999 }} />
            {!isMobileAndTablet && (
              <>
                <Text fontWeight={600}>{getCustomerName(fullname)}</Text>
                <Icon as={FaCaretDown} color="text.2" fontSize={18} />
              </>
            )}
          </Flex>
        </Button>
      </PopoverTrigger>
      <PopoverContent w="350px" borderRadius={5} overflow="hidden">
        <PopoverHeader p={0}>
          <Flex align="center" gap={3} px={4} py={4} bgGradient="linear(to-r, #0aab07, #077a05)">
            <Image src="/images/user.png" width={45} height={45} style={{ borderRadius: 9999 }} alt="user" />

            <Flex direction="column">
              <Text as="span" fontWeight={600} color="#FFF">
                {fullname}
              </Text>
              <Text as="span" fontSize={14} color="#e6e6e6">
                @{username}
              </Text>
            </Flex>
          </Flex>
        </PopoverHeader>
        <PopoverBody p={0}>
          <Flex direction="column">
            {ROUTE_DATA.map((item) => {
              const { route, title, icon } = item;

              return (
                <Link href={route} key={route} onClick={onClose}>
                  <Flex
                    align="center"
                    py={2.5}
                    px={4}
                    gap={2}
                    transitionDuration="300ms"
                    _hover={{ bgColor: '#f2f2f2' }}
                  >
                    <Icon as={icon} color="text.2" />
                    <Text as="span" mt={0.5}>
                      {title}
                    </Text>
                  </Flex>
                </Link>
              );
            })}
          </Flex>
        </PopoverBody>
        <PopoverFooter>
          <Flex py={3} px={1.5}>
            <Button onClick={onLogout} colorScheme="red" variant="outline">
              Đăng xuất
            </Button>
          </Flex>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
};

export default memo(UserControl);
