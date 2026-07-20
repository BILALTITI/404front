import { notFound } from "next/navigation";

/** Catch-all under /[locale] so unmatched paths render the locale-aware 404. */
export default function CatchAll() {
  notFound();
}
