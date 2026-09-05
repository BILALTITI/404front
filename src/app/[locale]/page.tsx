import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { HomeFaqJsonLd } from "@/components/JsonLd";
import { HomePageClient } from "./HomePageClient";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  if (routing.locales.includes(locale as "en" | "ar")) {
    setRequestLocale(locale);
  }
  return (
    <>
      <HomeFaqJsonLd locale={locale} />
      <HomePageClient />
    </>
  );
}
