import Head from 'next/head';
import { useRouter } from 'next/router';
import { memo } from 'react';

const HeadComponent = (props) => {
  const {
    title = 'BOOKING - Đặt vé xe nhanh chóng',
    description = 'BOOKING - Đặt vé xe nhanh chóng',
    image = 'https://84go.vn/images/preview.png',
    children,
    keyword = '84 go, vé xe, đặt vé, xe limousine, xe khách'
  } = props;
  const router = useRouter();

  return (
    <Head>
      <title>{title}</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta property="title" content={title} />
      <meta property="description" content={description || title} />
      <meta name="keywords" content={keyword} />
      <meta name="image" content={image} />
      <meta property="url" content={`${process.env.NEXT_PUBLIC_DOMAIN}${router.asPath}`} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description || title} />
      <meta name="og:keywords" content={keyword} />
      <meta name="og:image" content={image} />
      <meta property="og:url" content={`${process.env.NEXT_PUBLIC_DOMAIN}${router.asPath}`} />

      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description || title} />
      <meta name="twitter:keywords" content={keyword} />
      <meta name="twitter:image" content={image} />
      <meta property="twitter:url" content={`${process.env.NEXT_PUBLIC_DOMAIN}${router.asPath}`} />
      {children}
    </Head>
  );
};

export default memo(HeadComponent);
