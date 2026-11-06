import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function SectionHeading({ title, subtitle, href, action = "View all" }: { title: string; subtitle?: string; href?: string; action?: string }) {
  return (
    <div className="section-heading">
      <div><h2>{title}</h2>{subtitle && <p>{subtitle}</p>}</div>
      {href && <Link href={href} className="text-link">{action}<ArrowUpRight size={14} /></Link>}
    </div>
  );
}
