import Publisher from "../../components/Publisher/Publisher";
import Footer from "@/components/Shared/Footer/Footer";
import Navbar from "@/components/Shared/Navbar/Navbar";
import SectionTitle from "@/components/Shared/SectionTitle/SectionTitle";

export default function PublisherPage() {
  return (
    <div className="bg-teal-50">
      <Navbar />
      <SectionTitle heading={"Publisher"}></SectionTitle>
      <Publisher></Publisher>
      <Footer />
    </div>
  );
}
