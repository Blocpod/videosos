import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const params = await props.params;

  const {
    locale
  } = params;

  const t = await getTranslations({ locale, namespace: "app.metadata" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}

