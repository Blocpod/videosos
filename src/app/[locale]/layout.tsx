import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import "../globals.css";

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

export default async function LocaleLayout(
  props: Readonly<{
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
  }>
) {
  const params = await props.params;

  const {
    locale
  } = params;

  const {
    children
  } = props;

  const messages = await getMessages({ locale });

  return (
    <html lang={locale}>
      <body className="antialiased dark">
        <NextIntlClientProvider messages={messages} locale={locale}>
          {children}
          <Analytics />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

