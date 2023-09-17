import { showForgotPassAtom, showLoginAtom, showRegisterAtom } from '@/state-management/recoil';
import {
  Box,
  Button,
  Divider,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text
} from '@chakra-ui/react';
import { Formik } from 'formik';
import { memo, useCallback } from 'react';
import { FaLock, FaPhone, FaSignInAlt } from 'react-icons/fa';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useMutateLogin } from './login.mutate';

const ModalLogin = () => {
  const [showLogin, setShowLogin] = useRecoilState(showLoginAtom);
  const setShowRegister = useSetRecoilState(showRegisterAtom);
  const setShowForgotPass = useSetRecoilState(showForgotPassAtom);
  const { mutate: loginMutate, isLoading } = useMutateLogin();

  const onOpenRegister = useCallback(() => {
    setShowLogin(false);
    setShowRegister(true);
  }, [setShowLogin, setShowRegister]);

  const onShowForgotPass = useCallback(() => {
    setShowLogin(false);
    setShowForgotPass(true);
  }, [setShowLogin, setShowForgotPass]);

  return (
    <Modal isOpen={showLogin} onClose={() => setShowLogin(false)} size={{ xs: 'sm', lg: 'xl' }} autoFocus={false}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text fontSize={20} fontWeight={600} textAlign="center">
            Vui lòng đăng nhập để tiếp tục!
          </Text>
        </ModalHeader>
        <Divider />
        <ModalCloseButton />
        <ModalBody px={10}>
          <Formik
            initialValues={{ username: '', password: '' }}
            validate={(values) => {
              const errors = {};
              if (!values.username) {
                errors.username = 'Bạn chưa nhập Số điện thoại';
              }
              if (values.username) {
                const regexPhone = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
                if (!regexPhone.test(values.username)) {
                  errors.username = 'Không đúng định dạng Số điện thoại';
                }
              }
              if (!values.password) {
                errors.password = 'Bạn chưa nhập Mật khẩu';
              }
              return errors;
            }}
            onSubmit={(values) => {
              const { username, password } = values;
              loginMutate({ username, password });
            }}
          >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <Box mt={5}>
                  <Text fontWeight={600} mb={1}>
                    Số điện thoại
                  </Text>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <Icon as={FaPhone} color="primary.2" />
                    </InputLeftElement>
                    <Input
                      name="username"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.username}
                      borderTop="none"
                      borderLeft="none"
                      borderRight="none"
                      borderRadius="none"
                      _focus={{ boxShadow: 'none', outline: 'none' }}
                    />
                  </InputGroup>
                  {errors.username && touched.username && (
                    <Text mt={1} color="red" fontSize={13}>
                      {errors.username}
                    </Text>
                  )}
                </Box>
                <Box mt={5}>
                  <Text fontWeight={600} mb={1}>
                    Mật khẩu
                  </Text>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <Icon as={FaLock} color="primary.2" />
                    </InputLeftElement>
                    <Input
                      type="password"
                      name="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      borderTop="none"
                      borderLeft="none"
                      borderRight="none"
                      borderRadius="none"
                      _focus={{ outline: 'none', boxShadow: 'none' }}
                    />
                  </InputGroup>
                  {errors.password && touched.password && (
                    <Text mt={1} color="red" fontSize={13}>
                      {errors.password}
                    </Text>
                  )}
                </Box>

                <Flex justify="center" w="full" mt={10}>
                  <Button
                    colorScheme="yellow"
                    leftIcon={<FaSignInAlt />}
                    fontSize={17}
                    px={20}
                    py="22px"
                    type="submit"
                    isLoading={isLoading}
                  >
                    Đăng nhập
                  </Button>
                </Flex>
              </form>
            )}
          </Formik>
        </ModalBody>
        <ModalFooter pb={7} pt={5} px={10}>
          <Flex w="full" align="center" justify="space-between">
            <button onClick={onOpenRegister}>
              <Text as="span" color="primary.2" fontWeight={500} textDecor="underline">
                Đăng ký ngay!
              </Text>
            </button>

            <button onClick={onShowForgotPass}>
              <Text as="span" color="primary.2" fontWeight={500} textDecor="underline">
                Quên mật khẩu?
              </Text>
            </button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default memo(ModalLogin);
