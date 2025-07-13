'use client';

import Image from 'next/legacy/image';
import { useRouter } from 'next/navigation';

function CoverPage() {
  const router = useRouter();

  const handleReadyClick = () => {
    router.push('/news');
  };

  return (
    <div className="relative flex min-h-screen flex-col text-white">
      {/* Main Content */}
      <div className="grid gap-6 leading-none tracking-[1.4px] sm:gap-8 lg:gap-[50px]">
        <p className="text-lg font-normal sm:text-[25px] lg:text-[50px]">
          Blott Studio
        </p>

        <h1 className="text-5xl font-bold sm:text-[60px] lg:text-[120px]">
          Web Assessment
        </h1>
        <p className="mt-4 text-base font-semibold text-[#828282] sm:text-[23px] lg:text-[46px]">
          Finance Digest
        </p>
      </div>

      {/* Mobile Button */}
      <button
        onClick={handleReadyClick}
        className="mx-auto my-16 cursor-pointer rounded-full bg-[#55ACEE] px-16 py-3 text-[32px] font-bold text-white transition-opacity hover:opacity-90 lg:hidden"
      >
        Ready
      </button>

      {/* Bottom Content */}
      <div className="absolute bottom-8 grid w-full grid-cols-1 lg:grid-cols-2">
        <div className="flex items-center gap-4">
          <Image
            src="/BLOTT.png"
            alt="Blott Logo"
            width={235.11}
            height={56}
            priority
          />
          <div className="space-y-2">
            <p className="text-base font-normal">Blott.io Ltd</p>
            <p className="text-xs font-extralight">
              ©2020 Blott.io Ltd, All rights reserved
            </p>
          </div>
        </div>

        <button
          onClick={handleReadyClick}
          className="mx-auto hidden cursor-pointer rounded-full bg-[#55ACEE] px-16 py-3 text-[32px] font-bold text-white transition-opacity hover:opacity-90 lg:mx-0 lg:ml-auto lg:flex"
        >
          Ready
        </button>
      </div>
    </div>
  );
}

export default CoverPage;
