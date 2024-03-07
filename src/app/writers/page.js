
import Footer from "@/components/Shared/Footer/Footer";
import Navbar from "@/components/Shared/Navbar/Navbar";
import SectionTitle from "@/components/Shared/SectionTitle/SectionTitle";
import WritersComponent from "@/components/Writers/Writers";

export default function WritersPage() {
  return (
    <div className="bg-teal-50">
      <Navbar />
      <SectionTitle heading={"Writers"}></SectionTitle>
      <WritersComponent />
      <Footer />
    </div>
  );
}
