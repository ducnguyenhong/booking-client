import { userInfoAtom } from '@/state-management/recoil';
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
  Radio,
  RadioGroup,
  Stack,
  Switch,
  Text,
  Textarea
} from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { API } from '@ultra-ui/api';
import { Formik } from 'formik';
import { memo } from 'react';
import { useRecoilValue } from 'recoil';
import FieldLabel from './field-label';

const ModalUpdate = (props) => {
  const { show, onClose } = props;
  const userInfo = useRecoilValue(userInfoAtom);
  const { address, email, fullname, gender, hasNotification } = userInfo || {};
  const queryClient = useQueryClient();

  const { mutate: updateMutate, isLoading } = useMutation(
    (variables) => {
      const { address, email, fullname, gender, hasNotification } = variables;
      return API.request({
        method: 'PUT',
        url: `/api/profile/update`,
        params: { address, email, fullname, gender, hasNotification }
      });
    },
    {
      onSuccess: (_, { resetForm }) => {
        showToast({
          content: 'Chỉnh sửa thông tin thành công',
          status: 'success'
        });
        queryClient.invalidateQueries(['GET_USER_INFO']);
        resetForm();
        onClose();
      },
      onError: (e) =>
        showToast({
          status: 'error',
          content: `Chỉnh sửa thông tin thất bại. ${e.message || e.error}`
        })
    }
  );

  return (
    <Formik
      enableReinitialize
      initialValues={{ address, email, fullname, gender, hasNotification }}
      validate={(values) => {
        const errors = {};
        if (!values.fullname) {
          errors.fullname = 'Bạn chưa nhập Họ và tên';
        }
        if (values.email) {
          // eslint-disable-next-line
          const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
          if (!regexEmail.test(values.email)) {
            errors.email = 'Không đúng định dạng Email';
          }
        }
        return errors;
      }}
      onSubmit={(values, { resetForm }) => updateMutate({ ...values, resetForm })}
    >
      {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue, resetForm }) => (
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <Modal
            isOpen={show}
            onClose={() => {
              onClose();
              resetForm();
            }}
            size="3xl"
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Chỉnh sửa thông tin cá nhân</ModalHeader>
              <ModalCloseButton />
              <Divider />
              <ModalBody p={{ xs: 6, lg: 10 }}>
                <Flex direction="column" mx="auto" gap={10}>
                  <Flex direction="column">
                    <FieldLabel title="Họ và tên" isRequired />
                    <Input name="fullname" onChange={handleChange} onBlur={handleBlur} value={values.fullname} />
                    {errors.fullname && touched.fullname && (
                      <Text mt={1} color="red" fontSize={13}>
                        {errors.fullname}
                      </Text>
                    )}
                  </Flex>

                  <Flex direction="column">
                    <FieldLabel title="Giới tính" />
                    <RadioGroup
                      value={values.gender ? 'MALE' : 'FEMALE'}
                      onChange={(value) => {
                        setFieldValue('gender', value === 'MALE');
                      }}
                    >
                      <Stack spacing={5} direction="row">
                        <Radio colorScheme="yellow" value="MALE" size="lg">
                          Nam
                        </Radio>
                        <Radio colorScheme="yellow" value="FEMALE" size="lg">
                          Nữ
                        </Radio>
                      </Stack>
                    </RadioGroup>
                  </Flex>

                  <Flex direction="column">
                    <FieldLabel title="Email" />
                    <Input name="email" onChange={handleChange} onBlur={handleBlur} value={values.email || ''} />
                    {errors.email && touched.email && (
                      <Text mt={1} color="red" fontSize={13}>
                        {errors.email}
                      </Text>
                    )}
                  </Flex>

                  <Flex direction="column">
                    <FieldLabel title="Địa chỉ" />
                    <Textarea name="address" onChange={handleChange} onBlur={handleBlur} value={values.address || ''} />
                    {errors.address && touched.address && (
                      <Text mt={1} color="red" fontSize={13}>
                        {errors.address}
                      </Text>
                    )}
                  </Flex>

                  <Flex align="center" gap={5}>
                    <FieldLabel title="Nhận thông báo" />
                    <Switch
                      size="lg"
                      isChecked={values.hasNotification}
                      onChange={(e) => setFieldValue('hasNotification', e.target.checked)}
                    />
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
                  Xác nhận
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </form>
      )}
    </Formik>
  );
};

export default memo(ModalUpdate);
