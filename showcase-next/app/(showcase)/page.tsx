import type { Metadata } from "next";

import { ShowcaseHomePage } from "../../components/showcase-home-page";
import { getRegistryDescriptionMap } from "../../lib/component-docs";

export const metadata: Metadata = {
  title: "EdPear",
  description: "Explore the EdPear component catalog, from quick building blocks to larger EdTech workflows.",
};

export default function ShowcaseIndexPage() {
  const descriptions = getRegistryDescriptionMap();

  return <ShowcaseHomePage descriptions={descriptions} />;
}
