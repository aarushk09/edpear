import { ShowcaseLayoutShell } from "../../components/showcase-layout-shell";

export default function ShowcaseLayout({ children }: { children: React.ReactNode }) {
  return <ShowcaseLayoutShell>{children}</ShowcaseLayoutShell>;
}
