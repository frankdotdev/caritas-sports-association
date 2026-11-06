"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeftRight, CalendarDays, House, Target, Trophy } from "lucide-react";

const items = [
  { href: "/", label: "Home", icon: House },
  { href: "/sports", label: "Sports", icon: Trophy },
  { href: "/fixtures", label: "Fixtures", icon: CalendarDays },
  { href: "/predictions", label: "Predict", icon: Target },
  { href: "/transfers", label: "Transfers", icon: ArrowLeftRight }
];

export function BottomNav() {
  const pathname = usePathname();
  return (
    <nav className="mobile-bottom" aria-label="Primary navigation">
      {items.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          className={
            pathname === href || (href !== "/" && pathname.startsWith(href)) ? "active" : ""
          }
        >
          <Icon size={19} strokeWidth={2} />
          <span>{label}</span>
        </Link>
      ))}
    </nav>
  );
}
