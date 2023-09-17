import Head from '@/components/head/head';
import ModalChangePass from '@/components/profile/modal-change-pass';
import ModalUpdate from '@/components/profile/modal-update';
import SectionPage from '@/components/section-page/section-page';
import { userInfoAtom } from '@/state-management/recoil';
import { PADDING_X } from '@/utils/const';
import { Box, Button, Flex, Grid, GridItem, Icon, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { useState } from 'react';
import { FaBell, FaEnvelope, FaLock, FaMapMarkerAlt, FaMars, FaPencilAlt, FaPhone } from 'react-icons/fa';
import { useRecoilValue } from 'recoil';

const Profile = () => {
  const userInfo = useRecoilValue(userInfoAtom);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showChangePass, setShowChangePass] = useState(false);
  const { fullname, username, email, address, gender, hasNotification, point } = userInfo || {};

  return (
    <Box>
      <Head title="Thông tin cá nhân | BOOKING" />
      <SectionPage title="Thông tin cá nhân" />
      <Flex direction="column" px={PADDING_X} gap={10} py={{ xs: 5, lg: 16 }} bgColor="#f5f5f5">
        <Box bgColor="#FFF" borderRadius={5} px={{ xs: 5, lg: 14 }} py={{ xs: 10, lg: 14 }}>
          <Grid
            templateColumns={{ xs: 'repeat(1, 1fr)', lg: 'repeat(3, 1fr)', '2xl': 'repeat(3, 1fr)' }}
            rowGap={{ xs: 10, lg: 24 }}
            columnGap={10}
          >
            <GridItem>
              <Flex gap={5} align="center">
                <Image src="/images/user.png" alt="user" width={60} height={60} style={{ borderRadius: '100%' }} />
                <Flex direction="column" gap={1}>
                  <Text fontSize={{ xs: 17, lg: 20 }} fontWeight={700}>
                    {fullname}
                  </Text>
                  <Text fontSize={{ xs: 14, lg: 15 }} color="text.2">
                    Điểm tích luỹ: {point}
                  </Text>
                </Flex>
              </Flex>
            </GridItem>

            <GridItem>
              <Flex gap={3} h="full" direction="column">
                <Flex align="center" gap={2}>
                  <Icon as={FaPhone} fontSize={14} color="primary.1" />
                  <Text color="primary.1" fontSize={{ xs: 14, lg: 15 }}>
                    Số điện thoại:
                  </Text>
                </Flex>

                <Text fontSize={{ xs: 15, lg: 18 }} fontWeight={700} textAlign="left">
                  {username}
                </Text>
              </Flex>
            </GridItem>

            <GridItem>
              <Flex gap={3} h="full" direction="column">
                <Flex align="center" gap={2}>
                  <Icon as={FaEnvelope} fontSize={14} color="primary.1" />
                  <Text color="primary.1" fontSize={{ xs: 14, lg: 15 }}>
                    Email:
                  </Text>
                </Flex>

                {email ? (
                  <Text fontSize={{ xs: 15, lg: 18 }} fontWeight={700} textAlign="left">
                    {email}
                  </Text>
                ) : (
                  <Text fontSize={16} color="text.2" textAlign="left">
                    Chưa có dữ liệu
                  </Text>
                )}
              </Flex>
            </GridItem>

            <GridItem>
              <Flex gap={3} h="full" direction="column">
                <Flex align="center" gap={2}>
                  <Icon as={FaMars} fontSize={{ xs: 15, lg: 18 }} color="primary.1" />
                  <Text color="primary.1" fontSize={{ xs: 14, lg: 15 }}>
                    Giới tính:
                  </Text>
                </Flex>

                <Text fontSize={{ xs: 15, lg: 18 }} fontWeight={700} textAlign="left">
                  {gender ? 'Nam' : 'Nữ'}
                </Text>
              </Flex>
            </GridItem>

            <GridItem>
              <Flex gap={3} h="full" direction="column">
                <Flex align="center" gap={2}>
                  <Icon as={FaMapMarkerAlt} fontSize={{ xs: 15, lg: 18 }} color="primary.1" />
                  <Text color="primary.1" fontSize={{ xs: 14, lg: 15 }}>
                    Địa chỉ:
                  </Text>
                </Flex>

                {address ? (
                  <Text fontSize={{ xs: 15, lg: 18 }} fontWeight={700} textAlign="left">
                    {address}
                  </Text>
                ) : (
                  <Text fontSize={16} color="text.2" textAlign="left">
                    Chưa có dữ liệu
                  </Text>
                )}
              </Flex>
            </GridItem>

            <GridItem>
              <Flex gap={3} h="full" direction="column">
                <Flex align="center" gap={2}>
                  <Icon as={FaBell} fontSize={{ xs: 15, lg: 18 }} color="primary.1" />
                  <Text color="primary.1" fontSize={{ xs: 14, lg: 15 }}>
                    Thông báo:
                  </Text>
                </Flex>

                <Text fontSize={{ xs: 15, lg: 18 }} fontWeight={700} textAlign="left">
                  {hasNotification ? 'Bật' : 'Tắt'}
                </Text>
              </Flex>
            </GridItem>
          </Grid>

          <Flex
            justify="center"
            mt={{ xs: 10, lg: 20 }}
            gap={{ xs: 5, lg: 10 }}
            direction={{ xs: 'column', lg: 'row' }}
          >
            <Button leftIcon={<FaPencilAlt />} colorScheme="yellow" px={5} onClick={() => setShowUpdate(true)}>
              Chỉnh sửa thông tin
            </Button>

            <Button leftIcon={<FaLock />} colorScheme="blue" px={10} onClick={() => setShowChangePass(true)}>
              Đổi mật khẩu
            </Button>
          </Flex>
        </Box>
      </Flex>

      <ModalUpdate show={showUpdate} onClose={() => setShowUpdate(false)} />
      <ModalChangePass show={showChangePass} onClose={() => setShowChangePass(false)} />
    </Box>
  );
};

export default Profile;
