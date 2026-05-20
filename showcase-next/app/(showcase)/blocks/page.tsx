import type { Metadata } from "next";

import { ShowcaseBlocksPage } from "../../../components/showcase-blocks-page";

export const metadata: Metadata = {
  title: "EdPear blocks",
  description: "Preview EdPear's larger workflow blocks and app-scale EdTech patterns in one gallery.",
};

export default function ShowcaseBlocksRoute() {
  return <ShowcaseBlocksPage />;
}
