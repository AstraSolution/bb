"use client";
import { usePathname } from 'next/navigation';
import './404page.css';
import Link from 'next/link';

const NotFound = () => {
    const currentPathName = usePathname();
    return (
        <>
            <nav className="shelf">
                <Link href="/"><button className="book home-page"> Home page </button></Link>
                {/* <a className="book home-page">Home page</a> */}
                <Link href="/aboutus"> <button className="book about-us">About us</button></Link>
                <Link href="/contact"><button className="book contact">Contact</button></Link>
                <Link href="/buyBooks"><button className="book faq">Buy Book </button></Link>

                <span className="book not-found">{currentPathName}</span>

                <span className="door left"></span>
                <span className="door right"></span>
            </nav>
            <h1 className='text-2xl font-bold py-2'>Error 404</h1>
            <p>The page you&apos;re looking for can&apos;t be found</p>
        </>
    );
};

export default NotFound;
