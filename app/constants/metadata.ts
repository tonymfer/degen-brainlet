const NEXT_PUBLIC_ROOT_URL = process.env.PUBLIC_URL || 'https://mint.club';

import { Metadata } from 'next';

const title = 'Farkaster - Farcaster with a hint of KAIST';
const description =
  '본딩커브 위에서 내 친구권이 사고팔리는 짜릿한 경험을 느껴보세요!';

const sharedMetadata: Metadata = {
  title,
  description,
  metadataBase: new URL(NEXT_PUBLIC_ROOT_URL),
  icons: {
    icon: '/apple-touch-icon.png',
    shortcut: '/apple-touch-icon.png',
    apple: '/apple-touch-icon.png',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/apple-touch-icon.png',
    },
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    url: NEXT_PUBLIC_ROOT_URL,
    title,
    siteName: 'Farkaster',
    description,
    images: [
      {
        url: `/og.png`,
        width: 1200,
        height: 630,
        alt: 'Mint Club',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    creator: '@MintClubPro',
    images: {
      url: `/og.png`,
      width: 1200,
      height: 630,
      alt: 'Mint Club og',
    },
  },
  robots: {},
};

export { sharedMetadata };
