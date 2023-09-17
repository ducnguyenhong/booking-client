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
import { FaPhone, FaSignInAlt } from 'react-icons/fa';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useMutateForgot } from './forgot.mutate';

const ModalForgotPass = () => {
  const [showForgotPass, setShowForgotPass] = useRecoilState(showForgotPassAtom);
  const setShowLogin = useSetRecoilState(showLoginAtom);
  const setShowRegister = useSetRecoilState(showRegisterAtom);
  const { mutate: forgotMutate, isLoading, error } = useMutateForgot();

  const onOpenLogin = useCallback(() => {
    setShowForgotPass(false);
    setShowLogin(true);
  }, [setShowForgotPass, setShowLogin]);

  const onOpenRegister = useCallback(() => {
    setShowForgotPass(false);
    setShowRegister(true);
  }, [setShowForgotPass, setShowRegister]);

  return (
    <Modal
      isOpen={showForgotPass}
      onClose={() => setShowForgotPass(false)}
      size={{ xs: 'sm', lg: 'xl' }}
      autoFocus={false}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text fontSize={20} fontWeight={600} textAlign="center">
            Quên mật khẩu
          </Text>
        </ModalHeader>
        <Divider />
        <ModalCloseButton />
        <ModalBody px={10}>
          <Formik
            initialValues={{ phone: '' }}
            validate={(values) => {
              const errors = {};
              if (!values.phone) {
                errors.phone = 'Bạn chưa nhập Số điện thoại';
              }
              return errors;
            }}
            onSubmit={(values) => {
              const { phone } = values;
              forgotMutate({ phone });
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
                      name="phone"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.phone}
                      borderTop="none"
                      borderLeft="none"
                      borderRight="none"
                      borderRadius="none"
                      _focus={{ boxShadow: 'none', outline: 'none' }}
                    />
                  </InputGroup>
                  {errors.phone && touched.phone && (
                    <Text mt={1} color="red" fontSize={13}>
                      {errors.phone}
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
                    type="submit"
                    isLoading={isLoading}
                  >
                    Quên mật khẩu
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

            <button onClick={onOpenRegister}>
              <Text as="span" color="primary.2" fontWeight={500} textDecor="underline">
                Đăng ký tài khoản
              </Text>
            </button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default memo(ModalForgotPass);
