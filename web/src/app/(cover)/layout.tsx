import Image from 'next/legacy/image';
import React from 'react';

export default function CoverLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="font-poppins mx-auto min-h-screen max-w-lg p-8 sm:max-w-xl md:max-w-2xl lg:max-w-6xl xl:max-w-7xl">
      <Image
        src="/Thumbnail.jpg"
        alt="Blott background"
        className="z-0"
        layout="fill"
        style={{ objectFit: 'cover' }}
        priority
      />
      {children}
    </div>
  );
}
