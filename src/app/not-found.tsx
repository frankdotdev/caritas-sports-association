import Link from "next/link";
import { PublicShell } from "@/components/layout/public-shell";

export default function NotFound() {
  return <PublicShell><div className="empty-state" style={{ marginTop: 80 }}><h1 className="font-display" style={{ fontSize: 42, color: "var(--text)" }}>404</h1><p>This page could not be found.</p><Link href="/" className="primary-button" style={{ marginTop: 12 }}>Return home</Link></div></PublicShell>;
}
