import Image from 'next/legacy/image';
import Link from 'next/link';

export function Header() {
  return (
    <header className="bg-background sticky top-0 z-50 container mx-auto border-b border-b-[#828282] py-6 text-center sm:border-none">
      <Link href="/">
        <Image
          src="/BLOTT.png"
          alt="Blott Logo"
          width={200}
          height={48.2}
          priority
        />
      </Link>
    </header>
  );
}
