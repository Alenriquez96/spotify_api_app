import Meta from "@/components/Meta";
import Footer from "@/components/Footer";

type Props = {
  children: React.ReactNode;
};
const Layout = ({ children }: Props) => {
  return (
    <>
      <Meta />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
