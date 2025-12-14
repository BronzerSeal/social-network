import Image from "next/image";

export default function Logo() {
  return (
    <Image
      src={"/logo-with-text.png"}
      width={200}
      height={90}
      alt="Logo"
      preload={true}
    />
  );
}
