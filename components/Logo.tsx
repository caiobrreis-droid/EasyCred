import Image from "next/image";

export function Logo({ altura = 52 }: { altura?: number }) {
  return (
    <Image
      src="/logo@2x.png"
      alt="EasyCred, limpe seu nome"
      width={Math.round((altura * 253) / 231)}
      height={altura}
      priority
      className="logo"
    />
  );
}
