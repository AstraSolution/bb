"use client"
// import { usePathname } from 'next/navigation';
// import Link from "next/link";

// const NavLink = ({ href, className, activeClassName, children }) => {
//     const pathName = usePathname();

//     const isRouteActive = (route) => {
//         return pathName === route;
//     };

//     let routePath;
//     if (typeof href === 'string') {
//         routePath = href;
//     } else {
//         routePath = href.pathname || '/';
//     }

//     const combinedClassName = `${className || ''} ${isRouteActive(routePath) ? activeClassName : ''}`.trim();

//     return (
//         <li className={combinedClassName}>
//             <Link href={href}>
//                 {children}
//             </Link>
//         </li>
//     );
// };

// export default NavLink;


import { usePathname } from 'next/navigation';
import PropTypes from 'prop-types';
import Link from 'next/link';
import React from 'react';


const NavLink = ({ children, activeClassName, href, ...props}) => {
    const isCurrentPath = usePathname === href 
    const childElements = React.Children.map(children, child => {
        if (React.isValidElement(child)) {
            const childClassName = child.props.className || '';
            const className = isCurrentPath ? `${childClassName} ${activeClassName}`.trim() : childClassName;
            return React.cloneElement(child, { className });
        }
        return child;
    });


    return (
        <li>
            <a>
                {childElements}
            </a>
        </li>
    );
};

NavLink.propTypes = {
    activeClassName: PropTypes.string.isRequired,
};

export default NavLink;



