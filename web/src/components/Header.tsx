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
      <nav className="flex items-center justify-end gap-6 px-8 pt-5">
        <Link
          href="/news"
          className="text-blott-text-gray hover:text-blott-text-light text-sm font-semibold transition-colors"
        >
          General News
        </Link>
        <Link
          href="/news/live"
          className="text-blott-accent-blue text-sm font-semibold transition-colors hover:text-blue-400"
        >
          Live Feed
        </Link>
      </nav>
    </header>
  );
}
