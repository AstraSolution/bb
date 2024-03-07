

import Categories from "@/components/Categories/Categories";
import Footer from "@/components/Shared/Footer/Footer";
import Navbar from "@/components/Shared/Navbar/Navbar";
import SectionTitle from "@/components/Shared/SectionTitle/SectionTitle";

export default function CategoriesPage() {
  return (
    <div>
      <Navbar />
      <SectionTitle heading={"All Categories"}></SectionTitle>
      <Categories />
      <Footer />
    </div>
  );
}
