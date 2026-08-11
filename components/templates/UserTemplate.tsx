import Navbar from "@/components/organisms/Navbar";
import Footer from "@/components/organisms/Footer";

export default function UserTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}