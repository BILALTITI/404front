import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#faf8f5] px-6 text-center">
      <p className="font-heading text-sm text-orange-600 mb-2">404</p>
      <h1 className="font-display text-3xl font-bold text-gray-900 mb-4">
        Page not found
      </h1>
      <p className="text-gray-500 font-body mb-8 max-w-md">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/en"
        className="px-6 py-3 rounded-full bg-gray-900 text-white font-heading font-semibold hover:bg-orange-600 transition-colors"
      >
        Go to home (English)
      </Link>
    </div>
  );
}
