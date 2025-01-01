import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-black bg-home-img bg-cover bg-center">
      <main className="flex flex-col justify-center text-center max-w-5xl mx-auto h-dvh">
        {/* Business Class div*/}
        <div className="flex flex-col gap-6 p-12 rounded-xl bg-black/90 w-4/5 sm:max-w-96 mx-auto text-white sm:text-2xl">
          <h1 className="text-4xl font-bold">
            Ahmed&apos;s Computer
            <br />
            Repair Shop
          </h1>
          <address>
            555 GateWay Lane
            <br />
            Kansas City, KS 6425
          </address>
          <p>Open Daily: 9am-5pm</p>
          <Link href="tel:555-555-5555" className="hover:underline">
            Call Us
          </Link>
        </div>
      </main>
    </div>
  );
}
