import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ComponentDemo } from "../../../components/component-demos";
import { ALL_SHOWCASE_SLUGS, getComponentLabel, isShowcaseSlug } from "../../../lib/showcase-nav";

export function generateStaticParams() {
  return ALL_SHOWCASE_SLUGS.map((slug) => ({ slug }));
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
  const label = getComponentLabel(slug);
  return {
    title: `${label} · EdPear showcase`,
    description: `Preview and docs for the ${label} component from EdPear.`,
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
