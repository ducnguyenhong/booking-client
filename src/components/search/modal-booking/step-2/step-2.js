import { bookingState } from '@/state-management/booking';
import { userInfoAtom } from '@/state-management/recoil';
import { Box, Flex, Input, Text, Textarea } from '@chakra-ui/react';
import { memo, useCallback, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import Section from '../component/section';

const Step2 = () => {
  const userInfo = useRecoilValue(userInfoAtom);
  const [booking, setBooking] = useRecoilState(bookingState);
  const { helpFullName, helpPhone, helpEmail, helpNote } = booking;
  const { fullname = '', username = '', email = '' } = userInfo || {};

  const onChangeInfo = useCallback((data) => setBooking((prev) => ({ ...prev, ...data })), [setBooking]);

  useEffect(() => {
    if (!helpFullName) {
      setBooking((prev) => ({ ...prev, helpFullName: fullname, helpPhone: username, helpEmail: email, helpNote: '' }));
    }
  }, [email, fullname, helpFullName, username, setBooking]);

  return (
    <Box bgColor="#FFF" borderRadius={7} p={{ xs: 8, lg: 16 }}>
      <Section title="Thông tin người đi xe" />
      <Flex direction="column" gap={{ xs: 2, lg: 5 }} mt={{ xs: 7, lg: 14 }}>
        <Box>
          <Text fontWeight={600} fontSize={15} color="text.2">
            Tên người đi
          </Text>
          <Input
            borderTop="none"
            borderLeft="none"
            borderRight="none"
            borderRadius="none"
            fontWeight={700}
            fontSize={15}
            _focus={{ outline: 'none', boxShadow: 'none' }}
            px={0}
            h="35px"
            value={helpFullName}
            onChange={(e) => onChangeInfo({ helpFullName: e.target.value })}
          />
        </Box>
        <Box mt={5}>
          <Text fontWeight={600} fontSize={15} mb={1} color="text.2">
            Số điện thoại
          </Text>
          <Input
            borderTop="none"
            borderLeft="none"
            borderRight="none"
            borderRadius="none"
            fontWeight={700}
            fontSize={15}
            _focus={{ outline: 'none', boxShadow: 'none' }}
            px={0}
            h="35px"
            value={helpPhone}
            onChange={(e) => onChangeInfo({ helpPhone: e.target.value.trim() })}
          />
        </Box>
        <Box mt={5}>
          <Text fontWeight={600} fontSize={15} mb={1} color="text.2">
            Email
          </Text>
          <Input
            borderTop="none"
            borderLeft="none"
            borderRight="none"
            borderRadius="none"
            fontWeight={700}
            fontSize={15}
            _focus={{ outline: 'none', boxShadow: 'none' }}
            px={0}
            h="35px"
            value={helpEmail}
            onChange={(e) => onChangeInfo({ helpEmail: e.target.value.trim() })}
          />
        </Box>
        <Box mt={5}>
          <Text fontWeight={600} fontSize={15} mb={1} color="text.2">
            Ghi chú
          </Text>
          <Textarea
            borderTop="none"
            borderLeft="none"
            borderRight="none"
            borderRadius="none"
            fontWeight={700}
            fontSize={15}
            _focus={{ outline: 'none', boxShadow: 'none' }}
            px={0}
            value={helpNote}
            onChange={(e) => onChangeInfo({ helpNote: e.target.value })}
          />
        </Box>
      </Flex>
    </Box>
  );
};

export default memo(Step2);
