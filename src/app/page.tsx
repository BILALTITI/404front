import { redirect } from "next/navigation";
import { routing } from "@/i18n/routing";

/** Handles `/` when middleware does not run; keeps default locale in sync with `routing`. */
export default function RootPage() {
  redirect(`/${routing.defaultLocale}`);
}
