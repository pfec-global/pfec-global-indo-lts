import Image from "next/image";

const FLAGS = "/images/country_icon";

export const flags = {
  au: { name: "Australia", src: `${FLAGS}/australia.png` },
  uk: { name: "UK", src: `${FLAGS}/united kingdom.png` },
  ca: { name: "Canada", src: `${FLAGS}/canada.png` },
  nz: { name: "New Zealand", src: `${FLAGS}/new zealand.png` },
  eu: { name: "Europe", src: `${FLAGS}/european union.png` },
  us: { name: "USA", src: `${FLAGS}/united states.png` },
  ie: { name: "Ireland", src: `${FLAGS}/ireland.png` },
  de: { name: "Germany", src: `${FLAGS}/germany.png` },
  my: { name: "Malaysia", src: `${FLAGS}/malaysia.png` },
  ae: { name: "Dubai", src: `${FLAGS}/dubai.png` },
  jp: { name: "Japan", src: `${FLAGS}/japan.png` },
};

export default function Flag({ code, className }) {
  const { name, src } = flags[code];
  return (
    <Image
      src={src}
      alt={name}
      width={144}
      height={144}
      className={`shrink-0 rounded-full ${className}`}
    />
  );
}
