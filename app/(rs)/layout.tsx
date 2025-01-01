import { Header } from "@/components/Header";

export default async function RSLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-7xl">
      {/* Header show up inside this (rs) group route*/}
      <Header />
      <div className="px-2 py-2">{children}</div>
    </div>
  );
}
