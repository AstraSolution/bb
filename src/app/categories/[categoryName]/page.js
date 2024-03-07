

import CategoryByName from '@/components/Categories/CategoryByName/CategoryByName';
import Footer from '@/components/Shared/Footer/Footer';
import Navbar from '@/components/Shared/Navbar/Navbar';
import SectionTitle from '@/components/Shared/SectionTitle/SectionTitle';
// import { usePathname } from 'next/navigation';

const page = () => {

    // const pathname = usePathname();
    // const category = pathname.split("/");

    return (
        <div>
            <Navbar></Navbar>
            {/* <SectionTitle heading={category[category.length - 1]}></SectionTitle> */}
            <CategoryByName></CategoryByName>
            <Footer></Footer>
        </div>
    );
};

export default page;