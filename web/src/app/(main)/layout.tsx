import { Header } from '@/components/Header';
import React from 'react';

export default function MainAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="font-rubik mx-auto min-h-screen max-w-7xl">
      <Header />
      <main>{children}</main>
    </div>
  );
}
