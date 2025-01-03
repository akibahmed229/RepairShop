"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ButtonHTMLAttributes } from "react";

type Props = {
  title: string;
  className?: string;
  varient?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;
} & ButtonHTMLAttributes<HTMLButtonElement>; // lets us not to specify all other things goes with button like onClick, type, etc.

export function BackButton({ title, className, varient, ...props }: Props) {
  const router = useRouter();

  return (
    <Button
      variant={varient}
      className={className}
      title={title}
      onClick={() => router.back()}
    >
      {title}
    </Button>
  );
}
