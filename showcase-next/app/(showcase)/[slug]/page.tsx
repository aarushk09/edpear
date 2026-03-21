import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ComponentDemo } from "../../../components/component-demos";
import { ALL_SHOWCASE_SLUGS, isShowcaseSlug } from "../../../lib/showcase-nav";

export function generateStaticParams() {
  return ALL_SHOWCASE_SLUGS.map((slug) => ({ slug }));
}

function titleFromSlug(slug: string) {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!isShowcaseSlug(slug)) {
    return { title: "Not found · EdPear showcase" };
  }
  return {
    title: `${titleFromSlug(slug)} · EdPear showcase`,
    description: `Preview of the ${titleFromSlug(slug)} component from EdPear.`,
  };
}

export default async function ComponentShowcasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!isShowcaseSlug(slug)) {
    notFound();
  }
  return <ComponentDemo slug={slug} />;
}
