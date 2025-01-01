import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Props = {
  icon: LucideIcon;
  label: string;
  href?: string;
  size?: "icon" | "sm" | "lg";
};

export function NavButton({ icon: Icon, label, href, size }: Props) {
  return (
    <Button
      variant="ghost"
      size={size ? size : "icon"}
      aria-label={label}
      title={label}
      className="rounded-full"
      asChild
    >
      {href ? (
        <Link href={href}>
          <Icon />
        </Link>
      ) : (
        <Icon />
      )}
    </Button>
  );
}
