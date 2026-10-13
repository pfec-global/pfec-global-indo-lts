import Image from "next/image";

// Each link scrolls to the section with that id on the home page.
const linkColumns = [
  [
    { label: "Services", href: "#services" },
    { label: "Study Destinations", href: "#destinations" },
    { label: "Popular Courses", href: "#courses" },
  ],
  [
    { label: "Awards", href: "#awards" },
    { label: "Affiliations", href: "#affiliations" },
    { label: "Testimonials", href: "#testimonials" },
  ],
  [
    { label: "About PFEC Global", href: "#about" },
    { label: "Book a Free Consultation", href: "#consultation" },
  ],
];

// Hidden for now: set to true to show the "Follow Us" icons.
const SHOW_SOCIALS = false;

const socials = [
  {
    name: "LinkedIn",
    color: "bg-[#1d9bd1]",
    icon: (
      <path d="M6.94 8.5H4V20h2.94V8.5zM5.47 4a1.7 1.7 0 1 0 0 3.4 1.7 1.7 0 0 0 0-3.4zM20 13.2c0-3-1.6-4.9-4.2-4.9-1.3 0-2.3.6-2.9 1.5V8.5H10V20h2.9v-6c0-1.6.8-2.6 2.1-2.6s2 .9 2 2.6v6H20v-6.8z" />
    ),
  },
  {
    name: "YouTube",
    color: "bg-[#e8402a]",
    icon: (
      <path
        fillRule="evenodd"
        d="M7 5.5h10a3 3 0 0 1 3 3v7a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-7a3 3 0 0 1 3-3zm3.2 3.7v5.6l5-2.8-5-2.8z"
      />
    ),
  },
  {
    name: "Facebook",
    color: "bg-[#1f3f8f]",
    icon: (
      <path d="M13.5 21v-7.5H16l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5h1.5V4.4c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.4H8.1v3h2.5V21h2.9z" />
    ),
  },
  {
    name: "Instagram",
    color: "bg-[linear-gradient(45deg,#f9ce34,#ee2a7b_50%,#6228d7)]",
    icon: (
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        d="M8 4.5h8A3.5 3.5 0 0 1 19.5 8v8a3.5 3.5 0 0 1-3.5 3.5H8A3.5 3.5 0 0 1 4.5 16V8A3.5 3.5 0 0 1 8 4.5zm4 4a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm4.6-1.3v.01"
      />
    ),
  },
];

function Contact({ address, phone }) {
  const icon = "mt-0.5 h-5 w-5 shrink-0 text-accent";
  return (
    <address className="space-y-2.5 not-italic">
      <p className="flex gap-2.5">
        <svg
          viewBox="0 0 24 24"
          className={icon}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <path d="M12 21s7-6.2 7-11.5a7 7 0 0 0-14 0C5 14.8 12 21 12 21z" />
          <circle cx="12" cy="9.5" r="2.5" />
        </svg>
        {address}
      </p>
      <p className="flex gap-2.5">
        <svg
          viewBox="0 0 24 24"
          className={icon}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M5 4h3.5l1.5 4.5-2 1.5a11 11 0 0 0 6 6l1.5-2 4.5 1.5V19a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2z" />
        </svg>
        <a
          href={`tel:+${phone.replace(/\D/g, "")}`}
          className="hover:underline"
        >
          {phone}
        </a>
      </p>
    </address>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[#121212] text-[15px] text-white xl:text-[1.02rem]">
      <div className="mx-auto max-w-[110.625rem] px-4 pb-8 pt-12 sm:px-8 lg:px-12 xl:pb-12 xl:pt-[4.5rem]">
        <div className="grid gap-10 sm:grid-cols-3 lg:grid-cols-[1.4fr_1fr_1fr_1fr] xl:grid-cols-[30rem_24.5rem_24.5rem_1fr] xl:gap-0">
          <div className="sm:col-span-3 lg:col-span-1 xl:pr-24">
            <Image
              src="/images/pfec_footer_logo.webp"
              alt="PFEC Global - Study Abroad | Visa"
              width={304}
              height={106}
              className="h-auto w-[9.75rem]"
            />
            <div className="mt-6 max-w-[23rem] text-neutral-300">
              <Contact
                address="Pondok Indah Plaza 5 Block A No. 10 Jl. Margaguna Raya, Kebayoran Baru Jakarta Selatan 12140"
                phone="62 821 282 0300"
              />
            </div>

            {SHOW_SOCIALS && (
              <>
                <h3 className="mt-6 text-lg font-bold text-accent xl:text-[1.2rem]">
                  Follow Us
                </h3>
                <ul className="mt-3 flex gap-3">
                  {socials.map(({ name, color, icon }) => (
                    <li key={name}>
                      <a
                        href="#"
                        aria-label={name}
                        className={`flex h-9 w-9 items-center justify-center rounded-md text-white transition-opacity hover:opacity-80 ${color}`}
                      >
                        <svg
                          viewBox="0 0 24 24"
                          className="h-6 w-6"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          {icon}
                        </svg>
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>

          {linkColumns.map((column) => (
            <ul key={column[0].href} className="space-y-3">
              {column.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="transition-colors hover:text-accent"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-neutral-500 pt-7 sm:flex-row sm:items-center sm:justify-between xl:mt-16">
          <p>© 2026 PFEC Global | All Rights Reserved</p>
          <ul className="flex flex-wrap gap-x-10 gap-y-2">
            {["Terms & Conditions", "Privacy Policy", "Cookie Policy"].map(
              (link) => (
                <li key={link}>
                  <a href="#" className="transition-colors hover:text-accent">
                    {link}
                  </a>
                </li>
              ),
            )}
          </ul>
        </div>
      </div>
    </footer>
  );
}
