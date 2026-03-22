import { ShowcaseSidebarShell } from "../../components/showcase-sidebar-shell";

export default function ShowcaseLayout({ children }: { children: React.ReactNode }) {
  return <ShowcaseSidebarShell>{children}</ShowcaseSidebarShell>;
}
