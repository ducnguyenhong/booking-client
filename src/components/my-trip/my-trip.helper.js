export const renderStatus = (status) => {
  if (status === 'dahuy') {
    return 'Đã huỷ';
  }

  if (status === 'khachchonctv') {
    return 'Khách chọn CTV';
  }

  if (status === 'dachuyenkhoanlai') {
    return 'Đã chuyển khoản lại';
  }

  if (status === 'yeucauhuy') {
    return 'Yêu cầu huỷ';
  }

  if (status === 'daketnoi') {
    return 'Đã kết nối nhà xe';
  }

  if (status === 'dachuyenkhoan') {
    return 'Đã chuyển khoản';
  }

  if (status === 'khachmoi') {
    return 'Vừa đăng ký';
  }

  if (status === 'dangxuly') {
    return 'Đang xử lý';
  }

  if (status === 'hoanthanh') {
    return 'Hoàn thành';
  }

  return status;
};

export const renderBgStatus = (status) => {
  if (status === 'dahuy') {
    return '#ed567e';
  }

  if (status === 'khachchonctv') {
    return '#d73f88';
  }

  if (status === 'dachuyenkhoanlai') {
    return '#738a29';
  }

  if (status === 'yeucauhuy') {
    return '#ec4a4a';
  }

  if (status === 'daketnoi') {
    return '#1f58ad';
  }

  if (status === 'dachuyenkhoan') {
    return '#9b26b5';
  }

  if (status === 'khachmoi') {
    return '#329a1c';
  }

  if (status === 'dangxuly') {
    return '#f58f1a';
  }

  if (status === 'hoanthanh') {
    return '#818883';
  }

  return status;
};
