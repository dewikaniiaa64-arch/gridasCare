import ClientLayout from './ClientLayout';

export const metadata = {
  title: 'Gridas Care',
  description: 'Website resmi Unit Kesehatan Sekolah',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <ClientLayout>{children}</ClientLayout>;
}