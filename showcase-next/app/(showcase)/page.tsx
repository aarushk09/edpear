import { redirect } from "next/navigation";

import { DEFAULT_SHOWCASE_SLUG } from "../../lib/showcase-nav";

export default function ShowcaseIndexPage() {
  redirect(`/${DEFAULT_SHOWCASE_SLUG}`);
}
