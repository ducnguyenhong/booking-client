import { Head, SectionPage } from '@/components';
import { PADDING_X } from '@/utils/const';
import { Box, Flex, Text } from '@chakra-ui/react';

const Intro = () => {
  return (
    <Box>
      <Head title="Giới thiệu | BOOKING" />
      <SectionPage title="Về chúng tôi" />
      <Flex direction="column" px={PADDING_X} gap={3} py={{ xs: 10, lg: 16 }} bgColor="#f5f5f5">
        <Text>
          84.GO xin gửi tới Quý khách hàng lời chào trân trọng, lời chúc sức khỏe và thành đạt. Chúng tôi là đại lý vé
          xe khách chính thức của rất nhiều hãng vận tải hành khách lớn trên toàn quốc.
        </Text>
        <Text>
          Chúng tôi mong muốn tạo ra nhiều sự thay đổi tích cực trong dịch vụ vận tải hành khách – đáp ứng nhu cầu đi
          lại an toàn, nhanh chóng, thuận tiện của Quý khách hàng mọi lúc mọi nơi. Bên cạnh việc giúp các hãng/đơn vị
          vận tải hoạt động hiệu quả hơn, 84.GO mang đến đa dạng các giải pháp đặt vé xe cho khách hàng như đặt xe qua
          tổng đài, qua website, qua app, qua fanpage chính thức của chúng tôi. Hành khách sẽ nhận được nhiều ưu đãi khi
          đặt xe, dễ dàng chọn trước chỗ ngồi yêu thích cũng như quyết định phương thức thanh toán đơn giản.
        </Text>
        <Text>
          Với đội ngũ nhân viên trẻ trung, sáng tạo, nhiệt tình phục vụ 24/7, 84.GO tin rằng sẽ mang đến cho Quý khách
          sự hài lòng, an tâm và hiệu quả cao nhất.
        </Text>
        <Text>
          Chúng tôi cam kết cung cấp các dịch vụ xe khách tốt nhất với mục tiêu đặt lợi ích và quyền lợi của Quý khách
          lên hàng đầu.
        </Text>
        <Text>Rất hân hạnh được chăm sóc và phục vụ Quý khách.</Text>
        <Text>Trân trọng cảm ơn và kính chào!</Text>
      </Flex>
    </Box>
  );
};

export default Intro;
