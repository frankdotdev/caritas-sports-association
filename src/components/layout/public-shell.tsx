import { SiteHeader } from "./site-header";
import { BottomNav } from "./bottom-nav";

export function PublicShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="page-shell">
      <SiteHeader />
      <main className="public-main">{children}</main>
      <BottomNav />
    </div>
  );
}
