"use client";

import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

const FAQ = () => {
  const [open, setOpen] = React.useState(1);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  return (
    <div className="max-w-5xl mx-auto my-12 px-5 md:px-10">
      <div className="mx-auto mb-10 lg:max-w-xl sm:text-center">
        <h2 className="mb-2 text-2xl md:text-3xl lg:text-4xl text-center font-bold">
          Frequently Asked Questions
        </h2>
        <p className="mb-5 opacity-80 text-xl font-light text-center">
          Find answers to your questions
        </p>
      </div>

      <div className="space-y-2">
        <Accordion
          open={open === 1}
          className="mb-2 rounded-lg border border-blue-gray-100 px-4"
        >
          <AccordionHeader
            onClick={() => handleOpen(1)}
            className={`border-b-0 transition-colors ${open === 1 ? "text-blue-500 hover:!text-blue-700" : ""
              }`}
          >
            What is Boi Binimoy?
          </AccordionHeader>
          <AccordionBody className="pt-0 text-base font-normal">
            Boi Binimoy is a vibrant online platform that allows you to
            exchange, buy, sell, and rediscover books! We aim to bridge the gap
            between book lovers and facilitate easy access to books around the
            world.
          </AccordionBody>
        </Accordion>

        <Accordion
          open={open === 2}
          className="mb-2 rounded-lg border border-blue-gray-100 px-4"
        >
          <AccordionHeader
            onClick={() => handleOpen(2)}
            className={`border-b-0 transition-colors ${open === 2 ? "text-blue-500 hover:!text-blue-700" : ""
              }`}
          >
            How do I exchange books on Boi Binimoy?
          </AccordionHeader>
          <AccordionBody className="pt-0 text-base font-normal">
            It&apos;s simple!
            <ol>
              <li>
                1. List your book: Provide details like title, author,
                condition, and description.
              </li>
              <li>
                2. Browse listings: Search for books you&apos;d like to exchange
                by category, genre, title, or author.
              </li>
              <li>
                3. Send a request: Connect with the owner of the book
                you&apos;re interested in and propose an exchange.
              </li>
              <li>
                4. Agree and exchange: Once both parties agree, arrange shipping
                details and send your books to each other.
              </li>
            </ol>
          </AccordionBody>
        </Accordion>

        <Accordion
          open={open === 3}
          className="rounded-lg border border-blue-gray-100 px-4"
        >
          <AccordionHeader
            onClick={() => handleOpen(3)}
            className={`border-b-0 transition-colors ${open === 3 ? "text-blue-500 hover:!text-blue-700" : ""
              }`}
          >
            Can I buy or sell books on Boi Binimoy?
          </AccordionHeader>
          <AccordionBody className="pt-0 text-base font-normal">
            Absolutely! You can:
            <ol>
              <li>
                1. Use our Add to Cart feature to purchase books listed for
                sale.
              </li>
              <li>
                2. Create your own listings to sell your unwanted books and earn
                credits or cash.
              </li>
              <li>
                3. Enjoy secure payment options and convenient delivery
                arrangements.
              </li>
            </ol>
          </AccordionBody>
        </Accordion>

        <Accordion
          open={open === 4}
          className="rounded-lg border border-blue-gray-100 px-4"
        >
          <AccordionHeader
            onClick={() => handleOpen(4)}
            className={`border-b-0 transition-colors ${open === 4 ? "text-blue-500 hover:!text-blue-700" : ""
              }`}
          >
            What types of books can I find on Boi Binimoy?
          </AccordionHeader>
          <AccordionBody className="pt-0 text-base font-normal">
            We have a diverse collection of books across various genres,
            including:
            <ol>
              <li>
                1. Fiction (classic, contemporary, romance, thriller, etc.)
              </li>
              <li>
                2. Non-fiction (science, history, self-help, biography, etc.)
              </li>
              <li>3. Children&apos;s books</li>
              <li>4. Young adult fiction</li>
              <li>5. Textbooks and academic resources</li>
            </ol>
          </AccordionBody>
        </Accordion>

        <Accordion
          open={open === 5}
          className="rounded-lg border border-blue-gray-100 px-4"
        >
          <AccordionHeader
            onClick={() => handleOpen(5)}
            className={`border-b-0 transition-colors ${open === 5 ? "text-blue-500 hover:!text-blue-700" : ""
              }`}
          >
            How do I know if a book is in good condition?
          </AccordionHeader>
          <AccordionBody className="pt-0 text-base font-normal">
            Sellers rate the condition of their books using a standardized
            system (e.g., like new, gently used, good condition). You can also
            view additional details and photos in the listing description.
          </AccordionBody>
        </Accordion>

        <Accordion
          open={open === 6}
          className="rounded-lg border border-blue-gray-100 px-4"
        >
          <AccordionHeader
            onClick={() => handleOpen(6)}
            className={`border-b-0 transition-colors ${open === 6 ? "text-blue-500 hover:!text-blue-700" : ""
              }`}
          >
            Is it safe to exchange or buy books on Boi Binimoy?
          </AccordionHeader>
          <AccordionBody className="pt-0 text-base font-normal">
            Yes! We prioritize user safety and security. We encourage users to:
            <ol>
              <li>
                1. Verify profiles and reviews before engaging in transactions.
              </li>
              <li>
                2. Use our secure payment gateway for hassle-free purchases.
              </li>
              <li>
                3. Communicate clearly and agree on shipping details beforehand.
              </li>
            </ol>
          </AccordionBody>
        </Accordion>

        <Accordion
          open={open === 7}
          className="rounded-lg border border-blue-gray-100 px-4"
        >
          <AccordionHeader
            onClick={() => handleOpen(7)}
            className={`border-b-0 transition-colors ${open === 7 ? "text-blue-500 hover:!text-blue-700" : ""
              }`}
          >
            What if I have a problem with my book or transaction?
          </AccordionHeader>
          <AccordionBody className="pt-0 text-base font-normal">
            Our dedicated support team is here to help! Contact us through email
            or via our messaging system if you encounter any issues with your
            exchange, purchase, or delivery.
          </AccordionBody>
        </Accordion>

        <Accordion
          open={open === 8}
          className="rounded-lg border border-blue-gray-100 px-4"
        >
          <AccordionHeader
            onClick={() => handleOpen(8)}
            className={`border-b-0 transition-colors ${open === 8 ? "text-blue-500 hover:!text-blue-700" : ""
              }`}
          >
            How can I stay updated on Boi Binimoy news and promotions?
          </AccordionHeader>
          <AccordionBody className="pt-0 text-base font-normal">
            Follow us on social media (links provided) or subscribe to our
            newsletter for updates on new features, book recommendations, and
            exciting offers!
          </AccordionBody>
        </Accordion>
      </div>
    </div>
  );
};

export default FAQ;
