import Image from "next/image";

export default function Logo({ width = 200 }) {
  return (
    <Image
      src={"/logo-with-text.png"}
      width={width}
      height={90}
      alt="Logo"
      preload={true}
    />
  );
}
