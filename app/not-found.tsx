import Link from "next/link";
import Image from "next/image";

import { Backpack } from "lucide-react";
import { NavButton } from "@/components/NavButton";

export const metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <div className="px-2 w-full">
      <div className="mx-auto py-4 flex flex-col justify-center items-center gap-4">
        <h2 className="text-2xl">Not Found</h2>

        <p>Could not find requested resource </p>
        <NavButton href="/" label="Return Home" icon={Backpack} size="sm" />

        <Image
          className="m-0 rounded-xl"
          src="/images/not-found-1024x1024.png"
          width={300}
          height={300}
          sizes="300px"
          alt="Page Not Found"
          priority={true}
          title="Page Not Found"
        />
      </div>
    </div>
  );
}
