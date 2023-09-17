import { showToast } from '@/utils/helper';
import {
  Button,
  Divider,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text
} from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { API } from '@ultra-ui/api';
import { Formik } from 'formik';
import { memo } from 'react';
import FieldLabel from './field-label';

const ModalChangePass = (props) => {
  const { show, onClose } = props;

  const { mutate: updateMutate, isLoading } = useMutation(
    (variables) => {
      const { password } = variables;
      return API.request({
        method: 'PUT',
        url: `/api/profile/change-password`,
        params: { password }
      });
    },
    {
      onSuccess: (_, { resetForm }) => {
        showToast({
          content: 'Đổi mật khẩu thành công',
          status: 'success'
        });
        resetForm();
        onClose();
      },
      onError: (e) =>
        showToast({
          status: 'error',
          content: `Đổi mật khẩu thất bại. ${e.message || e.error}`
        })
    }
  );

  return (
    <Formik
      enableReinitialize
      initialValues={{ password: '', confPassword: '' }}
      validate={(values) => {
        const errors = {};
        if (!values.password) {
          errors.password = 'Bạn chưa nhập Mật khẩu';
        }
        if (!values.confPassword) {
          errors.confPassword = 'Bạn chưa nhập Xác nhận mật khẩu';
        }
        if (values.password && values.confPassword && values.password !== values.confPassword) {
          errors.confPassword = 'Xác nhận mật khẩu không chính xác';
        }
        return errors;
      }}
      onSubmit={(values, { resetForm }) => updateMutate({ ...values, resetForm })}
    >
      {({ values, errors, touched, handleChange, handleBlur, handleSubmit, resetForm }) => (
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <Modal
            isOpen={show}
            onClose={() => {
              onClose();
              resetForm();
            }}
            size="xl"
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Đổi mật khẩu</ModalHeader>
              <ModalCloseButton />
              <Divider />
              <ModalBody p={{ xs: 6, lg: 10 }}>
                <Flex direction="column" mx="auto" gap={10}>
                  <Flex direction="column">
                    <FieldLabel title="Mật khẩu mới" isRequired />
                    <Input
                      name="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      type="password"
                    />
                    {errors.password && touched.password && (
                      <Text mt={1} color="red" fontSize={13}>
                        {errors.password}
                      </Text>
                    )}
                  </Flex>

                  <Flex direction="column">
                    <FieldLabel title="Xác nhận mật khẩu mới" isRequired />
                    <Input
                      name="confPassword"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.confPassword}
                      type="password"
                    />
                    {errors.confPassword && touched.confPassword && (
                      <Text mt={1} color="red" fontSize={13}>
                        {errors.confPassword}
                      </Text>
                    )}
                  </Flex>
                </Flex>
              </ModalBody>

              <Divider />
              <ModalFooter>
                <Button
                  colorScheme="yellow"
                  variant="outline"
                  mr={5}
                  onClick={() => {
                    onClose();
                    resetForm();
                  }}
                  type="button"
                >
                  Huỷ bỏ
                </Button>
                <Button colorScheme="yellow" isLoading={isLoading} type="submit" onClick={handleSubmit}>
                  Đổi mật khẩu
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </form>
      )}
    </Formik>
  );
};

export default memo(ModalChangePass);
