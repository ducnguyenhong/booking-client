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
import { FaEnvelope, FaLock, FaPhone, FaSignInAlt, FaUserCircle } from 'react-icons/fa';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useMutateRegister } from './register.mutate';

const ModalRegister = () => {
  const [showRegister, setShowRegister] = useRecoilState(showRegisterAtom);
  const setShowLogin = useSetRecoilState(showLoginAtom);
  const setShowForgotPass = useSetRecoilState(showForgotPassAtom);
  const { mutate: registerMutate, error, isLoading } = useMutateRegister();

  const onOpenLogin = useCallback(() => {
    setShowRegister(false);
    setShowLogin(true);
  }, [setShowRegister, setShowLogin]);

  const onOpenForgotPass = useCallback(() => {
    setShowRegister(false);
    setShowForgotPass(true);
  }, [setShowForgotPass, setShowRegister]);

  return (
    <Modal isOpen={showRegister} onClose={() => setShowRegister(false)} size={{ xs: 'sm', lg: 'xl' }} autoFocus={false}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text fontSize={20} fontWeight={600} textAlign="center">
            Đăng ký tài khoản mới
          </Text>
        </ModalHeader>
        <Divider />
        <ModalCloseButton />
        <ModalBody px={10}>
          <Formik
            initialValues={{ username: '', password: '', confPassword: '', fullname: '', email: '' }}
            validate={(values) => {
              const errors = {};
              if (!values.fullname) {
                errors.fullname = 'Bạn chưa nhập Họ tên';
              }
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
              if (!values.confPassword) {
                errors.confPassword = 'Bạn chưa nhập lại Mật khẩu';
              }
              if (values.password !== values.confPassword) {
                errors.confPassword = 'Xác nhận mật khẩu không chính xác';
              }
              if (values.email) {
                const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
                if (!regexEmail.test(values.email)) {
                  errors.email = 'Không đúng định dạng Email';
                }
              }
              return errors;
            }}
            onSubmit={(values) => {
              console.log(values);
              const { username, password, fullname, email } = values;
              registerMutate({ username, password, fullname, email });
            }}
          >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <Box mt={5}>
                  <Text fontWeight={600} mb={1}>
                    Họ tên
                  </Text>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <Icon as={FaUserCircle} color="primary.2" />
                    </InputLeftElement>
                    <Input
                      name="fullname"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.fullname}
                      borderTop="none"
                      borderLeft="none"
                      borderRight="none"
                      borderRadius="none"
                      _focus={{ outline: 'none', boxShadow: 'none' }}
                    />
                  </InputGroup>
                  {errors.fullname && touched.fullname && (
                    <Text mt={1} color="red" fontSize={13}>
                      {errors.fullname}
                    </Text>
                  )}
                </Box>

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
                    <Text mt={1} color="red">
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

                <Box mt={5}>
                  <Text fontWeight={600} mb={1}>
                    Xác nhận mật khẩu
                  </Text>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <Icon as={FaLock} color="primary.2" />
                    </InputLeftElement>
                    <Input
                      type="password"
                      name="confPassword"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.confPassword}
                      borderTop="none"
                      borderLeft="none"
                      borderRight="none"
                      borderRadius="none"
                      _focus={{ outline: 'none', boxShadow: 'none' }}
                    />
                  </InputGroup>
                  {errors.confPassword && touched.confPassword && (
                    <Text mt={1} color="red" fontSize={13}>
                      {errors.confPassword}
                    </Text>
                  )}
                </Box>

                <Box mt={5}>
                  <Text fontWeight={600} mb={1}>
                    Email
                  </Text>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <Icon as={FaEnvelope} color="primary.2" />
                    </InputLeftElement>
                    <Input
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      borderTop="none"
                      borderLeft="none"
                      borderRight="none"
                      borderRadius="none"
                      _focus={{ outline: 'none', boxShadow: 'none' }}
                    />
                  </InputGroup>
                  {errors.email && touched.email && (
                    <Text mt={1} color="red" fontSize={13}>
                      {errors.email}
                    </Text>
                  )}
                </Box>

                {!!error && !!error.message && (
                  <Text mt={10} color="red" fontSize={17} fontWeight={500} textAlign="center" noOfLines={3}>
                    {error.message}
                  </Text>
                )}

                <Flex justify="center" w="full" mt={10}>
                  <Button
                    colorScheme="yellow"
                    leftIcon={<FaSignInAlt />}
                    fontSize={17}
                    px={20}
                    py="22px"
                    isLoading={isLoading}
                    type="submit"
                  >
                    Đăng ký
                  </Button>
                </Flex>
              </form>
            )}
          </Formik>
        </ModalBody>
        <ModalFooter pb={7} pt={5} px={10}>
          <Flex w="full" align="center" justify="space-between">
            <button onClick={onOpenLogin}>
              <Text as="span" color="primary.2" fontWeight={500} textDecor="underline">
                Đăng nhập ngay!
              </Text>
            </button>

            <button onClick={onOpenForgotPass}>
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

export default memo(ModalRegister);
