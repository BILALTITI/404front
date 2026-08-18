import Link from "next/link";

/** Global fallback for non-locale paths. Locale-aware copy lives in
 *  src/app/[locale]/not-found.tsx; this English version covers bare URLs
 *  that never enter the i18n tree. */
export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#E8EDF1] px-6 text-center">
      <p className="font-heading text-sm text-[#1B6491] mb-2">404</p>
      <h1 className="font-display text-3xl font-bold text-[#123A5F] mb-4">
        This page isn&apos;t here
      </h1>
      <p className="text-gray-500 font-body mb-8 max-w-md">
        The page you&apos;re looking for has moved or no longer exists.
        Everything else is still standing.
      </p>
      <Link
        href="/en"
        className="px-6 py-3 rounded-full bg-[#0C2740] text-white font-heading font-semibold hover:bg-[#1B6491] transition-colors"
      >
        Back to home
      </Link>
    </div>
  );
}
