import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

export default function BlogPageShell({ children }) {
  return (
    <>
      <Navbar />
      <main className="flex-1 overflow-x-clip bg-white">{children}</main>
      <Footer />
      <BackToTop />
    </>
  );
}
