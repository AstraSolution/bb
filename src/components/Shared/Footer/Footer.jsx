import Link from "next/link";
import Logo from "../Logo/Logo";

export const Footer = () => {
  const ImportantLinks = [
    {
      title: "Links",
      links: [
        { label: "Books", url: "/buyBooks" },
        { label: "Exchange", url: "/exchangeAllBooks" },
        { label: "Dashboard", url: "/dashboard" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us", url: "/aboutus" },
        { label: "Contact Us", url: "/contact" },
        { label: "Careers", title: "coming soon" },
      ],
    },
    {
      title: "Social",
      links: [
        { label: "Discord", url: "https://discord.com" },
        { label: "Twitter", url: "https://twitter.com" },
        { label: "Linkedin", url: "https://linkedin.com" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Blog", url: "/blogs" },
        { label: "Newsletter", title: "coming soon" },
        { label: "Affiliate", title: "coming soon" },
      ],
    },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <div className="relative bg">
      <svg
        viewBox="0 0 224 11"
        fill="currentColor"
        className="w-full -mb-1 text-teal-50"
        preserveAspectRatio="none"
        style={{ transform: "rotate(180deg)" }}
      >
        <path d="M0,0 C20,2 70,6 112,6 C154,6 204,2 224,0 L224,12 L0,12 Z" />
      </svg>

      <div className="px-4 pt-12 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <div className="grid gap-16 row-gap-10 mb-8 lg:grid-cols-6">
          <div className="text-center text-white md:text-start md:max-w-md lg:col-span-2">
            <a
              href="/"
              aria-label="Go home"
              title="Company"
              className="inline-flex items-center"
            >
              <span className="text-2xl">
                <Logo />
              </span>
            </a>
            <div className="mt-4 lg:max-w-sm">
              <p className="text-sm text-gray-100 text-deep-purple-50">
                The more that you read, the more things you will know. The more
                that you learn, the more places you wll go.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5 row-gap-8 lg:col-span-4 md:grid-cols-4 text-center">
            {ImportantLinks.map(({ title, links }, key) => (
              <div key={key}>
                <h3 className="font-semibold tracking-wide uppercase text-gray-100">
                  {title}
                </h3>
                <ul className="mt-2 space-y-1">
                  {links.map((link, key) => (
                    <li key={key} className="font-normal">
                      {link.url ? (
                        <Link href={link.url}
                          className="inline-block cursor-pointer text-white transition-transform hover:scale-105"
                        >
                          {link.label}
                        </Link>
                      ) : (
                        <span
                          title={link.title}
                          className="inline-block cursor-pointer text-white transition-transform hover:scale-105"
                        >
                          {link.label}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <hr />
        <div className="flex flex-col justify-between text-center md:text-start pt-5 pb-10 border-t border-deep-purple-accent-200 sm:flex-row">
          <p className="text-sm text-white">
            &copy; Copyright {currentYear} Boi Binimoy. All rights reserved.
          </p>
          <div className="flex justify-center text-white md:justify-normal items-center mt-4 space-x-4 sm:mt-0">
            <a
              href="/"
              className="transition-colors duration-300 text-deep-purple-100 hover:text-teal-accent-400"
            >
              <svg
                className="h-5 w-5"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                version="1.1"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="/"
              className="transition-colors duration-300 text-deep-purple-100 hover:text-teal-accent-400"
            >
              <svg
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
              </svg>
            </a>
            <a
              href="/"
              className="transition-colors duration-300 text-deep-purple-100 hover:text-teal-accent-400"
            >
              <svg
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
